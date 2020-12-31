function! fzf_preview#remote#process#get_default_processes(name, ...) abort
  let env = get(a:, 1, 'remote')

  if env ==# 'remote'
    return FzfPreviewGetDefaultProcesses(a:name)
  elseif env ==# 'coc'
    return CocAction('runCommand', 'fzf-preview.GetDefaultProcesses', [a:name])
  elseif env ==# 'rpc'
    return fzf_preview#rpc#get_default_processes(a:name)
  endif
endfunction
