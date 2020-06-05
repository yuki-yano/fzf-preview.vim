let s:state = {}

function! fzf_preview#remote#store#persist_store(state) abort
  let s:state = a:state
endfunction

function! fzf_preview#remote#store#restore_store() abort
  return s:state
endfunction
