function! fzf_preview#remote#exec_fzf#exec(command, env, ...) abort
  let session_token = get(a:, 1, '')

  if a:env ==# 'remote'
    if session_token !=# ''
      execute a:command . ' --session=' . session_token
    else
      execute a:command
    endif
  elseif a:env ==# 'coc'
    let command_name = substitute(a:command, '^FzfPreview', 'fzf-preview.', '')
    if session_token !=# ''
      execute 'CocCommand ' . command_name . ' --session=' . session_token
    else
      execute 'CocCommand ' . command_name
    endif
  endif
endfunction
