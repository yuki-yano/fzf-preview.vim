function! fzf_preview#initializer#initialize(func_name, additional, ...) abort
  call fzf_preview#resource_processor#reset_processors()
  call fzf_preview#command#reset_command_options()

  let args = fzf_preview#args#parse(a:000)

  if args['processors'] != ''
    let processors = eval(args['processors'])
    call fzf_preview#resource_processor#set_processors(processors)
  endif

  let fzf_args = fzf_preview#command#get_common_command_options()
  if args['add-fzf-arg'] != ''
    let fzf_args = fzf_args . args['add-fzf-arg']
    call fzf_preview#command#set_command_options(fzf_args)
  endif

  if args['overwrite-fzf-args'] != ''
    call fzf_preview#command#set_command_options(eval(args['overwrite-fzf-args']))
  endif

  if args['resume'] == v:true
    let fzf_args = fzf_args . ' --query="' . fzf_preview#window#get_last_query(a:func_name) . '"'
    call fzf_preview#command#set_command_options(fzf_args)
  endif

  call fzf_preview#window#set_resource_func_name(a:func_name)

  return fzf_preview#parameter#build_parameter(a:func_name, a:additional, args['extra'])
endfunction
