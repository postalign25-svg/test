#!/usr/bin/env bash
# PDF 폴더를 훑어 인벤토리 표(TSV)를 만든다. 첫 쪽만 읽으므로 빠르다.
# 사용: bash pdf_triage.sh <PDF 폴더> [소유자 성 이름 예: "Jeong I|Inyong Jeong"] > work/inventory.tsv
# 열: sha1, 중복표시, 파일, 쪽수, DOI, 연도후보, 프리프린트, 소유자이름위치(첫쪽), 제목후보(첫쪽 앞 6줄)
set -euo pipefail
DIR="${1:?PDF folder}"; OWNER="${2:-}"
printf "sha1\tdup\tfile\tpages\tdoi\tyear\tpreprint\towner_hit\ttitle_guess\n"
declare -A SEEN
while read -r f; do
  h=$(sha1sum "$f" | cut -c1-12)
  dup=""; [[ -n "${SEEN[$h]:-}" ]] && dup="dup-of:${SEEN[$h]}"; SEEN[$h]="$(basename "$f")"
  pages=$(pdfinfo "$f" 2>/dev/null | awk '/^Pages:/{print $2}')
  first=$(pdftotext -l 1 "$f" - 2>/dev/null | tr '\t' ' ')
  doi=$(printf "%s" "$first" | grep -oiE '10\.[0-9]{4,9}/[^[:space:]"<>]+' | head -1 || true)
  year=$(printf "%s" "$first" | grep -oE '(19|20)[0-9]{2}' | sort | uniq -c | sort -rn | head -1 | awk '{print $2}' || true)
  pre=$(printf "%s" "$first" | grep -qiE 'medRxiv|bioRxiv|arXiv|preprint|not (been )?certified by peer review' && echo yes || echo no)
  hit=""; [[ -n "$OWNER" ]] && hit=$(printf "%s" "$first" | grep -oE "$OWNER" | head -1 || true)
  title=$(printf "%s" "$first" | grep -v '^\s*$' | head -6 | tr '\n' ' ' | cut -c1-200)
  printf "%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n" "$h" "$dup" "$f" "$pages" "$doi" "$year" "$pre" "$hit" "$title"
done < <(find "$DIR" -type f -iname '*.pdf' | sort)
