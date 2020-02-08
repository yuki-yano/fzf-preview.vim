function! fzf_preview#opener#edit_file(lines, ...) abort
  let force_disable_dev_icons = get(a:, 1, 0)
  let optional_discard_prefix_size = get(a:, 2, 0)
  let Extract_filename_func = get(a:, 3, 0)

  let use_dev_icons = force_disable_dev_icons ? 0 : g:fzf_preview_use_dev_icons
  let discard_prefix_size = s:discard_prefix_size(use_dev_icons, optional_discard_prefix_size)

  let key = a:lines[0]
  let open_command = s:get_open_command(key)

  let file_paths = map(copy(a:lines[1:]), { _, path -> path[discard_prefix_size :] })
  if type(open_command) == 1
    if Extract_filename_func != 0
      call map(file_paths, 'Extract_filename_func(v:val)')
    endif
    call s:open_file(open_command, file_paths)
  else
    call s:sink_functions()[key](file_paths)
  endif
endfunction

function! fzf_preview#opener#edit_git_status(lines) abort
  call fzf_preview#opener#edit_file(a:lines, 1, 3)
endfunction

function! fzf_preview#opener#edit_grep(lines) abort
  call fzf_preview#opener#edit_file(a:lines, 1, 0, function('s:extract_filename_and_line_number_from_grep'))
endfunction

function! fzf_preview#opener#edit_bookmarks(lines) abort
  call fzf_preview#opener#edit_file(a:lines, 1, 0, function('s:extract_filename_and_line_number_from_grep'))
endfunction

function! s:discard_prefix_size(use_dev_icons, optional_discard_prefix_size) abort
  let discard_size_from_devicons_status = (a:use_dev_icons ? g:fzf_preview_dev_icon_prefix_length : 0)
  return a:optional_discard_prefix_size + discard_size_from_devicons_status
endfunction

function! s:get_open_command(key) abort
  let command_hash = {}
  let command_hash[g:fzf_preview_split_key_map] = 'split'
  let command_hash[g:fzf_preview_vsplit_key_map] = 'vertical split'
  let command_hash[g:fzf_preview_tabedit_key_map] = 'tabedit'

  if !has_key(s:sink_functions(), a:key)
    return get(command_hash, a:key, 'edit')
  else
    return 0
  endif
endfunction

function! s:sink_functions() abort
  let key2func = {}
  let key2func[g:fzf_preview_build_quickfix_key_map] = function('s:export_quickfix')

  return key2func
endfunction

function! s:export_quickfix(file_paths) abort
  call setqflist(map(copy(a:file_paths), '{ "filename": v:val }'))
  copen
endfunction

function! s:open_file(open_command, file_paths) abort
  for file_path in a:file_paths
    execute 'silent '. a:open_command . ' ' . file_path
  endfor
endfunction

function! s:extract_filename_and_line_number_from_grep(line) abort
  return join(split(a:line, ':')[:1], ':')
endfunction
