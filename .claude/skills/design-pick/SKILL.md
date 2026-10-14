---
name: design-pick
description: >-
  Claude로 PPT·발표자료나 웹사이트를 만들 때, AI 기본 미감(보라 그라디언트·둥근 카드·천편일률)으로
  수렴하지 않도록 80가지 검증된 디자인 스타일 팩 중 하나를 골라 그 명세대로 생성하게 하는 스킬.
  사용자가 "PPT/슬라이드/덱/발표자료" 또는 "웹사이트/랜딩페이지/UI"를 만들어 달라고 하면서
  "디자인 팩", "특정 스타일로", "다양하게", "뻔하지 않게", "고급스럽게", "○○ 느낌으로", "design-pick"
  을 언급하거나, 팩 슬러그(예: web-velvet-dark-boutique, ppt-mckinsey-ghost-deck)를 직접 지정하면
  반드시 이 스킬을 사용한다. 무슨 느낌인지 말하면 어울리는 팩 2~3개를 추천하고, 사용자가 고른 팩의
  정밀 디자인 명세를 적용해 결과물을 생성한다. 후속으로 "다른 팩으로", "팩 바꿔", "추천 다시"도 이 스킬.

  단순 텍스트 작성·요약은 이 스킬을 쓰지 않는다 — 디자인 결과물(슬라이드/웹페이지) 생성에만 쓴다.
---

# Design Pick — 디자인 팩으로 다양한 PPT·웹 만들기

AI에게 발표자료나 웹페이지를 맡기면 결과물이 매번 비슷하다 — 같은 그라디언트, 같은 둥근 카드.
이 스킬은 서로 뚜렷이 구별되는 **80가지 디자인 팩**(PPT 40 + 웹 40) 중 하나를 골라, 그 팩의
정밀 명세대로 생성하게 한다. 각 팩은 색·타이포·레이아웃·차트·다이어그램·"하지 말 것"까지
절대값으로 규정돼 있어, AI가 일관되고 또렷한 스타일의 결과물을 낸다.

## 동작 방식

1. **무엇을 만들지 파악** — PPT(발표자료/슬라이드/덱)인지 웹(웹사이트/랜딩/UI)인지 확인.
2. **팩 선택**
   - 사용자가 **슬러그를 직접 지정**(예: `web-velvet-dark-boutique`)했으면 → 그 팩으로 바로 진행.
   - **느낌만 말했으면**(예: "고급스러운 다크 톤") → 아래 카탈로그에서 트랙이 맞는 팩 중
     어울리는 **2~3개를 이유와 함께 추천**하고 사용자가 고르게 한다. 절대 80개를 나열하지 않는다.
3. **명세 로드** — 고른 팩의 명세 파일 `references/{slug}.md` 를 읽는다.
4. **그대로 생성** — 명세를 충실히 따라 결과물을 만든다. 특히 명세의 **"하지 말 것"** 섹션을
   반드시 지킨다 — 이것이 AI 기본 미감으로 회귀하는 것을 막는 핵심이다.
   - PPT 팩: 표지·본문·차트·다이어그램(프로세스·타임라인·매트릭스·KPI) 양식까지 명세에 있다.
   - 웹 팩: 레이아웃·컴포넌트·타이포·모션까지 명세에 있다.

## PPT 팩 — 출력 형식 (필수)

PPT 팩으로 `.pptx` 를 만들 때는 **반드시 편집 가능한 네이티브 PowerPoint 파일**로 생성한다.
제목·본문·표·불릿·도형·화살표가 모두 python-pptx 네이티브 객체(텍스트박스·표·오토셰이프·
커넥터)여야 한다.

- **금지** — HTML/CSS 로 렌더한 뒤 슬라이드를 통째로 PNG 이미지로 박는 "풀블리드 PNG" 방식.
  보기엔 똑같아도 PowerPoint 에서 글자 한 자도 못 고친다. 발표 직전 수정이 불가능해 실무에서
  쓸 수 없다 — 디자인 재현도가 아무리 높아도 이 방식으로 납품하지 않는다.
- 차트·다이어그램·인포그래픽도 가능한 한 네이티브 도형으로 그린다. 사진·일러스트만
  이미지로 삽입한다.
