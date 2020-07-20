function! fzf_preview#remote#resource#git_files#get(command) abort
  return systemlist(a:command)
endfunction
