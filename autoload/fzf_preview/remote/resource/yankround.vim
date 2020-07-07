function! fzf_preview#remote#resource#yankround#get() abort
  let histories = map(copy(g:_yankround_cache), 'split(v:val, "\t", 1)')
  return map(histories, { key, val -> key + 1 . ' ' . val[0] . ' ' . val[1] })
endfunction
