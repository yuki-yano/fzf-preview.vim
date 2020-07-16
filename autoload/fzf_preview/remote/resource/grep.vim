function! fzf_preview#remote#resource#grep#get(command) abort
  return systemlist(a:command)
endfunction
