/* 글 페이지 공통 부품. assets/catalog.js 다음에 불러온다.
   1) 결론 블록: 글머리(글쓴이 카드 뒤)에 이 연구의 결론과 연구 질문을 크게 보여 준다.
   2) 짐작해 보기: 핵심 측정값을 독자가 눈금 위에서 먼저 짐작한 뒤 논문 값과 비교한다.
   3) 연결: 글 끝에 같은 질문과 같은 주제의 다른 연구를 잇는다.
   홈(index.html)도 gauge, fmt, guess 부품을 쓴다. */
(function(){
const C=window.CATALOG; if(!C) return;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const QI=Object.fromEntries(C.QUESTIONS.map((q,i)=>[q.id,i]));

/* 측정값 눈금 */
function gauge(g,label,extra){if(!g)return '';const span=g.max-g.min,x=v=>((v-g.min)/span*100).toFixed(2)+'%';
  return `<div class="gauge" role="img" aria-label="${esc(label)}"><div class="axis"></div>
  ${g.band?`<div class="band" style="left:${x(g.band[0])};width:calc(${x(g.band[1])} - ${x(g.band[0])})"></div>`:''}
  ${g.ci?`<div class="ci" style="left:${x(g.ci[0])};width:calc(${x(g.ci[1])} - ${x(g.ci[0])})"></div>`:''}
  ${g.ticks.map(t=>`<div class="tick" style="left:${x(t)}"><span>${t}</span></div>`).join('')}
  ${g.pts.map(p=>`<div class="pt ${p.ref?'ref':''}" style="left:${x(p.v)}" title="${esc(p.label)}"></div>`).join('')}
  ${extra!=null?`<div class="pt you" style="left:${x(extra)}" title="내 짐작"></div>`:''}</div>`}
/* 핵심 값: 비교 기준이 아닌 마지막 점 */
const answer=p=>{const m=(p.g&&p.g.pts.filter(x=>!x.ref))||[];return m.length?m[m.length-1].v:null};
function fmt(p,v){const g=p.g;if(String(p.val).includes('%'))return (v*100).toFixed(1)+'%';
  if(g.min<0)return (v>0?'+':v<0?'−':'')+Math.abs(v).toFixed(3);return v.toFixed(3)}

/* 짐작해 보기 */
function guess(p,host){const a=answer(p);if(a==null){host.remove();return}
  const g=p.g,key='guess:'+p.slug,step=(g.max-g.min)/200;
  const draw=()=>{const saved=store.get(key,null);
    if(saved==null){const mid=+(g.min+(g.max-g.min)/2).toFixed(4);
      host.innerHTML=`<p class="g-q">먼저 짐작해 보세요. <b>${esc(p.unit)}</b>은 얼마였을까요?</p>
      <div class="g-pick"><input type="range" min="${g.min}" max="${g.max}" step="${step}" value="${mid}" aria-label="내 짐작"><output>${fmt(p,mid)}</output></div>
      ${gauge({...g,pts:[],ci:null,band:g.band},'눈금',mid)}
      <button class="btn primary g-go">논문 값 보기</button>`;
      const r=host.querySelector('input'),o=host.querySelector('output');
      const upd=()=>{o.textContent=fmt(p,+r.value);host.querySelector('.pt.you').style.left=((+r.value-g.min)/(g.max-g.min)*100)+'%'};
      r.addEventListener('input',upd);
      host.querySelector('.g-go').onclick=()=>{store.set(key,+r.value);draw()};
    }else{const d=saved-a;
      host.innerHTML=`<p class="g-q">내 짐작 <b>${fmt(p,saved)}</b>, 논문 값 <b class="g-a">${fmt(p,a)}</b>${p.preprint?' <span class="tag-review">심사 중</span>':''}</p>
      ${gauge(p.g,p.unit,saved)}
      <p class="g-note">${Math.abs(d)<(g.max-g.min)*.03?'거의 맞히셨어요.':(d>0?'짐작이 실제보다 높았습니다.':'짐작이 실제보다 낮았습니다.')} ${esc(p.cap)}</p>
      <p class="g-legend"><span class="k you"></span>내 짐작 <span class="k ans"></span>이 연구의 값 <span class="k ref"></span>비교 기준</p>
      <button class="btn g-again">다시 짐작하기</button>`;
      host.querySelector('.g-again').onclick=()=>{store.set(key,null);draw()};
    }};
  draw();
}

const slug=(location.pathname.match(/posts\/([\w-]+)\.html/)||[])[1];
const p=slug&&C.POSTS.find(x=>x.slug===slug);
/* 눈금 점 말풍선: 마우스를 올리거나 누르면 그 점이 무엇인지 보여 준다 */
const tipEl=document.createElement('div');tipEl.className='gtip';tipEl.setAttribute('role','tooltip');document.body.appendChild(tipEl);
let tipFor=null;
function showTip(pt){const t=pt.dataset.label||pt.getAttribute('title');if(!t)return;
  if(pt.getAttribute('title')){pt.dataset.label=t;pt.removeAttribute('title')}
  tipEl.textContent=t;tipEl.classList.add('show');tipFor=pt;
  const r=pt.getBoundingClientRect(),w=tipEl.offsetWidth;
  tipEl.style.left=Math.min(Math.max(8,r.left+r.width/2-w/2),innerWidth-w-8)+'px';
  tipEl.style.top=(r.top-tipEl.offsetHeight-8<4?r.bottom+8:r.top-tipEl.offsetHeight-8)+'px'}
function hideTip(){tipEl.classList.remove('show');tipFor=null}
document.addEventListener('mouseover',e=>{const pt=e.target.closest&&e.target.closest('.gauge .pt,.strip .d');if(pt)showTip(pt)});
document.addEventListener('mouseout',e=>{if(e.target.closest&&e.target.closest('.gauge .pt,.strip .d'))hideTip()});
document.addEventListener('click',e=>{const pt=e.target.closest&&e.target.closest('.gauge .pt,.strip .d');if(pt){tipFor===pt?hideTip():showTip(pt)}else hideTip()});
addEventListener('scroll',hideTip,{passive:true});

/* 짐작 기록: 모든 글에서 남긴 짐작을 모은다 */
function guesses(){return C.POSTS.map(p=>({p,g:store.get('guess:'+p.slug,null),a:answer(p)})).filter(x=>x.a!=null)}

window.SITE={gauge,fmt,answer,guess,esc,guesses,store};
if(!p) return;
const q=C.QUESTIONS[QI[p.q]];

/* 1) 결론 블록 */
const anchor=document.querySelector('.hero');
if(anchor){
  const box=document.createElement('section');box.className='concl';box.setAttribute('aria-label','이 연구의 결론');
  box.innerHTML=`<p class="c-label">이 연구의 결론</p>
  <p class="c-text">${esc(p.concl)}</p>
  <p class="c-q">이 연구가 답하려 한 질문: <a href="../#q=${q.id}">${esc(q.q)}</a><br>${esc(p.jr)}, ${p.year}. 저는 ${esc(p.role)}로 참여했습니다.</p>
  ${p.g?'<div class="guess"></div>':''}`;
  anchor.after(box);
  const gh=box.querySelector('.guess');if(gh)guess(p,gh);
}

/* 3) 연결 */
const foot=document.querySelector('footer');
if(foot){
  const same=C.POSTS.filter(x=>x.q===p.q&&x.slug!==p.slug);
  const topics=C.TOPICS.filter(t=>t.slugs.includes(p.slug));
  const link=x=>`<li><a href="${x.slug}.html">${esc(x.short)}</a>${x.preprint?' <span class="tag-review">심사 중</span>':''}<span>${esc(x.jr)}, ${x.year}</span></li>`;
  const bySlug=s=>C.POSTS.find(x=>x.slug===s);
  const sec=document.createElement('section');sec.className='connect';sec.setAttribute('aria-label','이어지는 연구');
  sec.innerHTML=`<h2>이 연구가 이어지는 곳</h2>
  <div class="cx">
    <div><h3>같은 질문: ${esc(q.q)}</h3><p class="cx-a">${esc(q.a)}</p>${same.length?`<ul>${same.map(link).join('')}</ul>`:'<p class="note">아직 이 질문의 다른 해설은 없습니다.</p>'}</div>
    ${topics.map(t=>`<div><h3>같은 주제: ${esc(t.name)}</h3><ul>${t.slugs.filter(s=>s!==p.slug).map(bySlug).filter(Boolean).map(link).join('')}</ul></div>`).join('')}
  </div>
  <p class="cx-back"><a href="../#p=${p.slug}">연구 도록에서 이 논문 보기</a><a href="../#q=${q.id}">이 질문의 측정값 모아 보기</a></p>`;
  foot.before(sec);
}
})();
