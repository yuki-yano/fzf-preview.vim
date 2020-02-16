function! fzf_preview#runner#fzf_run(params) abort
  let source = a:params['source']
  let prompt = has_key(a:params, 'prompt') ? a:params['prompt'] : g:fzf_preview#DEFAULT_PROMPT
  let Sink = has_key(a:params, 'sink') ? a:params['sink'] : function('fzf_preview#handler#handle_resource')
  let options = has_key(a:params, 'options') ? a:params['options'] : fzf_preview#command#file_list_command_options(prompt)

  call fzf#run({
  \ 'source':  source,
  \ 'sink*':   Sink,
  \ 'options': options,
  \ 'window':  fzf_preview#window#float_or_normal_layout(),
  \ })
endfunction
