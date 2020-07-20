function! fzf_preview#remote#resource#git_status#get(command) abort
  return systemlist(a:command)
endfunction
