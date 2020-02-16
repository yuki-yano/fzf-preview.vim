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
  return s:processors
endfunction

function! fzf_preview#resource_processor#get_default_processors() abort
  if g:fzf_preview#custom_processors == {}
    let processors = {}
    let processors[''] = function('fzf_preview#resource_processor#edit')
    let processors[g:fzf_preview#split_key_map] = function('fzf_preview#resource_processor#split')
    let processors[g:fzf_preview#vsplit_key_map] = function('fzf_preview#resource_processor#vsplit')
    let processors[g:fzf_preview#tabedit_key_map] = function('fzf_preview#resource_processor#tabedit')
    let processors[g:fzf_preview#build_quickfix_key_map] = function('fzf_preview#resource_processor#export_quickfix')
  else
    let processors = g:fzf_preview_custom_processors
  endif

  return processors
endfunction

function! fzf_preview#resource_processor#set_processors(processors) abort
  let s:processors = a:processors
endfunction

function! fzf_preview#resource_processor#reset_processors(...) abort
  if exists('s:processors')
    unlet s:processors
  endif
endfunction

function! fzf_preview#resource_processor#edit(paths) abort
  call s:open_file('edit', a:paths)
endfunction

function! fzf_preview#resource_processor#split(paths) abort
  call s:open_file('split', a:paths)
endfunction

function! fzf_preview#resource_processor#vsplit(paths) abort
  call s:open_file('vertical split', a:paths)
endfunction

function! fzf_preview#resource_processor#tabedit(paths) abort
  call s:open_file('tabedit', a:paths)
endfunction

function! fzf_preview#resource_processor#export_quickfix(paths) abort
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

function! s:initialize_processors() abort
  let s:processors = fzf_preview#resource_processor#get_default_processors()
endfunction

function! s:open_file(open_command, paths) abort
  for path in copy(a:paths)
    let filepath_and_line_number = s:split_path_into_filename_line_number_and_text(path)
    let file_path = filepath_and_line_number[0]
    let line_number = len(filepath_and_line_number) >= 2 ? filepath_and_line_number[1] : v:false
    execute join(['silent', a:open_command, file_path], ' ')
    if line_number
      call cursor(line_number, 0)
    endif
  endfor
endfunction

function! s:split_path_into_filename_line_number_and_text(path) abort
  let filepath_and_line_number_and_text = split(a:path, ':')
  let file_path = filepath_and_line_number_and_text[0]
  let line_number = len(filepath_and_line_number_and_text) >= 2 ? filepath_and_line_number_and_text[1] : v:false
  let text = len(filepath_and_line_number_and_text) >= 3 ? join(filepath_and_line_number_and_text[2:], ':') : ''

  return [file_path, line_number, text]
endfunction
