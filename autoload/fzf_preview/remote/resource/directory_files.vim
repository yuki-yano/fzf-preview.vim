function! fzf_preview#remote#resource#directory_files#get(command) abort
  return systemlist(a:command)
endfunction
