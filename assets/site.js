/* 글 페이지 공통 부품. assets/catalog.js 다음에 불러온다.
   1) 이런 상황이라면?: 연구가 출발한 현장 장면을 보여 주고, 독자가 고르면 이 연구가 왜 필요했는지 펼친다.
   2) 결론 블록: 이 연구의 결론과 연구 질문을 크게 보여 준다.
   3) 연결: 글 끝에 같은 질문과 같은 주제의 다른 연구를 잇는다.
   홈(index.html)도 gauge, scene 부품을 쓴다. */
(function(){
const C=window.CATALOG; if(!C) return;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const QI=Object.fromEntries(C.QUESTIONS.map((q,i)=>[q.id,i]));

/* 측정값 눈금 */
function gauge(g,label){if(!g)return '';const span=g.max-g.min,x=v=>((v-g.min)/span*100).toFixed(2)+'%';
  return `<div class="gauge" role="img" aria-label="${esc(label)}"><div class="axis"></div>
  ${g.band?`<div class="band" style="left:${x(g.band[0])};width:calc(${x(g.band[1])} - ${x(g.band[0])})"></div>`:''}
  ${g.ci?`<div class="ci" style="left:${x(g.ci[0])};width:calc(${x(g.ci[1])} - ${x(g.ci[0])})"></div>`:''}
  ${g.ticks.map(t=>`<div class="tick" style="left:${x(t)}"><span>${t}</span></div>`).join('')}
  ${g.pts.map(p=>`<div class="pt ${p.ref?'ref':''}" style="left:${x(p.v)}" data-label="${esc(p.label)}"></div>`).join('')}</div>`}

/* 이런 상황이라면?: 정답을 맞히는 퀴즈가 아니라, 연구가 풀려던 문제를 독자가 먼저 겪어 보게 한다 */
function scene(p,host,{onPick,more}={}){const n=p.need;if(!n){host.remove();return}
  const key='scene:'+p.slug;
  const draw=()=>{const pick=store.get(key,null);
    host.innerHTML=`<p class="s-label">이런 상황이라면?</p>
    <p class="s-scene">${esc(n.scene)}</p>
    <p class="s-ask">${esc(n.ask)}</p>
    <div class="s-opts" role="group" aria-label="선택지">${n.opts.map((o,i)=>`<button class="s-opt" data-i="${i}" aria-pressed="${pick===i}">${esc(o)}</button>`).join('')}</div>
    ${pick!=null?`<div class="s-why"><p>${esc(n.why)}</p>${more||''}</div>`:'<p class="s-hint">하나를 고르면 이 연구가 왜 필요했는지 펼쳐집니다.</p>'}`;
    host.querySelectorAll('.s-opt').forEach(b=>b.onclick=()=>{store.set(key,+b.dataset.i);draw();if(onPick)onPick()});
  };
  draw();
}

/* 눈금 점 말풍선 */
const tipEl=document.createElement('div');tipEl.className='gtip';tipEl.setAttribute('role','tooltip');document.body.appendChild(tipEl);
let tipFor=null;
function showTip(pt){const t=pt.dataset.label||pt.getAttribute('title');if(!t)return;
  if(pt.getAttribute('title')){pt.dataset.label=t;pt.removeAttribute('title')}
  tipEl.textContent=t;tipEl.classList.add('show');tipFor=pt;
  const r=pt.getBoundingClientRect(),w=tipEl.offsetWidth;
  tipEl.style.left=Math.min(Math.max(8,r.left+r.width/2-w/2),innerWidth-w-8)+'px';
  tipEl.style.top=(r.top-tipEl.offsetHeight-8<4?r.bottom+8:r.top-tipEl.offsetHeight-8)+'px'}
function hideTip(){tipEl.classList.remove('show');tipFor=null}
document.addEventListener('mouseover',e=>{const pt=e.target.closest&&e.target.closest('.gauge .pt');if(pt)showTip(pt)});
document.addEventListener('mouseout',e=>{if(e.target.closest&&e.target.closest('.gauge .pt'))hideTip()});
document.addEventListener('click',e=>{const pt=e.target.closest&&e.target.closest('.gauge .pt');if(pt){tipFor===pt?hideTip():showTip(pt)}else hideTip()});
addEventListener('scroll',hideTip,{passive:true});

window.SITE={gauge,scene,esc,store};

const slug=(location.pathname.match(/posts\/([\w-]+)\.html/)||[])[1];
const p=slug&&C.POSTS.find(x=>x.slug===slug);
if(!p) return;
const q=C.QUESTIONS[QI[p.q]];

/* 1), 2) 글머리 바로 뒤: 상황, 그다음 결론 */
const anchor=document.querySelector('.hero');
if(anchor){
  const box=document.createElement('section');box.className='concl';box.setAttribute('aria-label','이 연구의 결론');
  box.innerHTML=`<p class="c-label">이 연구의 결론</p>
  <p class="c-text">${esc(p.concl)}</p>
  <p class="c-q">이 연구가 답하려 한 질문: <a href="../#q=${q.id}">${esc(q.q)}</a><br>${esc(p.jr)}, ${p.year}. 저는 ${esc(p.role)}로 참여했습니다.</p>`;
  anchor.after(box);
  if(p.need){const sc=document.createElement('section');sc.className='scene';sc.setAttribute('aria-label','이런 상황이라면');anchor.after(sc);scene(p,sc)}
}

/* 3) 연결 */
const foot=document.querySelector('footer');
if(foot){
  const same=C.POSTS.filter(x=>x.q===p.q&&x.slug!==p.slug);
  const topics=C.TOPICS.filter(t=>t.slugs.includes(p.slug));
  const link=x=>`<li><a href="${x.slug}.html">${esc(x.short)}</a><span>${esc(x.jr)}, ${x.year}</span></li>`;
  const bySlug=s=>C.POSTS.find(x=>x.slug===s);
  const sec=document.createElement('section');sec.className='connect';sec.setAttribute('aria-label','이어지는 연구');
  sec.innerHTML=`<h2>이 연구가 이어지는 곳</h2>
  <div class="cx">
    <div><h3>같은 질문: ${esc(q.q)}</h3><p class="cx-a">${esc(q.a)}</p>${same.length?`<ul>${same.map(link).join('')}</ul>`:'<p class="note">아직 이 질문의 다른 해설은 없습니다.</p>'}</div>
    ${topics.map(t=>`<div><h3>같은 주제: ${esc(t.name)}</h3><ul>${t.slugs.filter(s=>s!==p.slug).map(bySlug).filter(Boolean).map(link).join('')}</ul></div>`).join('')}
  </div>
  <p class="cx-back"><a href="../#p=${p.slug}">연구 도록에서 이 논문 보기</a><a href="../#q=${q.id}">이 질문의 연구 모아 보기</a></p>`;
  foot.before(sec);
}
})();
