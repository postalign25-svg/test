# 정인용 Inyong Jeong · 개인 홈페이지

고려대학교 의료정보학 박사과정 정인용의 연구 소개 홈페이지와 기술 블로그입니다.

| 파일 | 내용 |
|---|---|
| `index.html` | 홈: 소개, 연구 질문, 연구, 논문(필터·검색), 경력, 저를 키운 말들, 연락처 |
| `posts/llm-psychometrics.html` | 블로그 글: JMIR 2026 논문 인터랙티브 해설 |
| `assets/profile.png` | 프로필 사진 |

## 새 블로그 글 추가하기
`posts/llm-psychometrics.html`을 복사해 내용을 바꾸고, `index.html`의 연구 섹션이나 논문 목록(`P` 배열의 마지막 값)에 링크를 걸면 됩니다.

---

## 블로그 글: AI가 읽은 '오늘의 스트레스', 믿고 쓸 수 있을까?

JMIR 2026 논문 **「Evaluating Large Language Model–Derived Outputs as Psychological Measures: A Five-Domain Psychometric Framework With Application to Daily Stress」**(Jeong et al., doi:10.2196/102768)를 쉽게 풀어 쓴 인터랙티브 기술 블로그입니다.

외부 빌드 도구 없이 `posts/llm-psychometrics.html` 파일 하나로 동작합니다.

## 독자가 직접 해볼 수 있는 것
- 용어 툴팁 (ICC, LIWC, EMA, GEE 등)
- 13개 언어 특징 탐색 카드
- 단어 사전 방식의 한계를 보여주는 장난감 카운터 (부정문, 인용문)
- 5개 도메인 단계별 탐색: 재추출 시뮬레이터, 정렬 가능한 상관 차트, 사람 간/사람 내 산점도, 4-arm 설명력 비교, 전문가 평가와 오류 귀인
- 복습 퀴즈, 도메인 투표, 반응 버튼 (브라우저에 저장)
- 다크 모드, 모바일 대응, 인용문 복사

## GitHub Pages로 공개하기
1. 이 브랜치를 `main`에 병합합니다.
2. 저장소 **Settings → Pages**로 갑니다.
3. **Source: Deploy from a branch**, **Branch: `main` / `(root)`**를 선택하고 저장합니다.
4. 1~2분 뒤 `https://postalign25-svg.github.io/test/`에서 볼 수 있습니다.

## 댓글 켜기 (선택, giscus)
지금 투표와 반응은 각 방문자의 브라우저에만 저장됩니다. 방문자끼리 대화하려면 GitHub Discussions 기반 댓글 기능을 연결하세요.
1. 저장소를 **Public**으로 두고 **Settings → General → Features**에서 **Discussions**를 켭니다.
2. <https://github.com/apps/giscus>에서 giscus 앱을 이 저장소에 설치합니다.
3. <https://giscus.app/ko>에 저장소 이름을 넣고 카테고리(예: Announcements)를 고르면 `repo-id`와 `category-id`가 나옵니다.
4. `posts/llm-psychometrics.html` 아래쪽의 `const GISCUS={...}`에 그 값을 채웁니다.

## 출처와 라이선스
원문은 CC BY 4.0으로 공개되었습니다 (© Jeong et al., Journal of Medical Internet Research). 수치는 원문의 표와 본문에서 가져왔고, '가상 예시'와 '시뮬레이터'로 표시된 부분은 이해를 돕기 위해 만든 것입니다.
