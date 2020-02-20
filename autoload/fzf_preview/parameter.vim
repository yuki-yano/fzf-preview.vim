function! fzf_preview#parameter#build_parameter(func_name, additional, args) abort
  return function(a:func_name)(a:additional, a:args)
endfunction

function! s:project_files(additional, args) abort
  return {
  \ 'source': fzf_preview#resource#project_files(),
  \ 'prompt': 'ProjectFiles',
  \ }
endfunction

function! s:git_files(additional, args) abort
  return {
  \ 'source': fzf_preview#resource#git_files(),
  \ 'prompt': 'GitFiles',
  \ }
endfunction

function! s:directory_files(additional, args) abort
  return {
  \ 'source': fzf_preview#resource#directory_files(),
  \ 'prompt': 'DirectoryFiles',
  \ }
endfunction

function! s:git_status(additional, args) abort
  let preview = "[[ $(git diff -- {-1}) != \"\" ]] && git diff --color=always -- {-1} || " . g:fzf_preview_command
  return {
  \ 'source': fzf_preview#resource#git_status(),
  \ 'sink': function('fzf_preview#handler#handle_git_status'),
  \ 'options': fzf_preview#command#get_command_options('GitStatus', preview)
  \ }
endfunction

function! s:buffers(additional, args) abort
  return {
  \ 'source': fzf_preview#resource#buffers(),
  \ 'prompt': 'Buffers',
  \ }
endfunction

function! s:all_buffers(additional, args) abort
  let preview = '[[ -f {2..} ]] && ' . g:fzf_preview_command . ' || echo "{2..} is not file."'
  return {
  \ 'source': fzf_preview#resource#all_buffers(),
  \ 'sink': function('fzf_preview#handler#handle_all_buffers'),
  \ 'options': fzf_preview#command#get_command_options('AllBuffers', preview)
  \ }
endfunction

function! s:project_oldfiles(additional, args) abort
  return {
  \ 'source': fzf_preview#resource#project_oldfiles(),
  \ 'prompt': 'ProjectOldFiles',
  \ }
endfunction

function! s:project_mru_files(additional, args) abort
  return {
  \ 'source': fzf_preview#resource#project_mrufiles(),
  \ 'prompt': 'ProjectMruFiles',
  \ }
endfunction

function! s:oldfiles(additional, args) abort
  return {
  \ 'source': fzf_preview#resource#oldfiles(),
  \ 'prompt': 'OldFiles',
  \ }
endfunction

function! s:mru_files(additional, args) abort
  return {
  \ 'source': fzf_preview#resource#mrufiles(),
  \ 'prompt': 'MruFiles',
  \ }
endfunction

function! s:locationlist(additional, args) abort
  let resource = fzf_preview#resource#quickfix_or_locationlist(a:additional['type'])
  if len(split(resource[0], ':')) == 1
    let preview = g:fzf_preview_command
    let optional = ''
  else
    let preview = g:fzf_preview_grep_preview_cmd . ' {}'
    let optional = '--delimiter : '
  endif
  return {
  \ 'source': resource,
  \ 'sink': function('fzf_preview#handler#handle_grep'),
  \ 'options': fzf_preview#command#get_command_options(a:additional['type'], preview, optional)
  \ }
endfunction

function! s:lines(additional, args) abort
  let preview = g:fzf_preview_grep_preview_cmd . ' ' . expand('%') . ':{}'
  let optional = '--delimiter : '

  return {
  \ 'source': fzf_preview#resource#lines(),
  \ 'sink': function('fzf_preview#handler#handle_lines'),
  \ 'options': fzf_preview#command#get_command_options('Lines', preview, optional)
  \ }
endfunction

function! s:project_grep(additional, args) abort
  let preview = g:fzf_preview_grep_preview_cmd . ' {}'
  let optional = '--delimiter : '

  return {
  \ 'source': fzf_preview#resource#grep(join(a:args, ' ')),
  \ 'sink': function('fzf_preview#handler#handle_grep'),
  \ 'options': fzf_preview#command#get_command_options('ProjectGrep', preview, optional)
  \ }
endfunction

function! s:buffer_tags(additional, args) abort
  let preview = g:fzf_preview_grep_preview_cmd . ' ' . expand('%') . ':{}'
  let optional = '--delimiter : '

  return {
  \ 'source': fzf_preview#resource#buffer_tags(),
  \ 'sink': function('fzf_preview#handler#handle_buffer_tags'),
  \ 'options': fzf_preview#command#get_command_options('BufferTags', preview, optional)
  \ }
endfunction

function! s:jumps(additional, args) abort
  let preview = g:fzf_preview_grep_preview_cmd . ' {}'
  let optional = '--delimiter : '

  return {
  \ 'source': fzf_preview#resource#jumps(),
  \ 'sink': function('fzf_preview#handler#handle_grep'),
  \ 'options': fzf_preview#command#get_command_options('Jumps', preview, optional)
  \ }
endfunction

function! s:marks(additional, args) abort
  let preview = g:fzf_preview_grep_preview_cmd . ' {}'
  let optional = '--delimiter : '

  return {
  \ 'source': fzf_preview#resource#marks(),
  \ 'sink': function('fzf_preview#handler#handle_grep'),
  \ 'options': fzf_preview#command#get_command_options('Marks', preview, optional)
  \ }
endfunction

function! s:files_from_resources(additional, args) abort
  return {
  \ 'source': fzf_preview#resource#files_from_resources(a:args),
  \ 'prompt': 'ResourceFrom',
  \ }
endfunction
