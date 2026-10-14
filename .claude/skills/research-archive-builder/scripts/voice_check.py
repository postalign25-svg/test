#!/usr/bin/env python3
"""저자 사이트의 해설 글에서 '내 얼굴에 침뱉기', 비공식 비교, 개발 문구, 디자인 금지 패턴을 찾는다.

사용: python3 voice_check.py posts/*.html
걸린 줄을 출력한다. 자동으로 고치지 않는다. 사람이 읽고 판단한다
(그래프 축의 방향 화살표, 정당하게 표시된 '계산값'은 괜찮다).
"""
import re
import sys

RULES = [
    ("논문 오류 지적", r"오타|오기|잘못\s*표기|표기와\s*다르|일치하지\s*않|맞지\s*않(는|아)|열\s*제목이\s*바뀐|본문은[^<]{0,40}(라고|이라고)\s*(썼|적었)|초록과\s*표|정확히\s*계산하면|설명되지\s*않았|보고되지\s*않았|적혀\s*있지\s*않"),
    ("해설자 비판", r"필자|글쓴이|제\s*읽기|읽기\s*메모|낙관적일\s*수|높지\s*않|인상적이지\s*않|그쳤|에\s*그칩|사실상\s*(같|쓸\s*수\s*없|못)|아슬아슬|검정(하지|되지)\s*않"),
    ("비공식 비교 기준", r"(?<!0\.5는 )동전\s*던지기(?!\s*(수준|,\s*1))|무작위로\s*(고르|찍)|가장\s*흔한\s*답|모두\s*['‘]?없음['’]?|다수\s*클래스|chance"),
    ("개발 문구", r"README|giscus|설정\s*방법은|저장소\s*README|TODO|lorem"),
    ("로컬 전용 상호작용", r"브라우저에만\s*저장|id=\"poll\"[^>]*>[^<]|여러분의\s*생각은"),
    ("이모지", "[\U0001F300-\U0001FAFF☀-☄☇-⛿✀-➿]"),
    ("링크/버튼 끝 화살표", r"→\s*</(a|button)>|<a\b[^>]*>\s*[→←]"),
    ("가운뎃점 메타", r"<p class=\"meta\">[^<]*·"),
]

def scan(path):
    hits = []
    text = open(path, encoding="utf-8").read()
    for i, line in enumerate(text.splitlines(), 1):
        if 'hidden aria-hidden="true"' in line:
            continue
        for name, pat in RULES:
            m = re.search(pat, line)
            if m:
                s = max(0, m.start() - 40)
                hits.append((i, name, line[s:m.end() + 40].strip()))
    return hits

def main(paths):
    total = 0
    for p in paths:
        hits = scan(p)
        if hits:
            print(f"== {p}")
            for i, name, snip in hits:
                print(f"  L{i:<5} [{name}] {snip}")
            total += len(hits)
    print(f"\n{total} hit(s) in {len(paths)} file(s)")
    return 1 if total else 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
