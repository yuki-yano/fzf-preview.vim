function! fzf_preview#remote#resource#memolist#files() abort
  return memolist#files()
endfunction

function! fzf_preview#remote#resource#memolist#grep(command) abort
  return systemlist(a:command. ' ' . g:memolist_path)
endfunction