- 한글 본문은 한글 글꼴(Pretendard 등), 영문 라벨 글꼴은 `.pptx` 에 임베딩해 어느 PC에서도
  깨지지 않게 한다.

## 대안 — Claude.ai 에 붙여넣어 만들기

별도 파이프라인 없이, 팩의 `references/{slug}.md` 명세와 원본 자료(강의·기획 MD 등)를
**Claude.ai 채팅에 그대로 붙여넣고 "이 디자인 명세대로 편집 가능한 .pptx 를 만들어달라"**
고 요청해도 된다. Claude.ai 는 `.pptx` 파일을 직접 생성해 다운로드로 제공한다 — 위
"편집 가능한 네이티브" 원칙은 이 경우에도 동일하게 적용된다.

## 추천 요령 (느낌 → 팩 매핑)

사용자의 표현을 팩의 축·계열로 매핑해 후보를 좁힌다:
- "고급/럭셔리/우아" → 럭셔리·헤리티지·다크 부티크 계열
- "전문적/신뢰/컨설팅/보고서" → 컨설팅·전략·맥킨지·정책 계열
- "다이어그램/도식/프로세스 많이" → 인포그래픽·블루프린트·아이소메트릭 계열
- "미니멀/깔끔/절제" → 스위스·미니멀·모노 계열
- "강렬/대담/눈에 띄게" → 브루탈리즘·멤피스·컬러블록·빅타이포 계열
- "다크/테크" → 다크테크·터미널·루미너스·프리즘 계열
추천 시 각 후보가 baseline(밋밋한 기본 디자인)과 어떻게 다른지 한 줄로 설명한다.

## 카탈로그 — 프레젠테이션 (PPT 40)

