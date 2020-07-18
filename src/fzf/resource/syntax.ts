export const grepFormatBaseSyntax: Array<string> = [
  String.raw`syntax match FzfPreviewGrepHeader /^>\?\s*\(\S\s\s\)\?\S\+\(\(:\d\+:\)\|\(\.\.\s\)\)/`,
  String.raw`syntax match FzfPreviewGrepFile /\s*\(\S\s\s\)\?\S\+\(\(:\d\+:\)\|\(\.\.\s\)\)/ contained containedin=FzfPreviewGrepHeader`,
  String.raw`syntax match FzfPreviewCursorAndDevIcons /\s*\(\S\s\s\)\?/ contained containedin=FzfPreviewGrepFile`,
  String.raw`syntax match FzfPreviewGrepLnum /:\d\+:/ contained containedin=FzfPreviewGrepFile`,
  String.raw`syntax match FzfPreviewGrepLnumDelimiter /:/ contained containedin=FzfPreviewGrepLnum`,
  "highlight default link FzfPreviewGrepFile String",
  "highlight default link FzfPreviewGrepLnum Type",
  "highlight default link FzfPreviewGrepLnumDelimiter Constant",
  "highlight default link FzfPreviewCursorAndDevIcons Constant",
]
