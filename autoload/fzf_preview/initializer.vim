function! fzf_preview#initializer#initialize(func_name, additional, ...) abort
  call fzf_preview#resource_processor#reset_processors()
  call fzf_preview#command#reset_command_options()

  let args = fzf_preview#args#parse(a:000)
  let fzf_args = ''

  if args['processors'] != ''
    let processors = eval(args['processors'])
    call fzf_preview#resource_processor#set_processors(processors)
  endif


  if args['fzf-arg'] != ''
    let fzf_args = fzf_args . args['fzf-arg']
  endif

  if args['eval-fzf-args'] != ''
    let fzf_args = fzf_args . eval(args['eval-fzf-args'])
  endif

  call fzf_preview#command#set_command_options(fzf_args)
  return fzf_preview#parameter#build_parameter(a:func_name, a:additional, args['extra'])
endfunction
