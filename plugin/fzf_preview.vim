scriptencoding utf-8

if exists('s:loaded')
  finish
endif
let s:loaded = 1

if !exists('$FZF_PREVIEW_PREVIEW_BAT_THEME')
  let $FZF_PREVIEW_PREVIEW_BAT_THEME = 'OneHalfDark'
endif

let s:bat_theme_option = '--theme=' . $FZF_PREVIEW_PREVIEW_BAT_THEME

if !exists('g:fzf_preview_floating_window_rate')
  let g:fzf_preview_floating_window_rate = 0.9
endif

if !exists('g:fzf_preview_direct_window_option')
  let g:fzf_preview_direct_window_option = ''
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
    let g:fzf_preview_command = 'bat ' . s:bat_theme_option . ' --color=always --plain --number {-1}'
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
  let g:fzf_preview_git_status_preview_command =  '[[ $(git diff --cached -- {-1}) != "" ]] && git diff --cached --color=always -- {-1} || ' .
  \ '[[ $(git diff -- {-1}) != "" ]] && git diff --color=always -- {-1} || ' .
  \ g:fzf_preview_command
endif

if !exists('g:fzf_preview_grep_cmd')
  let g:fzf_preview_grep_cmd = 'rg --line-number --no-heading --color=never --hidden'
endif

if !exists('g:fzf_preview_lines_command')
  if executable('bat')
    let g:fzf_preview_lines_command = 'bat ' . s:bat_theme_option . ' --color=always --plain --number'
  else
    let g:fzf_preview_lines_command = 'cat -n'
  endif
endif

if !exists('g:fzf_preview_grep_preview_cmd')
  let g:fzf_preview_grep_preview_cmd = expand('<sfile>:h:h') . '/bin/preview_fzf_grep'
endif

if !exists('g:fzf_preview_disable_mru')
  let g:fzf_preview_disable_mru = 0
endif

if !exists('g:fzf_preview_mru_limit')
  let g:fzf_preview_mru_limit = 1000
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

if !exists('g:fzf_preview_preview_key_bindings')
  let g:fzf_preview_preview_key_bindings = ''
endif

if !exists('g:fzf_preview_history_dir')
  let g:fzf_preview_history_dir = v:false
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

if !exists('g:fzf_preview_update_statusline')
  let g:fzf_preview_update_statusline = v:true
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
  autocmd VimEnter *       call s:doautocmd_from_remote()
  autocmd User CocNvimInit call s:doautocmd_from_coc()
  autocmd VimEnter *       call s:doautocmd_from_rpc()

  autocmd FileType fzf call fzf_preview#remote#window#set_fzf_last_query()

  autocmd FileType fzf call fzf_preview#remote#window#set_status_line(v:false)
augroup END

function! s:doautocmd_from_remote() abort
  if exists(':FzfPreviewRemoteEnvironment')
    let g:fzf_preview_has_remote = v:true
    silent doautocmd User fzf_preview#initialized
    silent doautocmd User fzf_preview#remote#initialized
  endif
endfunction

function! s:doautocmd_from_coc() abort
  silent doautocmd User fzf_preview#initialized
  silent doautocmd User fzf_preview#coc#initialized
endfunction

function! s:doautocmd_from_rpc() abort
  call fzf_preview#rpc#initialize()
endfunction