- `ppt-consulting-precision-grid` — 컨설팅 정밀그리드: 12열 모듈러 그리드 위 무채색 본문과 단일 강조색의 헤어라인 보더 데이터 박스, 액션 타이틀 헤더의…  · mono/minimal-sans/strict-grid/dense/none
- `ppt-keynote-minimal-fullbleed` — Keynote 미니멀 풀블리드: 풀블리드 사진 또는 단색 배경에 한 줄 문장만, 압도적 여백의 한 장 한 메시지 극단적 절제.  · mono/minimal-sans/full-bleed/airy/subtle
- `ppt-editorial-magazine` — 에디토리얼 매거진: 스프레드 단위 다단 칼럼 그리드, 큰 세리프 헤드라인과 드롭캡, 잡지 활자 부속의 출판물 위계.  · mono/serif-editorial/asymmetric/balanced/none
- `ppt-neo-brutalism` — 네오브루탈리즘: 두꺼운 검정 보더와 하드 섀도, 원색 블록의 거친 충돌, 거대 굵은 산세리프의 의도적 비대칭.  · vivid-primary/heavy-display/block-grid/dense/snappy
- `ppt-glassmorphism` — 글래스모피즘: 컬러풀 그라디언트 배경 위 부유하는 반투명 프로스티드 글래스 패널, 하이라이트 보더의 깊이감.  · gradient/minimal-sans/centered/airy/subtle
- `ppt-korea-policy-navy` — 한국 정책보고서 네이비: 네이비 헤더바와 굵은 한국어 고딕 타이틀, 좌측 번호 섹션, 정렬된 박스 본문의 한국 공공 보고서 정…  · dark/minimal-sans/strict-grid/balanced/none
- `ppt-dark-tech` — 다크모드 테크: 차콜 배경에 네온 시안·바이올렛 강조와 발광 라인, 모노스페이스 라벨의 사이버틱한 테크 컨퍼런스 톤.  · dark/mono/asymmetric/balanced/snappy
- `ppt-hand-drawn-sketch` — 핸드드로운 스케치: 손그림 테두리와 거친 펜 스트로크 화살표·말풍선, 크림색 종이 질감의 비격식 워크숍 톤.  · earth/mixed/asymmetric/balanced/playful
- `ppt-data-infographic-heavy` — 데이터 인포그래픽 헤비: 차트·KPI 카드·아이콘 통계가 빽빽한 대시보드형 레이아웃, F자 동선의 정보 밀도가 정체성.  · vivid-primary/minimal-sans/block-grid/dense/subtle
- `ppt-monochrome-risk` — 모노크롬 리스크: 순수 흑백 단계만, 굵은 경고 헤드라인과 두꺼운 룰 라인 구획의 의도적으로 엄숙한 리스크 보고 톤.  · mono/heavy-display/strict-grid/balanced/none
- `ppt-memphis-retro-90s` — 90s 멤피스 레트로: 지그재그·도트·테라조 패턴과 비정형 기하 도형, 원색 충돌의 80~90s 포스트모던 무질서.  · vivid-primary/heavy-display/asymmetric/dense/playful
- `ppt-minimal-mono-note` — 미니멀 모노 노트: 넓은 여백의 화이트 지면에 모노스페이스 폰트만, 잉크 블랙 하나의 정적인 타자기 노트 미감.  · mono/mono/centered/airy/none
- `ppt-botanical-organic` — 보태니컬 오가닉: 베이지·테라코타·모스그린 어스 톤과 손그림 식물 일러스트, 유기적 곡선의 자연·웰니스 톤.  · earth/serif-editorial/asymmetric/airy/subtle
- `ppt-vivid-gradient-future` — 비비드 그라디언트 퓨처: 채도 높은 다색 메시 그라디언트가 배경을 채우고 발광 곡선·추상 3D가 부유하는 미래 비전 톤.  · gradient/heavy-display/full-bleed/balanced/snappy
- `ppt-print-first-newspaper` — 프린트-퍼스트 뉴스페이퍼: 다단 칼럼과 굵은 세리프 마스트헤드, 가는 룰 라인 구획의 뉴스프린트 신문 지면 정형.  · mono/serif-editorial/block-grid/dense/none
- `ppt-swiss-editorial-bold` — 스위스 에디토리얼 볼드: 정밀 그리드 위에 거대한 압축 디스플레이 활자를 일러스트처럼 쓰는 의도된 혼돈의 편집 디자인.  · vivid-primary/heavy-display/strict-grid/balanced/snappy
- `ppt-bauhaus-geometric` — 바우하우스 지오메트릭: 원·삼각형·사각형 기본 도형과 빨강·노랑·파랑 삼원색, 비대칭 균형의 기능주의 기하 구성.  · vivid-primary/heavy-display/asymmetric/balanced/none
- `ppt-expressive-material` — 익스프레시브 머티리얼: Material 3 Expressive의 대담한 색과 가변 폰트 변주, 큰 둥근 형태와 명랑한 모션의…  · vivid-primary/mixed/block-grid/balanced/playful
- `ppt-luxury-editorial-serif` — 럭셔리 에디토리얼 세리프: 넓은 여백의 오프화이트 지면에 가는 하이콘트라스트 디드로 세리프, 절제된 골드 한 점의 우아한 톤.  · mono/serif-editorial/centered/airy/subtle
- `ppt-startup-pitch-colorful` — 스타트업 피치 컬러풀: 채도 높은 4~5색 팔레트와 둥근 키워드 배지, 거대 숫자 메트릭이 지배하는 데모데이 에너지.  · vivid-primary/mixed/centered/balanced/playful
- `ppt-precision-fintech-deck` — Precision Fintech Deck: 푸른 회색 면 위 단일 인디고-바이올렛 강조색이 CTA·핵심 수치·차트를 모두 책임지는 절제된 핀테크…  · pastel/minimal-sans/asymmetric/airy/subtle
- `ppt-engineered-dark-deck` — Engineered Dark Deck: 차콜 배경에 미세 라디얼 글로우 한 점, 중립 산세리프와 헤어라인 보더, 120~180ms 마이크로 …  · dark/minimal-sans/centered/airy/snappy
- `ppt-warm-hospitality-deck` — Warm Hospitality Deck: 흰 캔버스에 단일 산호-레드 강조와 둥근 터미널 휴머니스트 산세리프, 풀블리드 라운드 코너 사진의 환…  · earth/minimal-sans/full-bleed/airy/playful
- `ppt-monochrome-infrastructure-deck` — Monochrome Infrastructure Deck: 순백·순흑만으로 환원한 인프라 덱 — 산세리프+모노 혼합, 1px 헤어라인 보더, 색이 아닌 굵기 대…  · mono/mixed/strict-grid/balanced/subtle
- `ppt-expressive-soundwave-deck` — Expressive Soundwave Deck: 다크 캔버스에 활기찬 듀오톤 그라디언트를 면적으로 깔고 초대형 와이드 디스플레이로 한 슬라이드 한 메…  · gradient/heavy-display/block-grid/balanced/playful
- `ppt-editorial-product-deck` — Editorial Product Deck: 크림-아이보리 면에 잉크 블랙, 세리프 헤딩+산세리프 본문, 12열 엄격 그리드의 따뜻한 미니멀리즘 …  · earth/serif-editorial/strict-grid/balanced/none
- `ppt-cinematic-keynote-deck` — Cinematic Keynote Deck: 순흑 무대 위 거대 키 비주얼 한 점과 최소 텍스트, 정연한 균형 리듬과 끝의 서머리 슬라이드를 가진…  · dark/minimal-sans/full-bleed/balanced/subtle
- `ppt-confident-color-block-deck` — Confident Color-Block Deck: 흰 바탕에 큼직한 솔리드 컬러 블록(슬라이드당 1~2색)을 비대칭으로 깔고 화이트 헤비 산세리프를 얹…  · vivid-primary/heavy-display/asymmetric/airy/snappy
- `ppt-strategy-navy-deck` — Strategy Navy Deck: 다층 블루 2색 시스템과 세리프 헤딩+산세리프 본문, 12열 그리드 위 액션 타이틀과 근거 모듈의 전…  · vivid-primary/mixed/strict-grid/dense/none
- `ppt-heritage-luxury-deck` — Heritage Luxury Deck: 세피아-샴페인 톤과 골드 헤어라인, 하이콘트라스트 디돈 세리프를 중앙에 앉힌 헤리티지·럭셔리 IR 덱…  · earth/serif-editorial/centered/balanced/subtle
- `ppt-isometric-platform-deck` — Isometric Platform Deck: 밝은 쿨그레이 캔버스 위 정사 아이소메트릭 투영의 입체 플랫폼·블록·계단 구조가 콘텐츠를 떠받치고, …  · mono/minimal-sans/centered/airy/subtle
- `ppt-mckinsey-ghost-deck` — MBB Ghost Deck Framework: 순백 캔버스에 완결된 문장의 액션 타이틀과 슬레이트 그레이 본문, 색 대신 굵기로만 강조하는 MBB식…  · mono/minimal-sans/asymmetric/balanced/none
- `ppt-blueprint-schematic-deck` — Blueprint Schematic Deck: 딥 인디고-블루 배경에 1px 시안 도트 그리드를 청사진처럼 노출하고, 치수 보조선·인출선·단면 해치…  · dark/mono/strict-grid/dense/none
- `ppt-editorial-infographic-deck` — Editorial Infographic Deck: 오프화이트 지면에 큰 세리프 헤드라인과 가는 룰 라인 구획, 잉크 레드 한 점으로 데이터를 신문·잡지…  · vivid-primary/serif-editorial/block-grid/balanced/none
- `ppt-vivid-gradient-infographic-deck` — Vivid Gradient Infographic Deck: 밝은 캔버스 위 채도 높은 듀오톤 그라디언트가 둥근 알약 노드·아이콘 칩·KPI 링을 채우는 VC 피…  · gradient/heavy-display/block-grid/balanced/playful
- `ppt-bold-block-infographic-deck` — Bold Block Infographic Deck: 흰 바탕에 차콜·앰버·틸 3색 솔리드 컬러 블록이 노드·구간·셀이 되어 다이어그램 자체를 이루는, 보…  · vivid-primary/heavy-display/block-grid/dense/none
- `ppt-prismatic-dark-deck` — Prismatic Dark Diagram Deck: 잉크 네이비-블랙 배경에 다이어그램 노드·라인이 시안→마젠타→앰버 프리즘 그라디언트로 발광하는 테크 …  · gradient/minimal-sans/full-bleed/balanced/snappy
- `ppt-soft-pastel-system-deck` — Soft Pastel System Deck: 오프화이트 캔버스에 라일락·민트·피치 파스텔 3색과 부드러운 멀티 섀도, 통통한 라운드 노드·카드로 …  · pastel/minimal-sans/centered/balanced/snappy
- `ppt-archival-index-deck` — Archival Index Deck: 종이빛 베이지 캔버스에 세리프+등폭 혼합, 도서관 카드·아카이브 대장처럼 모든 다이어그램을 번호·라벨…  · mono/mixed/strict-grid/dense/none
- `ppt-warm-minimal-diagram-deck` — Warm Minimal Diagram Deck: 따뜻한 샌드-아이보리 캔버스에 잉크 브라운 본문과 단일 테라코타 강조, 가는 1pt 라인 다이어그램과…  · earth/minimal-sans/centered/airy/none

