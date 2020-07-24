function! fzf_preview#remote#resource#util#exec_command(command) abort
  return systemlist(a:command)
endfunction
