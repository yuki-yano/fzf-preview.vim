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
