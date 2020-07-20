function! fzf_preview#remote#resource#lines#get(command) abort
  return systemlist(a:command)
endfunction
