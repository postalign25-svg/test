(function(){
/* 사이트의 모든 데이터. 새 논문이나 해설 글을 추가할 때는 이 파일만 고치면 된다.
   POSTS: 해설 글. need는 홈과 글머리의 '이런 상황이라면?' 장면(scene, ask, opts, why). q는 QUESTIONS의 id, g는 측정값 눈금(min, max, ticks, pts[{v, ref, label}], band, ci).
   P: 전체 논문 목록 [분류, 연도, 저자, 제목, 학술지, 종류, 해설 글 경로]. 분류 'pre'는 심사 중인 프리프린트이며 어디서나 '심사 중'으로 표시한다.
   POSTS의 preprint:true도 같다. */

const TOPICS=[
 {id:'example',name:'예시 주제',slugs:['llm-psychometrics']},
];

const QUESTIONS=[
 {id:'a',short:'측정의 타당성',q:'우리가 측정한 것이 알고자 했던 대상과 같은가?',
  a:'AI가 그럴듯한 점수를 내는 것과 그 점수가 실제 마음이나 몸의 상태를 재는 것은 다릅니다. 기록과 설문도 환자 상태의 완전한 정답이 아닙니다. 데이터는 현실 그 자체가 아니라 관찰되고 선택적으로 기록된 결과라고 보고, 측정값이 무엇을 재는지부터 확인합니다.'},
 {id:'b',short:'다른 집단으로의 이전',q:'한 집단에서 얻은 지식이 다른 집단에서도 유지되는가?',
  a:'한 병원에서 만든 모델이 다른 병원, 다른 시기, 다른 인구에서도 같은 성능을 내는지 매번 확인합니다. 외부 검증에서 성능이 떨어지면 그 크기와 이유까지 보고합니다.'},
 {id:'c',short:'복잡함의 값어치',q:'복잡한 방법이 단순한 방법보다 실제로 더 나은가?',
  a:'새 방법을 내세우기보다, 단순한 기준선과 나란히 놓고 언제 실제로 가치를 더하는지 밝히려 합니다. 데이터가 적은 병원에서도 쓸 수 있는 방법에 특히 관심이 있습니다.'},
 {id:'d',short:'평균 뒤의 개인',q:'전체 평균 뒤에서 개별 환자는 어떤 영향을 받는가?',
  a:'평균 성능이 같은 두 모델이 같은 환자를 고위험군으로 분류한다는 보장은 없습니다. 환자에게 모델의 차이는 소수점이 아니라 경고를 받는지, 추가 검사를 받는지의 문제입니다.'},
 {id:'e',short:'현장의 조건',q:'모델은 어떤 조건에서 임상 현장에 쓰일 수 있는가?',
  a:'정확도가 높아도 경보가 너무 많거나, 쓸 시점에 필요한 정보가 없거나, 행동으로 이어지지 않으면 환자에게 도움이 되지 않습니다. 언제, 누구에게, 무엇을 위해 쓸지를 함께 묻습니다.'},
];

const POSTS=[
 {slug:'llm-psychometrics',need:{"scene": "콜센터 상담원이 매일 남긴 음성 일기를 AI가 읽고, ‘오늘 스트레스 0.7’이라는 점수를 냅니다.", "ask": "이 점수를 믿고 써도 될지, 무엇부터 확인하시겠어요?", "opts": ["설문 점수와 얼마나 맞는지", "같은 글에 늘 같은 점수를 내는지", "그날그날의 기분 변화를 따라가는지"], "why": "셋 다 필요합니다. 그런데 지금까지의 연구는 대부분 첫 번째만 확인했습니다. 정답으로 쓰는 설문 자체가 불완전하면 설문과의 일치만으로는 측정 도구라고 말할 수 없어서, 이 연구는 다섯 가지 기준으로 함께 확인했습니다."},concl:'LLM이 만든 점수가 측정 도구로 쓸 만한지는 예측 정확도가 아니라 심리측정 증거로 답해야 합니다. 임상에서는 기존 선별 검사를 대신하기보다 곁에서 장기 모니터링을 돕는 도구로 두어야 하고, 자기보고 점수를 정답으로 잰 오류율은 새 측정의 실패를 부풀릴 수 있습니다.',q:'a',year:2026,jr:'J Med Internet Res',role:'공동 제1저자',
  short:'LLM 출력을 심리 측정치로 평가하기',title:'AI가 읽은 ‘오늘의 스트레스’, 믿고 쓸 수 있을까?',
  sum:'GPT가 음성 일기에서 뽑은 언어 특징을, 정확도 하나가 아니라 심리 측정 도구를 검증하는 다섯 가지 기준으로 평가했습니다.',
  val:'30.4%',unit:'하루 스트레스 설명력(R²)',cap:'기본 정보만 13.2%, 사전 방식(LIWC)을 더하면 16.9%',
  g:{min:0,max:.4,ticks:[0,.1,.2,.3,.4],pts:[{v:.132,ref:1,label:'기본 13.2%'},{v:.169,ref:1,label:'LIWC 16.9%'},{v:.304,label:'LLM 30.4%'}]}},
];
const P=[
 ['first',2026,'Jeong I, Park S, Jhon M, Kim D, Park J, Kim Y, Jang M, Kim J, Kim J, Lee H','Evaluating LLM-derived outputs as psychological measures: A five-domain psychometric framework with application to daily stress','Journal of Medical Internet Research','SCIE','posts/llm-psychometrics.html'],
].map(([cat,year,authors,title,venue,kind,post])=>({cat,year,authors,title,venue,kind,post}));
const AW=[];
const PJ=[];
const M=[];

window.CATALOG={TOPICS,QUESTIONS,POSTS,P,AW,PJ,M};
})();
