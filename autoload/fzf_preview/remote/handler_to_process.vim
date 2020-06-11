function! fzf_preview#remote#handler_to_process#call_funcref_or_fallback_default_process(default_process_function_name, expect_key, lines, process_name) abort
  if (a:process_name == v:null)
    call call(a:default_process_function_name, a:lines)
  else
    let processes = eval('g:' . a:process_name)
    let Process = processes[a:expect_key]

    if type(Process) == v:t_string
      call call(Process, [a:lines])
    elseif type(Process) == v:t_func
      call Process(a:lines)
    endif
  endif
endfunction
