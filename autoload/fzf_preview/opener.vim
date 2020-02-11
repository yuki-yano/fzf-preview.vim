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
  let optional_discard_prefix_size = g:fzf_preview_use_dev_icons ? g:fzf_preview_dev_icon_prefix_length : 0
  call fzf_preview#opener#edit_file(a:lines, 1, optional_discard_prefix_size, function('s:extract_filename_and_line_number_from_grep'))
endfunction

function! fzf_preview#opener#edit_jumptoline(lines) abort
  let line = a:lines[1]
  let bnr = split(line)[0]
  let d = jumptoline#matches(getline('.'))[0]
  let fullpath = jumptoline#utils#find_thefile(d['path'])
  call jumptoline#callback(line, -1, fullpath[0], d['lnum'], d['col'])
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

function! s:open_file(open_command, paths) abort
  for path in copy(a:paths)
    let filepath_and_line_number = s:split_path_into_filename_line_number_and_text(path)
    let file_path = filepath_and_line_number[0]
    let line_number = len(filepath_and_line_number) >= 2 ? filepath_and_line_number[1] : v:false
    execute 'silent '. a:open_command . ' ' . file_path
    if line_number
      call cursor(line_number, 0)
    endif
  endfor
endfunction

function! s:export_quickfix(paths) abort
  let items = []
  for path in copy(a:paths)
    let filepath_and_line_number_and_text = s:split_path_into_filename_line_number_and_text(path)
    let item = {}
    let item['filename'] = filepath_and_line_number_and_text[0]
    if filepath_and_line_number_and_text[1]
      let item['lnum'] = filepath_and_line_number_and_text[1]
      let item['text'] = filepath_and_line_number_and_text[2]
    end

    call add(items, item)
  endfor

  call setqflist(items)
  copen
endfunction

function! s:extract_filename_and_line_number_from_grep(line) abort
  return join(split(a:line, ':')[:1], ':')
endfunction

function! s:split_path_into_filename_line_number_and_text(path) abort
  let filepath_and_line_number_and_text = split(a:path, ':')
  let file_path = filepath_and_line_number_and_text[0]
  let line_number = len(filepath_and_line_number_and_text) >= 2 ? filepath_and_line_number_and_text[1] : v:false
  let text = len(filepath_and_line_number_and_text) >= 3 ? filepath_and_line_number_and_text[2] : ''

  return [file_path, line_number, text]
endfunction
