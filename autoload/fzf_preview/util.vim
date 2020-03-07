function! fzf_preview#util#project_root() abort
  silent !git rev-parse --show-toplevel
  if v:shell_error
    echomsg 'The current directory is not a git project'
    return ''
  endif

  let git_root = system('git rev-parse --show-toplevel')
  return strpart(git_root, 0, strlen(git_root) - 1)
endfunction

function! fzf_preview#util#is_git_directory() abort
  silent !git rev-parse --show-toplevel
  if v:shell_error
    echomsg 'The current directory is not a git project'
    return 0
  else
    return 1
  endif
endfunction

function! fzf_preview#util#is_project_file(file, splited_project_path) abort
  let splited_file_path = split(a:file, '/')

  let is_project_file = 1
  let index = 0
  for dir_name in a:splited_project_path[:len(splited_file_path) - 1]
    if dir_name !=# splited_file_path[index]
      let is_project_file = 0
    endif
    let index = index + 1
  endfor

  return is_project_file
endfunction

function! fzf_preview#util#align_lists(lists) abort
  let maxes = {}
  for list in a:lists
    let i = 0
    while i < len(list)
      let maxes[i] = max([get(maxes, i, 0), len(list[i])])
      let i += 1
    endwhile
  endfor
  for list in a:lists
    call map(list, { key, v -> printf('%-' . maxes[key] . 's', v) })
  endfor
  return a:lists
endfunction

function! fzf_preview#util#uniq(list) abort
  let result = []
  for item in a:list
    if index(result, item) == -1
      call add(result, item)
    endif
  endfor
  return result
endfunction

function! fzf_preview#util#read_tag_file() abort
  let lines = []
  let files = filter(s:get_tag_files(), { _, file -> filereadable(file) })
  for file in files
    let lines = lines + filter(readfile(file), { _, line -> match(line, '^!') == -1 })
  endfor

  call map(lines, { _, line -> s:parse_tagline(line) })
  return lines
endfunction

function! s:get_tag_files() abort
  return split(&tag, ',')
endfunction

function! s:parse_tagline(line) abort
  let elem = split(a:line, '\t')
  let file_path = fnamemodify(elem[1], ':.')

  let match = matchlist(elem[2], '^\(\d\+\);"')

  let info = {
  \ 'name': elem[0],
  \ 'file': file_path,
  \ 'line': match[1],
  \ 'type': elem[3],
  \ }

  return info
endfunction
