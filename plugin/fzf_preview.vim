scriptencoding utf-8

if exists('s:loaded')
  finish
endif
let s:loaded = 1

if !exists('g:fzf_preview_floating_window_rate')
  let g:fzf_preview_floating_window_rate = 0.9
endif

if !exists('g:fzf_preview_default_fzf_options')
  let g:fzf_preview_default_fzf_options = {
  \ '--reverse': v:true,
  \ '--preview-window': 'wrap',
  \ }
endif

if !exists('g:fzf_preview_quit_map')
  let g:fzf_preview_quit_map = 1
endif

if !exists('g:fzf_preview_command')
  if executable('bat')
    let g:fzf_preview_command = 'bat --color=always --plain {-1}'
  else
    let g:fzf_preview_command = 'head -100 {-1}'
  endif
endif

if !exists('g:fzf_preview_if_binary_command')
  let g:fzf_preview_if_binary_command = '[[ "$(file --mime {})" =~ binary ]]'
endif

if !exists('g:fzf_binary_preview_command')
  let g:fzf_binary_preview_command = 'echo "{} is a binary file"'
endif

if !exists('g:fzf_preview_filelist_command')
  if executable('rg')
    let g:fzf_preview_filelist_command = "rg --files --hidden --no-messages --glob '!.git/*' --glob \!'* *'"
  else
    let g:fzf_preview_filelist_command = 'git ls-files --exclude-standard'
  endif
endif

if !exists('g:fzf_preview_git_files_command')
  let g:fzf_preview_git_files_command = 'git ls-files --exclude-standard'
endif

if !exists('g:fzf_preview_directory_files_command')
  let g:fzf_preview_directory_files_command = 'rg --files --hidden --no-messages -g \!"* *"'
endif

if !exists('g:fzf_preview_git_status_command')
  let g:fzf_preview_git_status_command = 'git -c color.status=always status --short --untracked-files=all'
endif

if !exists('g:fzf_preview_git_status_preview_command')
  let g:fzf_preview_git_status_preview_command =  '[[ $(git diff -- {-1}) != "" ]] && git diff --color=always -- {-1} || ' .
  \ '[[ $(git diff --cached -- {-1}) != "" ]] && git diff --cached --color=always -- {-1} || ' .
  \ g:fzf_preview_command
endif

if !exists('g:fzf_preview_grep_cmd')
  let g:fzf_preview_grep_cmd = 'rg --line-number --no-heading --color=never'
endif

if !exists('g:fzf_preview_lines_command')
  let g:fzf_preview_lines_command = 'bat --color=always --plain --number'
endif

if !exists('g:fzf_preview_grep_preview_cmd')
  let g:fzf_preview_grep_preview_cmd = expand('<sfile>:h:h') . '/bin/preview_fzf_grep'
endif

if !exists('g:fzf_preview_disable_mru')
  let g:fzf_preview_disable_mru = 0
endif

if !exists('g:fzf_preview_cache_directory')
  let g:fzf_preview_cache_directory = expand('~/.cache/vim/fzf_preview')
endif

if !exists('g:fzf_preview_fzf_color_option')
  let g:fzf_preview_fzf_color_option = ''
endif

if !exists('g:fzf_preview_custom_processes')
  let g:fzf_preview_custom_processes = {}
endif

if !exists('g:fzf_preview_fzf_preview_window_option')
  let g:fzf_preview_fzf_preview_window_option = ''
endif

if !exists('g:fzf_preview_buffers_jump')
  let g:fzf_preview_buffers_jump = 0
endif

if !exists('g:fzf_preview_use_dev_icons')
  let g:fzf_preview_use_dev_icons = 0
endif

if !exists('g:fzf_preview_dev_icon_prefix_string_length')
  let g:fzf_preview_dev_icon_prefix_string_length = 3
endif

if !exists('g:fzf_preview_dev_icons_limit')
  let g:fzf_preview_dev_icons_limit = 5000
endif

if !exists('g:fzf_preview_yankround_preview_command')
  let g:fzf_preview_yankround_preview_command = expand('<sfile>:h:h') . '/bin/preview_yankround_register'
endif

if !exists('g:fzf_preview_blame_pr_command')
  let g:fzf_preview_blame_pr_command = expand('<sfile>:h:h') . '/bin/git_blame_pr'
endif

let g:fzf_preview_script_dir = expand('<sfile>:h:h') . '/bin'

let s:save_cpo = &cpoptions
set cpoptions&vim

command! FzfPreviewInstall :call fzf_preview#install()

augroup fzf_preview_buffers
  autocmd!
  if g:fzf_preview_quit_map
    autocmd FileType fzf tnoremap <silent> <buffer> <Esc> <C-g>
    autocmd FileType fzf nnoremap <silent> <buffer> <C-g> i<C-g>
    autocmd FileType fzf vnoremap <silent> <buffer> <C-g> <Esc>i<C-g>
  endif
augroup END

augroup fzf_preview_mr
  autocmd!

  if g:fzf_preview_disable_mru == 0
    autocmd BufEnter,VimEnter,BufWinEnter,BufWritePost * call s:mru_append(expand('<amatch>'))
    autocmd BufWritePost * call s:mrw_append(expand('<amatch>'))
  endif
augroup END

function! s:mru_append(path) abort
  if s:enable_file(a:path)
    call fzf_preview#remote#mr#append(a:path, fzf_preview#remote#mr#mru_file_path())
  endif
endfunction

function! s:mrw_append(path) abort
  if s:enable_file(a:path)
    call fzf_preview#remote#mr#append(a:path, fzf_preview#remote#mr#mrw_file_path())
  endif
endfunction

function! s:enable_file(path) abort
  if bufnr('%') != expand('<abuf>') || a:path == ''
    return v:false
  else
    return v:true
  endif
endfunction

augroup fzf_preview_initialized
  autocmd!
  autocmd VimEnter * call s:doautocmd_from_remote_plugin()
  autocmd FileType fzf call fzf_preview#remote#window#set_fzf_last_query()
augroup END

function! s:doautocmd_from_remote_plugin() abort
  if exists(':FzfPreviewRemoteEnvironment')
    call timer_start(0, 'FzfPreviewInitializeRemotePlugin')
  endif

  if exists(':FzfPreviewRemoteEnvironment')
    silent doautocmd User fzf_preview#initialized
  endif
endfunction

let &cpoptions = s:save_cpo
unlet s:save_cpo

" vim:set expandtab shiftwidth=2 softtabstop=2 tabstop=2 foldenable foldmethod=marker:
