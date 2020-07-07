function! fzf_preview#remote#resource#quickfix_and_locationlist#get(type) abort
  let lines = s:get_quickfix_or_locationlist_lines(a:type)

  if !empty(filter(lines, { _, line -> line !=# '' }))
    return lines
  else
    return []
  endif
endfunction

function! s:get_quickfix_or_locationlist_lines(type) abort
  let qf_or_loc_lists = s:get_quickfix_or_loclist(a:type)

  if len(qf_or_loc_lists) != 0
    return len(qf_or_loc_lists) > 0 ? getbufline(qf_or_loc_lists[0]['bufnr'], 1, '$') : []
  endif

  return s:open_process_with_qf_and_close(a:type, { type -> s:get_quickfix_or_locationlist_lines(type) })
endfunction

function! s:get_quickfix_or_loclist(type) abort
  return filter(getwininfo(), { _, w -> w['tabnr'] == tabpagenr() && getwinvar(w['winnr'], '&filetype') ==# 'qf' && w[a:type]})
endfunction

function! s:open_process_with_qf_and_close(type, F) abort
  let winid = win_getid()

  if a:type ==# 'quickfix'
    copen
  elseif a:type ==# 'loclist'
    try
      lopen
    catch
      return []
    endtry
  else
    return []
  endif

  call win_gotoid(winid)

  let result = a:F(a:type)

  if a:type ==# 'quickfix'
    cclose
  elseif a:type ==# 'loclist'
    lclose
  endif

  return result
endfunction
