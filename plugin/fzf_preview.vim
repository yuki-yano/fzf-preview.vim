"=============================================================================
" File: plugin/fzf-preview.vim
" Author: yuki-ycino
" Created: 2018-01-25
"=============================================================================

scriptencoding utf-8

if exists('s:loaded')
  finish
endif
let s:loaded = 1

if !exists('g:fzf_preview_quit_map')
  let g:fzf_preview_quit_map = 1
endif

if !exists('g:fzf_preview_layout')
  let g:fzf_preview_layout = 'top split new'
endif

if !exists('g:fzf_preview_rate')
  let g:fzf_preview_rate = 0.3
endif

if !exists('g:fzf_full_preview_toggle_key')
  let g:fzf_full_preview_toggle_key = '<C-s>'
endif

if !exists('g:fzf_preview_command')
  if executable('ccat')
    let g:fzf_preview_command = 'ccat --color=always {}'
  else
    let g:fzf_preview_command = 'head -100 {}'
  endif
endif

if !exists('g:fzf_binary_preview_command')
  let g:fzf_binary_preview_command = 'echo "{} is a binary file"'
endif

if !exists('g:fzf_preview_filelist_command')
  if executable('rg')
    let g:fzf_preview_filelist_command = 'rg --files --hidden --follow --glob "!.git/*"'
  else
    let g:fzf_preview_filelist_command = 'git ls-files --exclude-standard'
  endif
endif

if !exists('g:fzf_preview_gitfiles_command')
    let g:fzf_preview_gitfiles_command = 'git -c color.status=always status --short --untracked-files=all'
endif

if !exists('g:fzf_preview_grep_cmd')
  let g:fzf_preview_grep_cmd = 'rg --line-number --no-heading'
endif

if !exists('g:fzf_preview_grep_preview_cmd')
  let g:fzf_preview_grep_preview_cmd = expand('<sfile>:h:h') . '/bin/preview.rb'
endif

let s:save_cpo = &cpoptions
set cpoptions&vim

command! ProjectFilesPreview         :call fzf_preview#fzf_files()
command! GitFilesPreview             :call fzf_preview#fzf_git_files()
command! BuffersPreview              :call fzf_preview#fzf_buffers()
command! OldFilesPreview             :call fzf_preview#fzf_oldfiles()
command! MruFilesPreview             :call fzf_preview#fzf_mrufiles()
command! ProjectOldFilesPreview      :call fzf_preview#fzf_project_oldfiles()
command! ProjectMruFilesPreview      :call fzf_preview#fzf_project_mrufiles()
command! -nargs=? ProjectGrepPreview :call fzf_preview#fzf_project_grep(<f-args>)

augroup fzf_preview_buffers
  autocmd!
  if g:fzf_preview_quit_map
    autocmd FileType fzf nnoremap <silent> <buffer> <C-g> i<C-g>
    autocmd FileType fzf vnoremap <silent> <buffer> <C-g> <Esc>i<C-g>
  endif
augroup END

let &cpoptions = s:save_cpo
unlet s:save_cpo

" vim:set expandtab shiftwidth=2 softtabstop=2 tabstop=2 foldenable foldmethod=marker:
