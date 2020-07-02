scriptencoding utf-8

if exists('s:loaded')
  finish
endif
let s:loaded = 1

if !exists('g:fzf_preview_floating_window_rate')
  let g:fzf_preview_floating_window_rate = 0.9
endif

if !exists('g:fzf_preview_quit_map')
  let g:fzf_preview_quit_map = 1
endif

if !exists('g:fzf_preview_command')
  if executable('bat')
    let g:fzf_preview_command = 'bat --color=always --style=grid {-1}'
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
  let g:fzf_preview_grep_cmd = 'rg --line-number --no-heading --color=always'
endif

if !exists('g:fzf_preview_lines_command')
  if executable('bat')
    let g:fzf_preview_lines_command = 'bat --color=always --plain --number --theme=ansi-dark'
  else
    let g:fzf_preview_lines_command = 'cat'
  endif
endif

if !exists('g:fzf_preview_grep_preview_cmd')
  let g:fzf_preview_grep_preview_cmd = expand('<sfile>:h:h') . '/bin/preview_fzf_grep'
endif

if !exists('g:fzf_preview_cache_directory')
  let g:fzf_preview_cache_directory = expand('~/.cache/vim/fzf_preview')
endif

if !exists('g:fzf_preview_fzf_color_option')
  let g:fzf_preview_fzf_color_option = ''
endif

if !exists('g:fzf_preview_custom_open_file_processes')
  let g:fzf_preview_custom_open_file_processes = 0
endif

if !exists('g:fzf_preview_fzf_preview_window_option')
  let g:fzf_preview_fzf_preview_window_option = ''
endif

if !exists('g:fzf_preview_buffers_jump')
  let g:fzf_preview_buffers_jump = 0
endif

if !exists('g:fzf_preview_filelist_postprocess_command')
  let g:fzf_preview_filelist_postprocess_command = ''
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

let s:save_cpo = &cpoptions
set cpoptions&vim

augroup fzf_preview_buffers
  autocmd!
  if g:fzf_preview_quit_map
    autocmd FileType fzf tnoremap <silent> <buffer> <Esc> <C-g>
    autocmd FileType fzf nnoremap <silent> <buffer> <C-g> i<C-g>
    autocmd FileType fzf vnoremap <silent> <buffer> <C-g> <Esc>i<C-g>
  endif
augroup END

augroup fzf_preview_initialized
  autocmd!
  autocmd VimEnter * silent doautocmd User fzf_preview#initialized
  autocmd FileType fzf call fzf_preview#remote#window#set_fzf_last_query()
augroup END

let &cpoptions = s:save_cpo
unlet s:save_cpo

" vim:set expandtab shiftwidth=2 softtabstop=2 tabstop=2 foldenable foldmethod=marker:
