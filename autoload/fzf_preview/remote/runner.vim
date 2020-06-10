function! fzf_preview#remote#runner#fzf_run(params) abort
  let source = a:params['source']
  let options = a:params['options']
  let handler = a:params['handler']

  call fzf#run({
  \ 'source':  source,
  \ 'sink*':   function('s:handler_wrapper', [handler]),
  \ 'options': options,
  \ 'window':  { 'width': g:fzf_preview_floating_window_rate, 'height': g:fzf_preview_floating_window_rate },
  \ })
endfunction

function! s:handler_wrapper(handler, lines) abort
  call call(a:handler, a:lines)
endfunction
