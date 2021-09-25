function! fzf_preview#remote#consumer#register#set(str, options) abort
  call setreg('"', a:str, a:options)
endfunction

function! fzf_preview#remote#consumer#register#paste(str, options) abort
  call setreg('"', a:str, a:options)
  normal! ""p
endfunction
