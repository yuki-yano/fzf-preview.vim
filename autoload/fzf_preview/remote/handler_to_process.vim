function! fzf_preview#remote#handler_to_process#call_funcref_or_fallback_default_process(env, default_process_function_name, expect_key, lines, process_name) abort
  if a:env ==# 'remote'
    call s:call_remote_plugin(a:default_process_function_name, a:expect_key, a:lines, a:process_name)
  elseif a:env ==# 'coc'
    call s:call_coc(a:default_process_function_name, a:expect_key, a:lines, a:process_name)
  endif
endfunction

function! s:call_remote_plugin(default_process_function_name, expect_key, lines, process_name) abort
  if (a:process_name == v:null)
    call call(a:default_process_function_name, [a:lines])
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

function! s:call_coc(default_process_function_name, expect_key, lines, process_name) abort
  if (a:process_name == v:null)
    let process_name = substitute(a:default_process_function_name, '^FzfPreview', '', '')
    call CocAction('runCommand', 'fzf-preview-callback.' . process_name, [a:lines])
  else
    let processes = eval('g:' . a:process_name)
    let Process = processes[a:expect_key]

    if type(Process) == v:t_string
      if exists('*' . Process)
        call call(Process, [a:lines])
      else
        call CocAction('runCommand', 'fzf-preview-callback.' . Process, [a:lines])
      endif
    elseif type(Process) == v:t_func
      call Process(a:lines)
    endif
  endif
endfunction
