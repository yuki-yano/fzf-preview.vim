function! fzf_preview#remote#resource#yankround#get() abort
  let histories = map(copy(g:_yankround_cache), 'split(v:val, "\t", 1)')
  return map(histories, { key, val -> { 'line': key + 1, 'option': val[0], 'text': val[1] } })
endfunction
