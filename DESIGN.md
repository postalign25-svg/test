---
version: alpha
name: 정인용 연구 홈페이지
description: 의료정보학 연구자 정인용의 연구와 논문 해설. 측정값이 무엇을 뜻하고 어디까지 믿을 수 있는지를 보여 주는 사이트.
colors:
  ground: "#fbfcfd"      # 결과지 종이
  surface: "#f1f3f6"     # 참고 상자, 인터랙티브 영역
  surface-2: "#e2e6eb"   # 막대 바탕
  ink: "#1c2128"         # 본문, 선택된 버튼
  ink-2: "#47505c"       # 보조 글
  ink-3: "#5f6873"       # 캡션, 축
  line: "#d3d9e0"        # 구분선
  signal: "#b42318"      # 측정값(이 연구의 결과)에만
  comparator: "#3f6489"  # 비교 대상(기존 방법, 외부 데이터)
  base: "#8a94a1"        # 기준선, 비교 기준 점
  range: "#dbe5ef"       # 참고범위 띠
typography:
  display: { fontFamily: "IBM Plex Sans KR", fontWeight: 600-700, letterSpacing: "-0.015em" }
  body: { fontFamily: Pretendard, fontSize: 17px, lineHeight: 1.75 }
rounded:
  r: 4px                 # 버튼, 상자, 입력창. 원형은 사진과 눈금 점뿐
spacing: { section: 72-88px, block: 20px }
---

## Overview

정인용의 연구는 "우리가 측정한 것이 알고자 했던 대상과 같은가"라는 질문에서 출발한다. 사이트의 모습도 그 세계에서 가져온다. 검사 결과지가 측정값을 참고범위 위에 표시하듯, 핵심 수치는 눈금 위의 점과 신뢰구간으로 보여 준다(`.gauge`). 이것이 사이트의 단 하나의 시그니처다.

모든 페이지는 `assets/site.css`를 불러오고, 그 페이지에만 필요한 규칙만 자기 `<style>`에 둔다. 토큰을 새로 만들거나 색을 직접 쓰지 않는다.

## Colors

- **Signal(#b42318)**: 지금 이야기하는 측정값에만. 큰 수치, 눈금의 빨간 점, 이 연구 쪽 막대. 버튼이나 링크에는 쓰지 않는다.
- **Comparator(#3f6489)**: 비교 대상(기존 도구, 외부 병원). `--liwc`, `--ext` 토큰.
- **Ink**: 본문과 선택된 상태(눌린 버튼은 먹색으로 채움).
- 어두운 모드는 `site.css`의 같은 토큰 이름으로 정의돼 있다.

## Typography

제목(h1-h3), 큰 수치, 인용문은 IBM Plex Sans KR. 본문은 Pretendard. 숫자는 tabular-nums. 라벨은 문장형 한국어로 쓰고, 대문자 영문 라벨과 고정폭 글꼴 라벨은 쓰지 않는다.

## Layout

본문 폭 740px(홈은 820px), 왼쪽 정렬. 면은 그림자 없이 옅은 바탕색(`.card`)으로 구분하고, 목록은 가는 구분선으로 나눈다. 상단 바와 테마 버튼은 모든 페이지가 같은 마크업을 쓴다(글 페이지는 `posts/llm-psychometrics.html`의 header를 그대로 복사).

## Components

- `.gauge`: 축, 눈금(`.tick`), 참고범위(`.band`), 신뢰구간(`.ci`), 측정값 점(`.pt`, 비교 기준은 `.pt.ref`).
- `.stats/.stat`: 핵심 수치 행. 카드가 아니라 구분선으로 나뉜 한 줄.
- `.seg`, `.chip`, `.step`: 선택 버튼. 눌리면 먹색으로 채움.
- `.callout`: 바탕색만 있는 참고 상자. 색 띠 없음.

## Don't

- 이모지 아이콘, 버튼이나 링크 끝의 화살표, `A · B · C` 메타 문자열
- 모든 면에 같은 둥근 모서리와 그림자, 왼쪽 색 띠 상자, 반투명 블러 헤더
- 제목 속 한 단어만 색칠하기, 장식용 01/02/03 번호
- 크림 바탕과 테라코타, 검은 바탕과 형광 한 색, 보라색 그라디언트
- 그라디언트 글자, 튀는(bounce) 애니메이션