## 카탈로그 — 웹사이트 (40)

- `web-swiss-grid` — Swiss Grid Minimal: 엄격한 12열 모듈러 그리드와 좌측 정렬 비대칭, 단일 강조색의 장식 없는 순수 그리드.  · mono/minimal-sans/strict-grid/balanced/none
- `web-neo-brutalism` — Neo-Brutalism: 거친 검정 하드 보더와 오프셋 하드 섀도, 원색 블록의 채도 충돌과 굵은 디스플레이의 antidesi…  · vivid-primary/heavy-display/asymmetric/dense/snappy
- `web-glassmorphism` — Glassmorphism: 반투명 서리 낀 유리 표면과 backdrop-blur, 그라디언트 배경 위 부유하는 패널의 깊이감.  · gradient/minimal-sans/centered/airy/subtle
- `web-editorial-longform` — Editorial Longform: 단일 좁은 본문 컬럼과 큰 세리프 본문, 오버사이즈 헤드라인·드롭캡의 잡지 기사형 롱폼.  · mono/serif-editorial/centered/airy/subtle
- `web-dark-terminal` — Dark Tech / Terminal: 거의 검정 배경에 모노스페이스 텍스트와 형광 강조색, 헤어라인 그리드의 개발자 콘솔 미감.  · dark/mono/strict-grid/dense/subtle
- `web-claymorphism` — Claymorphism Soft: 통통하게 부푼 점토 같은 3D 표면과 더블 섀도, 파스텔 톤의 촉각적 장난감 미감.  · pastel/minimal-sans/centered/airy/playful
- `web-big-type-statement` — Big Type Statement: 화면을 가득 채우는 초대형 디스플레이 타이포가 콘텐츠 자체, 음수 자간과 무채 + 강조 하나.  · mono/heavy-display/full-bleed/airy/subtle
- `web-y2k-chrome` — Y2K Chrome Revival: 메탈릭 크롬 그라디언트와 홀로그램 광택, 블롭 형태·베벨 버튼의 레트로 사이버 미감.  · gradient/mixed/asymmetric/dense/playful
- `web-botanical-organic` — Botanical Organic: 흙빛·세이지·테라코타 어스 톤과 손그림 식물·유기 곡선 블롭, 자연 질감 배경의 웰니스 톤.  · earth/serif-editorial/asymmetric/airy/subtle
- `web-monospace-docs` — Monospace Docs: 전면 모노스페이스 타이포로 짠 라이트 모드 문서 사이트, 헤어라인 표 보더와 정렬의 정밀함.  · mono/mono/strict-grid/dense/none
- `web-minimal-luxury` — Minimal Luxury Fashion: 광활한 여백과 넓은 자간의 산세리프, 흑·백·아이보리 무채의 침묵하는 패션 하우스 럭셔리.  · mono/minimal-sans/full-bleed/airy/subtle
- `web-memphis-postmodern` — Memphis Postmodern: 원색·파스텔 충돌과 무작위처럼 흩뿌린 기하 도형, 테라초 질감의 포스트모던 키치.  · vivid-primary/mixed/asymmetric/dense/playful
- `web-news-journal-grid` — News / Journal Grid: 다단 밀집 그리드와 굵은 세리프 헤드라인, 가는 룰 구획의 신문 1면 미감 — 밀도가 곧 권위.  · mono/serif-editorial/strict-grid/dense/none
- `web-fun-illustrated` — Fun Illustrated: 플랫한 손맛 일러스트와 채도 높은 다색 팔레트, 둥근 굵은 산세리프의 명랑하고 친근한 톤.  · vivid-primary/heavy-display/centered/balanced/playful
- `web-ai-gradient-mesh` — AI Gradient Mesh: 흐르는 멀티 컬러 메시 그라디언트가 배경 전면을 채우고 그 위 솔리드 흰 카드, 글로우·노이즈 텍스처…  · gradient/minimal-sans/full-bleed/balanced/subtle
- `web-dark-luxury` — Dark Luxury: 깊은 차콜 배경에 금·샴페인 메탈릭 강조와 얇은 세리프 디스플레이, 어둠과 광택의 프리미엄 연출.  · dark/serif-editorial/full-bleed/airy/subtle
- `web-archive-library` — Archive / Library: 빽빽한 표·리스트·인덱스와 세리프·모노 혼합, 종이빛 베이지 배경의 디지털 아카이브 카탈로그 미감.  · earth/mixed/strict-grid/dense/none
- `web-material-expressive` — Material Expressive: Material 3 Expressive의 토널 색 시스템과 모핑 셰이프, 스프링 기반 통통한 모션의 …  · vivid-primary/minimal-sans/block-grid/balanced/playful
- `web-risograph-print` — Risograph Print: 2~3색 스폿 컬러의 의도적 오프셋과 거친 망점·그레인, 형광 잉크 톤의 리소그래프 인쇄 미감.  · vivid-primary/heavy-display/block-grid/balanced/snappy
- `web-bauhaus-geometric` — Bauhaus Geometric: 바우하우스 조형 원리 — 원·삼각형·사각형의 기본 도형, 빨강·노랑·파랑 3원색에 검정·흰색, 기하학…  · vivid-primary/heavy-display/block-grid/balanced/snappy
- `web-precision-fintech` — 정밀 핀테크 라이트: 오프화이트와 잉크 네이비 본문, 상단 1/3을 가르는 이리데센트 파스텔 밴드, 음수 자간 가는 그로테…  · mono/minimal-sans/asymmetric/balanced/subtle
- `web-blueprint-grid` — 블루프린트 그리드: 흰 또는 잉크 블랙 캔버스에 1px 헤어라인 도트/라인 그리드를 청사진처럼 노출하고 콘텐츠를 격자에 …  · mono/mono/strict-grid/balanced/subtle
- `web-luminous-dark-bento` — 루미너스 다크 벤토: 딥 차콜 위 비대칭 벤토 타일이 1px 발광 보더로 떠 있고, 라디얼 글로우와 마이크로모션이 인터페이…  · dark/minimal-sans/block-grid/balanced/snappy
- `web-warm-workspace` — 웜 워크스페이스: 따뜻한 오프화이트와 잉크 그레이, 단색 라인 일러스트와 둥근 카드, 휴머니스트 세리프+산세리프 혼합의…  · earth/mixed/centered/airy/subtle
- `web-iridescent-marketing-flow` — 이리데센트 마케팅 플로우: 밝은 화이트 배경에 곡면형 컬러 블록이 흐르듯 끼어들고 굵은 산세리프·둥근 버튼·풀폭 일러스트 배너로…  · vivid-primary/heavy-display/full-bleed/balanced/playful
- `web-spatial-immersive-hero` — 스페이셜 이머시브 히어로: 스크롤에 따라 배경색이 전환되고 텍스트가 등장·소멸하는 수직 슬라이더, 부유하는 입체 오브제와 영화적…  · dark/minimal-sans/full-bleed/airy/playful
- `web-tactile-soft-product` — 택타일 소프트 프로덕트: 그레이지 배경에 부드러운 다중 그림자를 단 둥근 카드가 미세하게 떠 있고, 절제된 민트·코랄 강조와 …  · pastel/minimal-sans/centered/balanced/snappy
- `web-editorial-confidence` — 에디토리얼 컨피던스: 넓은 화이트 캔버스에 비대칭 다단, 큰 디스플레이 세리프 헤드라인과 단일 진한 면강조색, 헤어라인 룰…  · vivid-primary/serif-editorial/asymmetric/balanced/subtle
- `web-signal-monochrome` — 시그널 모노크롬: 순백·순흑 고대비 캔버스에 단일 시그널 컬러가 CTA에만 점처럼 찍히고, 빽빽한 위계와 색 반전 호버…  · mono/minimal-sans/asymmetric/dense/snappy
- `web-immersive-media-grid` — 이머시브 미디어 그리드: 잉크 블랙 배경에 풀블리드 미디어 타일이 모듈러 그리드로 빽빽이 깔린 몰입형 콜라주, 큰 산세리프와 …  · dark/heavy-display/block-grid/dense/playful
- `web-atelier-archive-serif` — 아틀리에 아카이브 세리프: 오프화이트 캔버스에 12열 엄격 그리드를 노출하되 갤러리 도록처럼 좌측 작품 인덱스 리스트와 우측 큰…  · mono/mixed/strict-grid/airy/none
- `web-haute-jewelry-noir` — 오트 주얼리 누아르: 거의 순흑 캔버스 위 단 하나의 제품 렌더가 라디얼 스포트라이트로 떠 있고, 가는 하이콘트라스트 세리…  · dark/serif-editorial/centered/airy/playful
- `web-cinematic-marque-reveal` — 시네마틱 마퀴 리빌: 잉크 블랙 캔버스에 21:9 시네마틱 풀블리드 키 비주얼과 스크롤 순차 리빌, 굵은 와이드 디스플레이…  · dark/heavy-display/full-bleed/airy/snappy
- `web-poetic-hospitality-scroll` — 포에틱 호스피탈리티 스크롤: 따뜻한 샌드·리넨 톤의 풀블리드 환경 사진 위 시처럼 짧은 휴머니스트 세리프 카피, 켄 번스식 줌·디…  · earth/serif-editorial/full-bleed/airy/playful
- `web-iridescent-noir-prestige` — 이리데센트 누아르 프레스티지: 딥 잉크 블랙 배경 위 텍스트 가장자리와 헤어라인 보더에만 절제되어 스미는 홀로그래픽 메탈릭 셰이딩,…  · gradient/mixed/asymmetric/airy/subtle
- `web-tactile-luxury-editorial` — 택타일 럭셔리 에디토리얼: 따뜻한 크림·샌드 배경에 종이 그레인·패브릭 위브 텍스처와 비대칭 다단 매거진 레이아웃, 세리프+산세…  · earth/mixed/asymmetric/balanced/subtle
- `web-prestige-saas-restraint` — 프레스티지 SaaS 리스트레인트: 차분한 오프화이트 배경에 절제된 그로테스크 헤드라인과 비대칭 제품 스크린샷, 잉크 슬레이트 단색과 스…  · mono/mixed/asymmetric/airy/snappy
- `web-grand-serif-statement` — 그랜드 세리프 스테이트먼트: 오프화이트 캔버스를 가득 채우는 초대형 디스플레이 세리프가 콘텐츠 자체가 되는 풀블리드 빅타이포, 음…  · mono/serif-editorial/full-bleed/balanced/subtle
- `web-velvet-dark-boutique` — 벨벳 다크 부티크: 딥 와인-차콜 배경에 벨벳 매트 질감과 골드-브론즈 헤어라인 보더를 두른 모듈러 벤토 룩북 타일, 세…  · dark/mixed/block-grid/balanced/subtle
- `web-couture-color-block` — 쿠튀르 컬러 블록: 흰 캔버스에 딥 버건디·포레스트·코발트의 깊은 채도 솔리드 컬러 블록이 비대칭으로 깔리고 가는 디스플…  · vivid-primary/serif-editorial/asymmetric/airy/none

## 출처·라이선스

각 팩은 공개 디자인 시스템·스타일에서 학습한 시각 원리의 명세이며 특정 제품의 상표·로고를
복제하지 않는다. 명세·문서는 MIT. 전체 카탈로그·미리보기: https://design-diversity.vercel.app
