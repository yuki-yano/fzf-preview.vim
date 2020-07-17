function! fzf_preview#remote#resource#changes#get() abort
  if !filereadable(expand('%'))
    return []
  endif

  let list = []
  let lnums = map(copy(getchangelist('%')[0]), { _, change -> change['lnum'] })
  for lnum in lnums
    let lines = getbufline(bufnr('%'), lnum)
    if len(lines) > 0
      call add(list, lnum . ' ' . lines[0])
    endif
  endfor

  call reverse(list)
  let list = fzf_preview#remote#util#uniq(list)

  return list
endfunction
