function! fzf_preview#initializer#initialize(func_name, additional, ...) abort
  call fzf_preview#resource_processor#reset_processors()
  call fzf_preview#command#reset_command_options()

  let args = fzf_preview#args#parse(a:000)

  if args['processors'] != ''
    let processors = eval(args['processors'])
    call fzf_preview#resource_processor#set_processors(processors)
  endif


  if args['add-fzf-arg'] != ''
    let add_fzf_args = fzf_preview#command#get_common_command_options() . args['add-fzf-arg']
    call fzf_preview#command#set_command_options(add_fzf_args)
  endif

  if args['overwrite-fzf-args'] != ''
    call fzf_preview#command#set_command_options(eval(args['overwrite-fzf-args']))
  endif

  return fzf_preview#parameter#build_parameter(a:func_name, a:additional, args['extra'])
endfunction
