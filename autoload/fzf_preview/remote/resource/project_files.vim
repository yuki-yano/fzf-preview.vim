function! fzf_preview#remote#resource#project_files#get(command) abort
  return systemlist(a:command)
endfunction
