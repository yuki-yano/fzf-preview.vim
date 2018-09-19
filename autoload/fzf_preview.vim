"=============================================================================
" File: autoload/fzf-preview.vim
" Author: yuki-ycino
" Created: 2018-01-25
"=============================================================================

function! s:project_root() abort
  silent !git rev-parse --show-toplevel
  if v:shell_error
    echomsg 'The current directory is not a git project'
    return ''
  endif

  let l:get_git_root_cmd = system('git rev-parse --show-toplevel')
  return strpart(l:get_git_root_cmd, 0, strlen(l:get_git_root_cmd) - 1)
endfunction

function! s:project_files() abort
  silent !git rev-parse --show-toplevel
  if v:shell_error
    echomsg 'The current directory is not a git project'
    return []
  endif

  let l:list = systemlist(g:fzf_preview_filelist_command)

  return map(l:list, "fnamemodify(v:val, ':.')")
endfunction

function! s:git_files() abort
  silent !git rev-parse --show-toplevel
  if v:shell_error
    echomsg 'The current directory is not a git project'
    return []
  endif

  let l:list = systemlist(g:fzf_preview_gitfiles_command)
  return l:list
endfunction

function! s:buffer_list() abort
  let l:list = filter(range(1, bufnr('$')),
  \ "bufexists(v:val) && buflisted(v:val) && filereadable(expand('#' . v:val . ':p'))"
  \ )
  return map(l:list, 'bufname(v:val)')
endfunction

function! s:oldfile_list() abort
  let l:copyfiles = deepcopy(v:oldfiles, 1)
  let l:files = filter(l:copyfiles, 'filereadable(v:val)')

  return map(l:files, "fnamemodify(v:val, ':~')")
endfunction

function! s:mrufile_list() abort
  let l:files = readfile(g:neomru#file_mru_path)
  call remove(l:files, 0)
  let l:files = filter(l:files, 'filereadable(v:val)')

  return map(l:files, "fnamemodify(v:val, ':.')")
endfunction

function! s:is_project_file(file, project_path) abort
  let l:file_path_list = split(a:file, '/')

  let l:is_target = 1
  let l:project_path_elm = ''

  for l:project_path_elm in a:project_path
    if match(l:file_path_list, l:project_path_elm) == -1
      let l:is_target = 0
    endif
  endfor

  return l:is_target
endfunction

function! s:project_oldfile_list() abort
  let l:target_files = []
  let l:readable_filelist = filter(v:oldfiles, 'filereadable(v:val)')
  let l:project_path_list = split(s:project_root(), '/')

  let l:readable_file = ''
  for l:readable_file in l:readable_filelist
    if s:is_project_file(l:readable_file, l:project_path_list)
      let l:target_files = add(l:target_files, l:readable_file)
    endif
  endfor
  return map(l:target_files, "fnamemodify(v:val, ':.')")
endfunction

function! s:project_mrufile_list() abort
  let l:files = readfile(g:neomru#file_mru_path)
  call remove(l:files, 0)
  let l:target_files = []
  let l:readable_filelist = filter(l:files, 'filereadable(v:val)')
  let l:project_path_list = split(s:project_root(), '/')

  let l:readable_file = ''
  for l:readable_file in l:readable_filelist
    if s:is_project_file(l:readable_file, l:project_path_list)
      let l:target_files = add(l:target_files, l:readable_file)
    endif
  endfor
  return map(l:target_files, "fnamemodify(v:val, ':.')")
endfunction

function! s:map_fzf_keys() abort
  execute 'resize' float2nr(g:fzf_preview_rate * &lines)

  execute 'tnoremap <silent> <buffer> ' . g:fzf_full_preview_toggle_key . ' <C-\><C-n>:<C-u>call <SID>fzf_toggle_full_buffer()<CR>'
endfunction

function! s:fzf_toggle_full_buffer() abort
  let l:defaultsize = float2nr(g:fzf_preview_rate * &lines)
  if l:defaultsize == winheight('%')
    tab split
  else
    tabclose
    resize 1
    execute 'resize' float2nr(g:fzf_preview_rate * &lines)
  endif
  call feedkeys("\<C-t>\<C-t>")
  normal! i
endfunction

function! s:fzf_command_common_option(console) abort
  return '--reverse --ansi --prompt="' . a:console . '>" --bind ctrl-d:preview-page-down,ctrl-u:preview-page-up,ctrl-t:toggle-preview,?:toggle-preview --preview '
endfunction

let s:files_prompt     = 'ProjectFiles'
let s:files_buffer     = 'Buffers'
let s:project_oldfiles = 'ProjectOldFiles'
let s:project_mrufiles = 'ProjectMruFiles'
let s:oldfiles         = 'OldFiles'
let s:mrufiles         = 'MruFiles'
let s:project_grep     = 'ProjectGrep'
let s:git_files_prompt = 'GitFiles'

function! fzf_preview#fzf_files() abort
  if s:project_root() ==# ''
    return
  endif

  call fzf#run({
  \ 'source':  s:project_files(),
  \ 'options': '--multi ' . s:fzf_command_common_option(s:files_prompt) . '''[[ "$(file --mime {})" =~ binary ]] && ' . g:fzf_binary_preview_command . ' || ' . g:fzf_preview_command . '''',
  \ 'sink':    'e',
  \ 'window':  g:fzf_preview_layout,
  \ })
  call s:map_fzf_keys()
