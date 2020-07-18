function! fzf_preview#remote#resource#all_buffers#get() abort
  let buffers = []
  for bufinfo in copy(getbufinfo())
    let buffer = {
    \ 'name': fnamemodify(bufinfo['name'], ':.'),
    \ 'bufnr': bufinfo['bufnr'],
    \ }
    call add(buffers, buffer)
  endfor

  let buffers = map(copy(getbufinfo({ 'buflisted': 1 })),
  \ { _, buffer -> {
  \     'fileName': fnamemodify(buffer['name'], ':.'),
  \     'bufnr': buffer['bufnr'],
  \     'isCurrent': v:false,
  \     'isAlternate': v:false,
  \     'isModified': v:false,
  \   }
  \ }
  \ )

  return buffers
endfunction
