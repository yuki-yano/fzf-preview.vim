function! fzf_preview#remote#runner#fzf_run(params) abort
  let source = a:params['source']
  let options = a:params['options']
  let handler = a:params['handler']

  call fzf#run({
  \ 'source':  source,
  \ 'sink*':   function('s:handler_wrapper', [handler]),
  \ 'options': options,
  \ 'window':  fzf_preview#window#float_or_normal_layout(),
  \ })
endfunction

function! s:handler_wrapper(handler, lines) abort
  call call(a:handler, a:lines)
endfunction
