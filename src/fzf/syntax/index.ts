export const fileListFormatBaseSyntax: Array<string> = [
  String.raw`syntax match FzfPreviewFileHeader /^\(>\|\s\)\(>\|\s\)\(\S\s\s\)\?\S\+\(\.\.\s\)\?/`,
  String.raw`syntax match FzfPreviewCount /^\s\s\d\+\/\d\+/ contained containedin=FzfPreviewFileHeader`,
  String.raw`syntax match FzfPreviewFilePath /\(\S\s\s\)\?[^>\[\] ]\+\(\.\.\s\)\?/ contained containedin=FzfPreviewFileHeader`,
  String.raw`syntax match FzfPreviewDirectory /\([a-zA-Z0-9-_.]\+\/\)\+\(\.\.\s\)\?/ contained containedin=FzfPreviewFilePath`,
  String.raw`syntax match FzfPreviewFzfHeader /\[.\+\]\s.\+/ contained containedin=FzfPreviewFileHeader`,
  String.raw`syntax match FzfPreviewDevIcons /[^a-zA-Z1-9]\s\s/ contained containedin=FzfPreviewFilePath`,
  "highlight default link FzfPreviewDirectory Directory",
  "highlight default link FzfPreviewDevIcons Statement",
]

export const grepFormatBaseSyntax: Array<string> = [
  String.raw`syntax match FzfPreviewGrepHeader /^\(>\|\s\)\(>\|\s\)\(\S\s\s\)\?\S\+\(\(:\d\+:\)\|\(\.\.\s\)\)/`,
  String.raw`syntax match FzfPreviewGrepFilePathAndLnum /\(\S\s\s\)\?[^>]\+\(\(:\d\+:\)\|\(\.\.\s\)\)/ contained containedin=FzfPreviewGrepHeader`,
  String.raw`syntax match FzfPreviewGrepDirectory /\([a-zA-Z0-9-_.]\+\/\)\+\(\.\.\s\)\?/ contained containedin=FzfPreviewGrepFilePathAndLnum`,
  String.raw`syntax match FzfPreviewGrepFzfHeader /\[.\+\]\s.\+/ contained containedin=FzfPreviewFileHeader`,
  String.raw`syntax match FzfPreviewDevIcons /[^a-zA-Z1-9]\s\s/ contained containedin=FzfPreviewGrepFilePathAndLnum`,
  String.raw`syntax match FzfPreviewGrepLnum /:\d\+:/ contained containedin=FzfPreviewGrepFilePathAndLnum`,
  String.raw`syntax match FzfPreviewGrepLnumDelimiter /:/ contained containedin=FzfPreviewGrepLnum`,
  "highlight default link FzfPreviewGrepDirectory Directory",
  "highlight default link FzfPreviewGrepLnum String",
  "highlight default link FzfPreviewGrepLnumDelimiter Constant",
  "highlight default link FzfPreviewDevIcons Statement",
]

export const buffersFormatSyntax: Array<string> = [
  String.raw`syntax match FzfPreviewBufferHeader /^\(>\|\s\)\(>\|\s\)\(\[\d\+\]\)\([ #+\[\]]\)\+\(\.\.\s\)\?/`,
  String.raw`syntax match FzfPreviewCount /^\s\s\d\+\/\d\+/ contained containedin=FzfPreviewBufferHeader`,
  String.raw`syntax match FzfPreviewBufferNumber /\[\d\+\]/ contained containedin=FzfPreviewBufferHeader`,
  String.raw`syntax match FzfPreviewCurrentNumber /\[\d\+\]\s\+%/ contained containedin=FzfPreviewBufferHeader`,
  String.raw`syntax match FzfPreviewBufferFilePath /\s\s[^#+\[\] ]\+\(\.\.\s\)\?/ contained containedin=FzfPreviewBufferHeader`,
  String.raw`syntax match FzfPreviewBufferDirectory /\([a-zA-Z0-9-_.]\+\/\)\+\(\.\.\s\)\?/ contained containedin=FzfPreviewBufferFilePath`,
  String.raw`syntax match FzfPreviewBufferModified /\[+\]/ contained containedin=FzfPreviewBufferHeader`,
  "highlight default link FzfPreviewBufferNumber Statement",
  "highlight default link FzfPreviewBufferDirectory Directory",
  "highlight default link FzfPreviewBufferModified SpecialChar",
]

export const gitStatusFormatSyntax: Array<string> = [
  String.raw`syntax match FzfPreviewGitStatusHeader /^\(>\|\s\)\(>\|\s\)[ A-Z?][ A-Z?]\s\S\+\(\.\.\s\)\?/`,
  String.raw`syntax match FzfPreviewGitStatusLine /\s[ A-Z?][ A-Z?]\s\S\+\(\.\.\s\)\?/ contained containedin=FzfPreviewGitStatusHeader`,
  String.raw`syntax match FzfPreviewGitStatusFilePath /\s\([a-zA-Z0-9-_./]\)\+\(\.\.\s\)\?/ contained containedin=FzfPreviewGitStatusLine`,
  String.raw`syntax match FzfPreviewGitStatusDirectory /\s\([a-zA-Z0-9-_.]\+\/\)\+\(\.\.\s\)\?/ contained containedin=FzfPreviewGitStatusFilePath`,
  "highlight default link FzfPreviewGitStatusDirectory Directory",
]
