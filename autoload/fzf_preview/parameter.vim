function! fzf_preview#parameter#project_files() abort
  return {
  \ 'source': fzf_preview#resource#project_files(),
  \ 'prompt': 'ProjectFiles',
  \ }
endfunction

function! fzf_preview#parameter#git_files() abort
  return {
  \ 'source': fzf_preview#resource#git_files(),
  \ 'prompt': 'GitFiles',
  \ }
endfunction

function! fzf_preview#parameter#directory_files() abort
  return {
  \ 'source': fzf_preview#resource#directory_files(),
  \ 'prompt': 'DirectoryFiles',
  \ }
endfunction

function! fzf_preview#parameter#git_status() abort
  let preview = "[[ $(git diff -- {-1}) != \"\" ]] && git diff --color=always -- {-1} || " . g:fzf_preview_command
  return {
  \ 'source': fzf_preview#resource#git_status(),
  \ 'sink': function('fzf_preview#opener#edit_git_status'),
  \ 'options': fzf_preview#command#command_options('GitStatus', preview)
  \ }
endfunction

function! fzf_preview#parameter#buffers() abort
  return {
  \ 'source': fzf_preview#resource#buffers(),
  \ 'prompt': 'Buffers',
  \ }
endfunction

function! fzf_preview#parameter#project_oldfiles() abort
  return {
  \ 'source': fzf_preview#resource#project_oldfiles(),
  \ 'prompt': 'ProjectOldFiles',
  \ }
endfunction

function! fzf_preview#parameter#project_mrufiles() abort
  return {
  \ 'source': fzf_preview#resource#project_mrufiles(),
  \ 'prompt': 'ProjectMruFiles',
  \ }
endfunction

function! fzf_preview#parameter#oldfiles() abort
  return {
  \ 'source': fzf_preview#resource#oldfiles(),
  \ 'prompt': 'OldFiles',
  \ }
endfunction

function! fzf_preview#parameter#mrufiles() abort
  return {
  \ 'source': fzf_preview#resource#mrufiles(),
  \ 'prompt': 'MruFiles',
  \ }
endfunction

function! fzf_preview#parameter#project_grep(...) abort
  let grep_command = fzf_preview#command#grep_command(a:000)
  let preview = g:fzf_preview_grep_preview_cmd . ' {}'
  let optional = '--delimiter : --nth 3.. '

  return {
  \ 'source': grep_command,
  \ 'sink': function('fzf_preview#opener#edit_grep'),
  \ 'options': fzf_preview#command#command_options('ProjectGrep', preview, optional)
  \ }
endfunction

function! fzf_preview#parameter#bookmarks() abort
  let optional = '--delimiter :'
  let preview = g:fzf_preview_grep_preview_cmd . ' {}'

  return {
  \ 'source': fzf_preview#resource#bookmarks(),
  \ 'sink': function('fzf_preview#opener#edit_bookmarks'),
  \ 'options': fzf_preview#command#command_options('Bookmarks', preview, optional)
  \ }
endfunction

function! fzf_preview#parameter#files_from_resources(...) abort
  return {
  \ 'source': fzf_preview#resource#files_from_resources(a:000),
  \ 'prompt': 'ResourceFrom',
  \ }
endfunction
