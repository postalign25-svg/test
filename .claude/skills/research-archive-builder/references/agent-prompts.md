# 에이전트 프롬프트 템플릿

`{중괄호}`만 바꿔서 그대로 쓴다. 모든 템플릿에 공통으로 들어가야 하는 것:
- 자기만의 작업 폴더 `{SCRATCH}/{id}/` (공용 이름으로 파일을 쓰면 다른 에이전트와 섞인다)
- "커밋, 푸시하지 말 것. 지정한 파일 외에는 건드리지 말 것"
- 최종 보고 형식(통합할 때 그대로 옮겨 쓸 수 있게)

`{SCRATCH}` = 세션의 scratchpad 경로. Playwright는 `{SCRATCH}`에 한 번 `npm i playwright@1` 해 두고, 실행 파일은 `/opt/pw-browsers/chromium`.

---

## T1. 논문 카드 (모든 논문, 배치)

```
You are building structured "paper cards" for a research archive of {OWNER} ({ROLE_DESC}).
Read EVERY page of each PDF below (Read tool with `pages`, ≤20 pages per call; /usr/bin/pdftotext -layout for exact numbers).
Write extracted text only under {SCRATCH}/cards/{BATCH}/.

PDFs:
{LIST: id | path}

For each paper write {WORK}/cards/{id}.json following this schema exactly:
{PASTE PaperCard schema from data-schema.md}

Rules:
- Every number, the conclusion and each stated limitation must carry a short verbatim quote and page number in `evidence`.
- `owner_role`: first / co-first (only if an equal-contribution mark covers {OWNER}) / corresponding / co-corresponding / co-author with position "k of n". Quote the footnote.
- Do not judge the paper. If tables and text disagree, record both in `discrepancies` (this field is never published).
- `stance_signals`: phrases from Discussion/Conclusion showing what the authors care about (e.g. external validation, interpretability, clinical workflow, small data, label quality, fairness). Verbatim, with page.
- No commit, no push, touch no other file.
Final report: one line per paper (id, title, year, journal, owner_role, card written yes/no, anything unreadable).
```

## T2. 카드 검증 (무작위 10%)

```
Verify these paper cards against their PDFs: {LIST: id | card path | pdf path}.
For each card check: title/journal/year, owner_role (quote the author line/footnote), every number in key_results, the conclusion paraphrase.
Report per card: OK, or each field that is wrong with the correct value and page. Do not edit the cards.
```

## T3. 주제 묶기와 기술 통계

```
Input: all cards in {WORK}/cards/*.json (read only the fields: id, year, title_ko, question, data, methods, domain, design, validation, conclusion_ko, stance_signals).
1) Compute and write {WORK}/map.json: counts by year, domain, method family, design, validation type, owner_role; top collaborating institutions and co-authors.
2) Propose 4–7 themes. For each: name (Korean, short), one-sentence description, member ids, why they belong together.
3) List recurring questions/stances: each with ≥2 supporting ids and the verbatim stance_signals that support it.
Write {WORK}/themes.md. Do not invent anything not in the cards.
```

## T4. 연구 철학 초안

```
Using {WORK}/themes.md, {WORK}/map.json and the cards, draft {WORK}/philosophy-draft.md:
- One core question in one sentence (Korean), in the spirit of how the papers themselves talk.
- 3–5 research questions. For each: the question (Korean), a 2–3 sentence explanation, supporting papers (≥2, with verbatim quote + page), confidence (높음/중간/낮음).
- A short "흐름" paragraph: how the questions changed over the years, based on map.json.
Rules: every claim cites papers. No personality traits, motives or values that the papers do not state. Prefer the authors' own wording. Mark anything interpretive as 해석.
```

## T5. 반대 검증

```
Read {WORK}/philosophy-draft.md and the cards. For each claim: find papers that contradict or complicate it, and major bodies of work the draft ignores. Report: claim, counter-evidence ids with quotes, suggested rewording. Do not edit files.
```

## T6. 해설 글 (A 등급, 1명 = 1편)  ← 첫 실전에서 다듬은 최종판

```
Write ONE interactive Korean explainer post (single HTML file) for the research site of {OWNER}, who is {ROLE_IN_THIS_PAPER} of this paper. The site is in Korean and written in the owner's voice.

PAPER: {PDF path} ({journal, year, title})
CARD: {WORK}/cards/{id}.json (use it as a map, but read the whole PDF yourself)
OUTPUT: {SITE}/posts/{slug}.html   localStorage key prefix: "{prefix}:"
Related posts to link once in the body as "함께 읽기": {related slugs}

1. Read the WHOLE PDF (pages param, ≤20 per call); pdftotext allowed; write extracted text ONLY under {SCRATCH}/{slug}/.
2. Read {SITE}/DESIGN.md, {SITE}/assets/site.css, then the reference post {SITE}/posts/{reference}.html fully. Posts have NO author card. The situation card, conclusion block and related-links section are injected by ../assets/site.js from ../assets/catalog.js — do not build them, but keep the two <script src> tags at the end of <body> exactly as in the reference. Copy the reference <head> links, the exact <header class="top"> markup, and the theme/progress/tooltip/quiz/citation-copy scripts and storage wrapper. Only page-specific CSS in your <style>; only site.css tokens (var(--…)); no raw hex; radius only var(--r).
3. Design rules: no emoji; no "→" on links/buttons (axis direction only); no "A · B · C" meta strings; no ALL-CAPS labels; no side-stripe boxes; no shadows. Eyebrow: <p class="eyebrow">논문 해설: 주제1, 주제2</p>. Use the signature `.gauge` at least once.
4. Structure: <section class="hero"> (eyebrow, question-style h1, lede, meta: citation line, then reading time and number of interactive elements) → 30초 요약 (.card.tldr) → .stats (3–4 real numbers) → 목차 → why it matters → how the study was done (SVG diagram ok) → results with 3–5 interactive elements built from the paper's real numbers → meaning and limitations AS THE PAPER STATES THEM → 5-question quiz → footer (full citation, DOI link, license line from the PDF, note on illustrative parts). NO polls, NO reactions, NO comment widgets.
5. VOICE (owner's explicit rule): never criticize, second-guess or point out errors, typos or inconsistencies in the paper on the page. Never add your own skeptical comparisons (chance level, majority-class accuracy, "CIs overlap", "not tested"). If numbers disagree, use the table values consistently and report the discrepancy only to me.
6. Accuracy: numbers only from the paper. Figure-read values → "그림에서 읽은 대략값"; your arithmetic → "계산값"; made-up illustrations → "가상 예시". Do not overstate clinical value. Paraphrase; never reproduce figures; no face images. Follow the license (ND/NC → paraphrase only).
7. Test with Playwright (script in {SCRATCH}/{slug}/): no pageerror; scrollWidth == viewport at 390 and 1280; light and dark; click every control; look at screenshots and fix small text or overflow.
8. No commit, no push, touch no other file.

Final report (short):
- path; exact title; journal/year/volume/pages; DOI; owner's role (quote the author line/footnote); license
- for catalog.js: short (≤20 Korean chars), title (hero), sum (2 sentences), concl (1–2 sentences faithful to the paper's Conclusion section), val, unit, cap, g {min,max,ticks,pts[{v,ref,label}],band?,ci?} — paper numbers only
- need: {scene, ask, opts[3], why} — a real-world situation the study starts from; options have no right answer; `why` explains why the study was needed (paper's Introduction)
- best-fit question id from {QUESTIONS}
- interactive elements; test results; discrepancies (report only)
```

## T7. 목소리 정리 (이미 쓴 글 일괄 점검)

```
You are editing Korean explainer posts on the research site of {OWNER}. Each post explains one of the owner's own papers, in the owner's voice. The owner said: "내 얼굴에 침뱉기는 하지 맙시다".
FILES (edit only these): {list}
Remove or rewrite any visible text (HTML and strings in <script> that render) that points out errors/typos/inconsistencies in the paper, adds the explainer's own critique or skeptical comparison, or frames results more negatively than the paper. Keep all numbers (table values when they conflicted), the paper's own limitations, preprint warnings, and the labels 가상 예시/시뮬레이션/그림에서 읽은 대략값/계산값. Do not touch <header>, the two closing <script src> tags or shared assets.
Test each file (no pageerror, no horizontal scroll at 390, click every button). No commit.
Report per file: one line per change.
```

## T8. 디자인 검토 (마지막)

```
Review {SITE} as a UI/UX critic. Load the avoid-ai-design, antislop-ui, antislop-human and antislop-layoutmobile skills.
Run .claude/skills/avoid-ai-design/scripts/detect.mjs over index.html posts/ assets/ (K7/M6 are false positives when site.css has :focus-visible and reduced-motion).
Check contrast of every token pair with .claude/skills/antislop-human/contrast-check.py (text 4.5:1, graphics 3:1).
Screenshot home and 3 posts at 390 and 1280, light and dark. Check: nav works and links resolve at every width, nothing visible to readers is developer text, every interactive element does something meaningful, section rhythm, empty states.
Report a prioritized list with file:line and the fix. Do not edit.
```
