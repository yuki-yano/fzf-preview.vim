function! fzf_preview#remote#exec_fzf#exec(command, env) abort
  if a:env ==# 'remote'
    execute a:command
  elseif a:env ==# 'coc'
    let command_name = substitute(a:command, '^FzfPreview', 'fzf-preview.', '')
    call CocAction('runCommand', command_name)
  endif
endfunction
