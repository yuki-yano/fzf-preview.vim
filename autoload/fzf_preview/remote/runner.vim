function! fzf_preview#remote#runner#fzf_run(params) abort
  let source = a:params['source']
  let options = a:params['options']
  let handler = a:params['handler']
  let env = a:params['environment']

  if env ==# 'remote'
    let Sink = function('s:handler_wrapper', [handler])
  elseif env ==# 'coc'
    let Sink = function('s:coc_handler')
  elseif env ==# 'rpc'
    let Sink = function('fzf_preview#rpc#rpc_handler')
  endif

  let window = !empty(g:fzf_preview_direct_window_option) ?
        \  g:fzf_preview_direct_window_option :
        \  { 'width': g:fzf_preview_floating_window_rate, 'height': g:fzf_preview_floating_window_rate }

  call feedkeys("\<Cmd>nohlsearch\<CR>", 'nit')

  call fzf#run({
  \ 'source':  source,
  \ 'sink*':   Sink,
  \ 'options': options,
  \ 'window':  window,
  \ })
endfunction

function! s:handler_wrapper(handler, lines) abort
  call feedkeys('', 'x')
  call call(a:handler, [a:lines])
endfunction

function! s:coc_handler(lines) abort
  call feedkeys('', 'x')
  call CocAction('runCommand', 'fzf-preview.HandleResource', [a:lines])
endfunction
