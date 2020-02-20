function! fzf_preview#initializer#initialize(func_name, additional, ...) abort
  call fzf_preview#resource_processor#reset_processors()
  call fzf_preview#command#reset_command_options()

  let args = fzf_preview#args#parse(a:000)

  if args['processors'] != ''
    let processors = eval(args['processors'])
    call fzf_preview#resource_processor#set_processors(processors)
  endif


  if args['fzf-arg'] != ''
    let fzf_args = fzf_preview#command#get_common_command_options() . args['fzf-arg']
    call fzf_preview#command#set_command_options(fzf_args)
  endif

  if args['eval-fzf-args'] != ''
    call fzf_preview#command#set_command_options(eval(args['eval-fzf-args']))
  endif

  return fzf_preview#parameter#build_parameter(a:func_name, a:additional, args['extra'])
endfunction
