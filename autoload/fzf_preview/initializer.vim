function! fzf_preview#initializer#initialize(func_name, additional, ...) abort
  let args = fzf_preview#args#parse(a:000)

  call fzf_preview#resource_processor#reset_processors()
  if args['processors'] != v:false
    let processors = eval(args['processors'])
    call fzf_preview#resource_processor#set_processors(processors)
  endif

  call fzf_preview#command#reset_command_options()
  if args['fzf-args'] != v:false
    let fzf_args = eval(args['fzf-args'])
    call fzf_preview#command#set_command_options(fzf_args)
  endif

  return fzf_preview#parameter#build_parameter(a:func_name, a:additional, args['extra'])
endfunction
