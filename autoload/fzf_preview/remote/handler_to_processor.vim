function! fzf_preview#remote#handler_to_processor#call_funcref_or_fallback_default_processor(default_processor_function_name, expect_key, lines, processor_name) abort
  if (a:processor_name == v:null)
    call call(a:default_processor_function_name, a:lines)
  else
    let processors = eval('g:' . a:processor_name)
    let Processor = processors[a:expect_key]

    if type(Processor) == v:t_string
      call call(Processor, [a:lines])
    elseif type(Processor) == v:t_func
      call Processor(a:lines)
    endif
  endif
endfunction