endfunction

function! fzf_preview#fzf_git_files() abort
  if s:project_root() ==# ''
    return
  endif

  function! s:gitfile_open(line) abort
    let l:file = a:line[3:]
    execute 'edit' l:file
  endfunction

  call fzf#run({
  \ 'source':  s:git_files(),
  \ 'options': '--multi --nth 2..,.. ' . s:fzf_command_common_option(s:git_files_prompt) . '--tiebreak=index --preview "git diff --color=always -- {-1}"',
  \ 'sink':    function('<SID>gitfile_open'),
  \ 'window':  g:fzf_preview_layout,
  \ })
  call s:map_fzf_keys()
endfunction

function! fzf_preview#fzf_buffers() abort
  call fzf#run({
  \ 'source':  s:buffer_list(),
  \ 'options': s:fzf_command_common_option(s:files_buffer) . '''[[ "$(file --mime {})" =~ binary ]] && ' . g:fzf_binary_preview_command . ' || ' . g:fzf_preview_command . '''',
  \ 'sink':    'e',
  \ 'window':  g:fzf_preview_layout,
  \ })
  call s:map_fzf_keys()
endfunction

function! fzf_preview#fzf_oldfiles() abort
  call fzf#run({
  \ 'source':  s:oldfile_list(),
  \ 'options': '--multi ' . s:fzf_command_common_option(s:oldfiles) . '''[[ "$(file --mime {})" =~ binary ]] && ' . g:fzf_binary_preview_command . ' || ' . g:fzf_preview_command . '''',
  \ 'sink':    'e',
  \ 'window':  g:fzf_preview_layout,
  \ })
  call s:map_fzf_keys()
endfunction

function! fzf_preview#fzf_mrufiles() abort
  call fzf#run({
  \ 'source':  s:mrufile_list(),
  \ 'options': '--multi ' . s:fzf_command_common_option(s:mrufiles) . '''[[ "$(file --mime {})" =~ binary ]] && ' . g:fzf_binary_preview_command . ' || ' . g:fzf_preview_command . '''',
  \ 'sink':    'e',
  \ 'window':  g:fzf_preview_layout,
  \ })
  call s:map_fzf_keys()
endfunction

function! fzf_preview#fzf_project_oldfiles() abort
  if s:project_root() ==# ''
    return
  endif

  call fzf#run({
  \ 'source':  s:project_oldfile_list(),
  \ 'options': '--multi ' . s:fzf_command_common_option(s:project_oldfiles) . '''[[ "$(file --mime {})" =~ binary ]] && ' . g:fzf_binary_preview_command . ' || ' . g:fzf_preview_command . '''',
  \ 'sink':    'e',
  \ 'window':  g:fzf_preview_layout,
  \ })
  call s:map_fzf_keys()
endfunction

function! fzf_preview#fzf_project_mrufiles() abort
  if s:project_root() ==# ''
    return
  endif

  call fzf#run({
  \ 'source':  s:project_mrufile_list(),
  \ 'options': '--multi ' . s:fzf_command_common_option(s:project_mrufiles) . '''[[ "$(file --mime {})" =~ binary ]] && ' . g:fzf_binary_preview_command . ' || ' . g:fzf_preview_command . '''',
  \ 'sink':    'e',
  \ 'window':  g:fzf_preview_layout,
  \ })
  call s:map_fzf_keys()
endfunction

function! fzf_preview#fzf_project_grep(...) abort
  if s:project_root() ==# ''
    return
  endif

  if a:0 >= 1
    let l:grep_command = g:fzf_preview_grep_cmd . ' ' . a:1
  else
    let l:grep_command = g:fzf_preview_grep_cmd . ' .'
  end

  call fzf#run({
  \ 'source':  l:grep_command,
  \ 'options': '--delimiter : --nth 3.. --multi ' . s:fzf_command_common_option(s:project_grep) . "'" . g:fzf_preview_grep_preview_cmd . " {}'",
  \ 'sink':    'e',
  \ 'window':  g:fzf_preview_layout,
  \ })
  call s:map_fzf_keys()
endfunction

" vim:set expandtab shiftwidth=2 softtabstop=2 tabstop=2 foldenable foldmethod=marker:
