// 사이트 전체 화면 회귀 검사.
// 사용: node qa_all.mjs <사이트 루트(절대경로)> [출력 폴더]
// playwright 패키지가 있는 폴더(예: scratchpad)에서 실행한다. 브라우저: /opt/pw-browsers/chromium
// 검사: 모든 페이지 × (390 다크, 1280 라이트) / 보이는 버튼 모두 클릭 / pageerror / 가로 넘침 /
//       상단 메뉴 표시 / 존재하지 않는 홈 앵커로 가는 링크
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ROOT = process.argv[2] || process.cwd();
const OUT = process.argv[3] || '.';
const pages = ['index.html', ...fs.readdirSync(path.join(ROOT, 'posts')).filter(f => f.endsWith('.html') && !f.startsWith('_')).map(f => 'posts/' + f)];
const homeIds = new Set([...fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').matchAll(/id="([\w-]+)"/g)].map(m => m[1]));

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const errs = [], bad = [];
for (const [w, scheme] of [[390, 'dark'], [1280, 'light']]) {
  for (const f of pages) {
    const p = await b.newPage({ viewport: { width: w, height: 844 }, colorScheme: scheme });
    p.on('pageerror', e => errs.push(`${f} @${w}: ${e.message}`));
    await p.goto('file://' + path.join(ROOT, f)); await p.waitForTimeout(150);
    for (const bt of (await p.$$('main button:not([disabled])')).slice(0, 100)) {
      try { if (await bt.isVisible()) await bt.click({ timeout: 500 }); } catch (e) {}
    }
    const r = await p.evaluate(() => {
      const hrefs = [...document.querySelectorAll('a[href*="#"]')].map(a => a.getAttribute('href'));
      // 같은 페이지 안의 앵커(#x)는 이 페이지의 id와 대조한다. 단 홈의 상태 앵커(#p=, #q=, #t=)는 제외
      const local = hrefs.filter(h => h.startsWith('#') && !/^#[pqt]=/.test(h)).map(h => h.slice(1)).filter(id => id && !document.getElementById(id));
      // 홈으로 가는 앵커(../#x, ./#x, index.html#x)는 홈의 id와 대조한다
      const home = hrefs.filter(h => /^(\.\.\/|\.\/|index\.html)#/.test(h)).map(h => h.split('#')[1].split('=')[0]).filter(a => !['p', 'q', 't'].includes(a));
      return {
        sw: document.documentElement.scrollWidth,
        nav: (document.querySelector('.site-nav') && getComputedStyle(document.querySelector('.site-nav')).display) || 'missing',
        local, home,
      };
    });
    const dead = [...r.local.map(a => 'local#' + a), ...r.home.filter(a => !homeIds.has(a)).map(a => 'home#' + a)];
    if (r.sw !== w || r.nav === 'none' || r.nav === 'missing' || dead.length) bad.push(`${f} @${w} ${JSON.stringify({ sw: r.sw, nav: r.nav, dead })}`);
    if (f === 'index.html') await p.screenshot({ path: path.join(OUT, `qa_home_${w}.png`) });
    await p.close();
  }
}
console.log(`${pages.length} pages x 2 widths`);
console.log('layout/nav/link problems:', bad.length ? bad : 'none');
console.log('page errors:', errs.length ? errs : 'none');
await b.close();
process.exit(bad.length || errs.length ? 1 : 0);
