function! fzf_preview#initializer#initialize(name, additional, ...) abort
  let args = fzf_preview#args#parse(a:000)

  call fzf_preview#resource_processor#reset_processors()
  if args['processors'] != v:false
    let processors = eval(args['processors'])
    call fzf_preview#resource_processor#set_processors(processors)
  endif

  return fzf_preview#parameter#build_parameter(a:name, a:additional, args['extra'])
endfunction
