function! fzf_preview#handler#handle_resource(lines, ...) abort
  let force_disable_dev_icons = get(a:, 1, 0)
  let optional_discard_prefix_size = get(a:, 2, 0)
  let Extract_filename_func = get(a:, 3, v:false)

  let use_dev_icons = force_disable_dev_icons ? 0 : g:fzf_preview_use_dev_icons
  let discard_prefix_size = s:discard_prefix_size(use_dev_icons, optional_discard_prefix_size)

  let key = a:lines[0]

  let lines = map(copy(a:lines[1:]), { _, line -> line[discard_prefix_size :] })
  if Extract_filename_func != v:false
    call map(lines, { _, line -> Extract_filename_func(line) })
  endif

  let Processor = fzf_preview#resource_processor#key2processor(key)
  call Processor(lines)
endfunction

function! fzf_preview#handler#handle_git_status(lines) abort
  call fzf_preview#handler#handle_resource(a:lines, 1, 3)
endfunction

function! fzf_preview#handler#handle_all_buffers(lines) abort
  let key = [a:lines[0]]
  let lines = map(copy(a:lines[1:]), { _, line -> 'buffer ' . split(line)[0] })
  call fzf_preview#handler#handle_resource(key + lines, 1)
endfunction

function! fzf_preview#handler#handle_lines(lines) abort
  let key = [a:lines[0]]
  let lines = []
  for line in a:lines[1:]
    let elem = split(line, '\s\+')
    call add(lines, expand('%') . ':' . elem[0])
  endfor

  let lines = key + lines
  call fzf_preview#handler#handle_resource(lines, 1, 0, function('s:extract_filename_and_line_number_from_grep'))
endfunction

function! fzf_preview#handler#handle_grep(lines) abort
  let optional_discard_prefix_size = g:fzf_preview_use_dev_icons ? g:fzf_preview_dev_icon_prefix_length : 0
  call fzf_preview#handler#handle_resource(a:lines, 1, optional_discard_prefix_size)
endfunction

function! fzf_preview#handler#handle_buffer_tags(lines) abort
  let key = [a:lines[0]]
  let lines = []
  for line in a:lines[1:]
    let elem = split(line, '\s\+')
    call add(lines, expand('%') . ':' . elem[0])
  endfor

  let lines = key + lines
  call fzf_preview#handler#handle_resource(lines, 1, 0, function('s:extract_filename_and_line_number_from_grep'))
endfunction

function! s:discard_prefix_size(use_dev_icons, optional_discard_prefix_size) abort
  let discard_size_from_devicons_status = (a:use_dev_icons ? g:fzf_preview_dev_icon_prefix_length : 0)
  return a:optional_discard_prefix_size + discard_size_from_devicons_status
endfunction

function! s:extract_filename_and_line_number_from_grep(line) abort
  return join(split(a:line, ':')[:1], ':')
endfunction
