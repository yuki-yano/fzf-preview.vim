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
  \ { _, buffer -> buffer['bufnr'] . ' ' . fnamemodify(buffer['name'], ':.') }
  \ )

  return buffers
endfunction

