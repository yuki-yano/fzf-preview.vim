function! fzf_preview#resource_processor#key2processor(key) abort
  if !exists('s:processors')
    call s:initialize_processors()
  endif
  let Processor = s:processors[a:key]

  return Processor
endfunction

function! fzf_preview#resource_processor#get_processors() abort
  if !exists('s:processors')
    call s:initialize_processors()
  endif
  return copy(s:processors)
endfunction

function! fzf_preview#resource_processor#get_default_processors() abort
  let processors = {}
  let processors[''] = function('fzf_preview#resource_processor#edit')
  let processors[g:fzf_preview_split_key_map] = function('fzf_preview#resource_processor#split')
  let processors[g:fzf_preview_vsplit_key_map] = function('fzf_preview#resource_processor#vsplit')
  let processors[g:fzf_preview_tabedit_key_map] = function('fzf_preview#resource_processor#tabedit')
  let processors[g:fzf_preview_build_quickfix_key_map] = function('fzf_preview#resource_processor#export_quickfix')

  return processors
endfunction

function! fzf_preview#resource_processor#set_processors(processors) abort
  let s:processors = a:processors
endfunction

function! fzf_preview#resource_processor#reset_processors() abort
  if exists('s:processors')
    unlet s:processors
  endif
endfunction

function! fzf_preview#resource_processor#edit(lines) abort
  call s:open_files('edit', a:lines)
endfunction

function! fzf_preview#resource_processor#split(lines) abort
  call s:open_files('split', a:lines)
endfunction

function! fzf_preview#resource_processor#vsplit(lines) abort
  call s:open_files('vertical split', a:lines)
endfunction

function! fzf_preview#resource_processor#tabedit(lines) abort
  call s:open_files('tabedit', a:lines)
endfunction

function! fzf_preview#resource_processor#export_quickfix(lines) abort
  let items = []
  for path in copy(a:lines)
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

function! s:initialize_processors() abort
  let fzf_preview_custom_default_processors = get(g:, 'fzf_preview_custom_default_processors', {})
  if g:fzf_preview_custom_default_processors != {}
    let s:processors = copy(g:fzf_preview_custom_default_processors)
  else
    let s:processors = fzf_preview#resource_processor#get_default_processors()
  endif
endfunction

function! s:open_files(open_command, lines) abort
  for line in copy(a:lines)
    let matches = matchlist(line, '^buffer \(\d\+\)$')
    if len(matches) >= 1
      call s:open_buffer(a:open_command, matches[1])
    else
      call s:open_file_from_filepath(a:open_command, line)
    endif
  endfor
endfunction

function! s:open_file_from_filepath(command, path) abort
  let filepath_and_line_number = s:split_path_into_filename_line_number_and_text(a:path)
  let file_path = filepath_and_line_number[0]
  let line_number = len(filepath_and_line_number) >= 2 ? filepath_and_line_number[1] : v:false
  execute join(['silent', a:command, file_path], ' ')
  if line_number
    call cursor(line_number, 0)
  endif
endfunction

function! s:open_buffer(command, bufnr) abort
  execute join(['silent', a:command, '|', 'buffer', a:bufnr], ' ')
endfunction

function! s:split_path_into_filename_line_number_and_text(path) abort
  let filepath_and_line_number_and_text = split(a:path, ':')
  let file_path = filepath_and_line_number_and_text[0]
  let line_number = len(filepath_and_line_number_and_text) >= 2 ? filepath_and_line_number_and_text[1] : v:false
  let text = len(filepath_and_line_number_and_text) >= 3 ? join(filepath_and_line_number_and_text[2:], ':') : ''

  return [file_path, line_number, text]
endfunction
