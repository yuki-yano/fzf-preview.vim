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

if !exists('g:fzf_preview_use_floating_window')
  let g:fzf_preview_use_floating_window = has('nvim') ? 1 : 0
endif

if !exists('g:fzf_preview_quit_map')
  let g:fzf_preview_quit_map = 1
endif

if !exists('g:fzf_preview_command')
  if executable('bat')
    let g:fzf_preview_command = 'bat --color=always --style=grid {-1}'
  elseif executable('ccat')
    let g:fzf_preview_command = 'ccat --color=always {-1}'
  else
    let g:fzf_preview_command = 'head -100 {-1}'
  endif
endif

if !exists('g:fzf_binary_preview_command')
  let g:fzf_binary_preview_command = 'echo "{} is a binary file"'
endif

if !exists('g:fzf_preview_filelist_command')
  if executable('rg')
    let g:fzf_preview_filelist_command = 'rg --files --hidden --follow --no-messages -g \!"* *"'
  else
    let g:fzf_preview_filelist_command = 'git ls-files --exclude-standard'
  endif
endif

if !exists('g:fzf_preview_git_files_command')
  let g:fzf_preview_git_files_command = 'git ls-files --exclude-standard'
endif

if !exists('g:fzf_preview_directory_files_command')
  let g:fzf_preview_directory_files_command = 'rg --files --hidden --follow --no-messages -g \!"* *"'
endif

if !exists('g:fzf_preview_git_status_command')
  let g:fzf_preview_git_status_command = 'git -c color.status=always status --short --untracked-files=all'
endif

if !exists('g:fzf_preview_grep_cmd')
  let g:fzf_preview_grep_cmd = 'rg --line-number --no-heading'
endif

if !exists('g:fzf_preview_grep_preview_cmd')
  let g:fzf_preview_grep_preview_cmd = expand('<sfile>:h:h') . '/bin/preview_fzf_grep'
endif

if !exists('g:fzf_preview_preview_key_bindings')
  let g:fzf_preview_preview_key_bindings =
        \ 'ctrl-d:preview-page-down,ctrl-u:preview-page-up,?:toggle-preview'
endif

if !exists('g:fzf_preview_fzf_color_option')
  let g:fzf_preview_fzf_color_option = ''
endif

if !exists('g:fzf_preview_split_key_map')
  let g:fzf_preview_split_key_map = 'ctrl-x'
endif

if !exists('g:fzf_preview_vsplit_key_map')
  let g:fzf_preview_vsplit_key_map = 'ctrl-v'
endif

if !exists('g:fzf_preview_tabedit_key_map')
  let g:fzf_preview_tabedit_key_map = 'ctrl-t'
endif

if !exists('g:fzf_preview_build_quickfix_key_map')
  let g:fzf_preview_build_quickfix_key_map = 'ctrl-q'
endif

if !exists('g:fzf_preview_fzf_preview_window_option')
  let g:fzf_preview_fzf_preview_window_option = ''
endif

if !exists('g:fzf_preview_filelist_postprocess_command')
  let g:fzf_preview_filelist_postprocess_command = ''
endif

if !exists('g:fzf_preview_use_dev_icons')
  let g:fzf_preview_use_dev_icons = 0
endif

if !exists('g:fzf_preview_dev_icon_prefix_length')
  let g:fzf_preview_dev_icon_prefix_length = 5
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

let s:save_cpo = &cpoptions
set cpoptions&vim

command! FzfPreviewProjectFiles    :call fzf_preview#runner#fzf_run(fzf_preview#parameter#project_files())
command! FzfPreviewGitFiles        :call fzf_preview#runner#fzf_run(fzf_preview#parameter#git_files())
command! FzfPreviewDirectoryFiles  :call fzf_preview#runner#fzf_run(fzf_preview#parameter#directory_files())
command! FzfPreviewGitStatus       :call fzf_preview#runner#fzf_run(fzf_preview#parameter#git_status())
command! FzfPreviewBuffers         :call fzf_preview#runner#fzf_run(fzf_preview#parameter#buffers())
command! FzfPreviewProjectOldFiles :call fzf_preview#runner#fzf_run(fzf_preview#parameter#project_oldfiles())
command! FzfPreviewProjectMruFiles :call fzf_preview#runner#fzf_run(fzf_preview#parameter#project_mrufiles())
command! FzfPreviewBufferTags      :call fzf_preview#runner#fzf_run(fzf_preview#parameter#buffer_tags())
command! FzfPreviewOldFiles        :call fzf_preview#runner#fzf_run(fzf_preview#parameter#oldfiles())
command! FzfPreviewMruFiles        :call fzf_preview#runner#fzf_run(fzf_preview#parameter#mrufiles())
command! FzfPreviewQuickFix        :call fzf_preview#runner#fzf_run(fzf_preview#parameter#locationlist('quickfix'))
command! FzfPreviewLocationList    :call fzf_preview#runner#fzf_run(fzf_preview#parameter#locationlist('loclist'))
command! FzfPreviewBookmarks       :call fzf_preview#runner#fzf_run(fzf_preview#parameter#bookmarks())
command! FzfPreviewJumpToLine      :call fzf_preview#runner#fzf_run(fzf_preview#parameter#jumptoline())

command! -nargs=? FzfPreviewProjectGrep :call fzf_preview#runner#fzf_run(fzf_preview#parameter#project_grep(<f-args>))
command! -nargs=+ -complete=customlist,fzf_preview#files_resources FzfPreviewFromResources :call fzf_preview#runner#fzf_run(fzf_preview#parameter#files_from_resources(<f-args>))

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