command! -nargs=? FzfPreviewProjectFilesRpc call fzf_preview#rpc#command('FzfPreviewProjectFiles', <f-args>)
command! -nargs=? FzfPreviewGitFilesRpc call fzf_preview#rpc#command('FzfPreviewGitFiles', <f-args>)
command! -nargs=? FzfPreviewDirectoryFilesRpc call fzf_preview#rpc#command('FzfPreviewDirectoryFiles', <f-args>)
command! -nargs=? FzfPreviewBuffersRpc call fzf_preview#rpc#command('FzfPreviewBuffers', <f-args>)
command! -nargs=? FzfPreviewAllBuffersRpc call fzf_preview#rpc#command('FzfPreviewAllBuffers', <f-args>)
command! -nargs=? FzfPreviewProjectOldFilesRpc call fzf_preview#rpc#command('FzfPreviewProjectOldFiles', <f-args>)
command! -nargs=? FzfPreviewProjectMruFilesRpc call fzf_preview#rpc#command('FzfPreviewProjectMruFiles', <f-args>)
command! -nargs=? FzfPreviewProjectMrwFilesRpc call fzf_preview#rpc#command('FzfPreviewProjectMrwFiles', <f-args>)
command! -nargs=? FzfPreviewLinesRpc call fzf_preview#rpc#command('FzfPreviewLines', <f-args>)
command! -nargs=? FzfPreviewBufferLinesRpc call fzf_preview#rpc#command('FzfPreviewBufferLines', <f-args>)
command! -nargs=? FzfPreviewCtagsRpc call fzf_preview#rpc#command('FzfPreviewCtags', <f-args>)
command! -nargs=? FzfPreviewBufferTagsRpc call fzf_preview#rpc#command('FzfPreviewBufferTags', <f-args>)
command! -nargs=? FzfPreviewOldFilesRpc call fzf_preview#rpc#command('FzfPreviewOldFiles', <f-args>)
command! -nargs=? FzfPreviewMruFilesRpc call fzf_preview#rpc#command('FzfPreviewMruFiles', <f-args>)
command! -nargs=? FzfPreviewMrwFilesRpc call fzf_preview#rpc#command('FzfPreviewMrwFiles', <f-args>)
command! -nargs=? FzfPreviewQuickFixRpc call fzf_preview#rpc#command('FzfPreviewQuickFix', <f-args>)
command! -nargs=? FzfPreviewLocationListRpc call fzf_preview#rpc#command('FzfPreviewLocationList', <f-args>)
command! -nargs=? FzfPreviewJumpsRpc call fzf_preview#rpc#command('FzfPreviewJumps', <f-args>)
command! -nargs=? FzfPreviewChangesRpc call fzf_preview#rpc#command('FzfPreviewChanges', <f-args>)
command! -nargs=? FzfPreviewMarksRpc call fzf_preview#rpc#command('FzfPreviewMarks', <f-args>)
command! -nargs=? FzfPreviewProjectGrepRpc call fzf_preview#rpc#command('FzfPreviewProjectGrep', <f-args>)
command! -nargs=? FzfPreviewProjectGrepRecallRpc call fzf_preview#rpc#command('FzfPreviewProjectGrepRecall', <f-args>)
command! -nargs=? FzfPreviewFromResourcesRpc call fzf_preview#rpc#command('FzfPreviewFromResources', <f-args>)
command! -nargs=? FzfPreviewCommandPaletteRpc call fzf_preview#rpc#command('FzfPreviewCommandPalette', <f-args>)
command! -nargs=1 FzfPreviewGrepHelpRpc call fzf_preview#rpc#command('FzfPreviewGrepHelp', <f-args>)
command! -nargs=? FzfPreviewGitActionsRpc call fzf_preview#rpc#command('FzfPreviewGitActions', <f-args>)
command! -nargs=? FzfPreviewGitStatusRpc call fzf_preview#rpc#command('FzfPreviewGitStatus', <f-args>)
command! -nargs=? FzfPreviewGitStatusActionsRpc call fzf_preview#rpc#command('FzfPreviewGitStatusActions', <f-args>)
command! -nargs=? FzfPreviewGitBranchesRpc call fzf_preview#rpc#command('FzfPreviewGitBranches', <f-args>)
command! -nargs=? FzfPreviewGitBranchActionsRpc call fzf_preview#rpc#command('FzfPreviewGitBranchActions', <f-args>)
command! -nargs=? FzfPreviewGitLogsRpc call fzf_preview#rpc#command('FzfPreviewGitLogs', <f-args>)
command! -nargs=? FzfPreviewGitCurrentLogsRpc call fzf_preview#rpc#command('FzfPreviewGitCurrentLogs', <f-args>)
command! -nargs=? FzfPreviewGitLogActionsRpc call fzf_preview#rpc#command('FzfPreviewGitLogActions', <f-args>)
command! -nargs=? FzfPreviewGitStashesRpc call fzf_preview#rpc#command('FzfPreviewGitStashes', <f-args>)
command! -nargs=? FzfPreviewGitStashActionsRpc call fzf_preview#rpc#command('FzfPreviewGitStashActions', <f-args>)
command! -nargs=? FzfPreviewGitReflogsRpc call fzf_preview#rpc#command('FzfPreviewGitReflogs', <f-args>)
command! -nargs=? FzfPreviewGitReflogActionsRpc call fzf_preview#rpc#command('FzfPreviewGitReflogActions', <f-args>)
command! -nargs=? FzfPreviewVimLspReferencesRpc call fzf_preview#rpc#command('FzfPreviewVimLspReferences', <f-args>)
command! -nargs=? FzfPreviewVimLspDiagnosticsRpc call fzf_preview#rpc#command('FzfPreviewVimLspDiagnostics', <f-args>)
command! -nargs=? FzfPreviewVimLspCurrentDiagnosticsRpc call fzf_preview#rpc#command('FzfPreviewVimLspCurrentDiagnostics', <f-args>)
command! -nargs=? FzfPreviewVimLspDefinitionRpc call fzf_preview#rpc#command('FzfPreviewVimLspDefinition', <f-args>)
command! -nargs=? FzfPreviewVimLspTypeDefinitionRpc call fzf_preview#rpc#command('FzfPreviewVimLspTypeDefinition', <f-args>)
command! -nargs=? FzfPreviewVimLspImplementationRpc call fzf_preview#rpc#command('FzfPreviewVimLspImplementation', <f-args>)
command! -nargs=? FzfPreviewBookmarksRpc call fzf_preview#rpc#command('FzfPreviewBookmarks', <f-args>)
command! -nargs=? FzfPreviewYankroundRpc call fzf_preview#rpc#command('FzfPreviewYankround', <f-args>)
command! -nargs=? FzfPreviewMemoListRpc call fzf_preview#rpc#command('FzfPreviewMemoList', <f-args>)
command! -nargs=? FzfPreviewMemoListGrepRpc call fzf_preview#rpc#command('FzfPreviewMemoListGrep', <f-args>)
command! -nargs=? FzfPreviewTodoCommentsRpc call fzf_preview#rpc#command('FzfPreviewTodoComments', <f-args>)
command! -nargs=? FzfPreviewVistaCtagsRpc call fzf_preview#rpc#command('FzfPreviewVistaCtags', <f-args>)
command! -nargs=? FzfPreviewVistaBufferCtagsRpc call fzf_preview#rpc#command('FzfPreviewVistaBufferCtags', <f-args>)
command! -nargs=? FzfPreviewBlamePRRpc call fzf_preview#rpc#command('FzfPreviewBlamePR', <f-args>)

let &cpoptions = s:save_cpo
unlet s:save_cpo

" vim:set expandtab shiftwidth=2 softtabstop=2 tabstop=2 foldenable foldmethod=marker:
