function! fzf_preview#remote#resource#tags#ctags() abort
  return s:read_tag_file()
endfunction

function! s:read_tag_file() abort
  let lines = []
  let files = filter(s:get_tag_files(), { _, file -> filereadable(file) })
  for file in files
    let lines = lines + filter(readfile(file), { _, line -> match(line, '^!') == -1 })
  endfor

  call map(lines, { _, line -> s:parse_tagline(line) })
  return lines
endfunction

function! s:get_tag_files() abort
  return split(&tags, ',')
endfunction

function! s:parse_tagline(line) abort
  let elem = split(a:line, '\t')
  let file_path = fnamemodify(elem[1], ':.')

  let match = matchlist(elem[2], '^\(\d\+\);"')

  try
    let info = {
    \ 'name': elem[0],
    \ 'file': file_path,
    \ 'line': match[1],
    \ 'type': elem[3],
    \ }
  catch
    throw 'Set excmd=number or excmd=combine in universal-ctags options'
  endtry

  return info
endfunction
