# 데이터 형식

## PaperCard (작업용, 공개하지 않음) `work/cards/<id>.json`

```json
{
  "id": "2025-jmir-aki-gw",
  "file": "papers/xxx.pdf",
  "type": "original | review | preprint | abstract | letter | erratum",
  "title": "원문 제목 그대로",
  "title_ko": "한국어 짧은 제목(20자 안팎)",
  "journal": "J Med Internet Res",
  "year": 2025, "volume": "27", "pages_or_article": "e66568", "doi": "10.2196/66568",
  "status": "published | in press | preprint (vN, date)",
  "license": "CC BY 4.0 등 PDF에 적힌 그대로",
  "authors": ["Cho N-J", "Jeong I", "..."],
  "owner_role": "first | co-first | corresponding | co-corresponding | co-author k/n",
  "owner_role_evidence": "author line / footnote verbatim, page",
  "question": "이 논문이 답하려는 질문(한국어 1문장)",
  "motivation": "왜 필요한가(Introduction 기반, 2문장)",
  "domain": ["신장", "중환자"],
  "data": {"source": "3개 병원 EMR", "n": "137,437명", "period": "2013-2021", "country": "KR"},
  "design": "retrospective cohort | prospective | RCT | benchmark | review ...",
  "methods": ["XGBoost", "SHAP"],
  "method_family": ["tree ensemble", "explainability"],
  "validation": ["internal CV", "external hospital", "temporal", "prospective"],
  "key_results": [
    {"label": "외부 병원 AUROC (AKI)", "value": 0.886, "ci": null, "comparator": {"label": "AKD", "value": 0.783}, "page": 7, "quote": "..."}
  ],
  "conclusion_ko": "Conclusion 절에 충실한 1~2문장",
  "conclusion_quote": {"text": "...", "page": 10},
  "limitations": [{"text_ko": "...", "quote": "...", "page": 9}],
  "stance_signals": [{"text": "verbatim", "page": 9, "tag": "external validation"}],
  "discrepancies": ["표 2와 본문 수치가 다름 (공개하지 않음, 사용자에게만 보고)"],
  "figures_needed": "인터랙티브로 살릴 만한 표/그림 메모"
}
```

## 사이트 데이터 `assets/catalog.js`

전체를 IIFE로 감싸고 `window.CATALOG={TOPICS,QUESTIONS,POSTS,P,AW,PJ,M}`만 노출한다(글 페이지의 전역 변수와 충돌 방지).

```js
QUESTIONS = [{id:'a', short:'측정의 타당성', q:'우리가 측정한 것이 알고자 했던 대상과 같은가?', a:'2~3문장 설명'}]
TOPICS    = [{id:'kidney', name:'신장', slugs:['aki-general-wards', ...]}]
POSTS     = [{
  slug, q,                       // 해설 글 파일명, 질문 id
  need:{scene, ask, opts:[3], why},  // 이런 상황이라면? (정답 없음)
  concl,                         // 결론(논문 Conclusion에 충실)
  year, jr, role,                // 학술지 약칭, 저자 역할(한국어)
  preprint:true?,                // 프리프린트면
  short, title, sum,             // 색인용 짧은 제목, 해설 제목, 2문장 요약
  val, unit, cap,                // 핵심 수치 표시, 단위 설명, 눈금 아래 설명
  g:{min,max,ticks,pts:[{v,ref,label}],band?,ci?}  // 측정값 눈금. ref:1 = 비교 기준(회색). 빨간 점은 마지막 비-ref 점
}]
P  = [[cat, year, authors, title, venue, kind, postPath?], ...]  // 전체 목록. cat: first|co|other|pre|conf
AW, PJ, M                         // 수상, 과제, 배운 말(교수님 사이트에서는 빼거나 바꿈)
```

교수님 사이트에서 추가로 필요한 것:
- `P`에 `owner_role`(교신저자 포함)과 주제, 방법 태그를 넣어 필터에 쓴다.
- B 등급 공통 페이지용으로 POSTS와 같은 형식의 `CARDS`(해설 글 없이 데이터만). `paper.html?id=`가 이것을 읽는다.
- 홈의 연도 × 주제 흐름 그림용 집계는 빌드 스크립트가 만든다.
