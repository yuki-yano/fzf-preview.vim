function! fzf_preview#remote#window#set_resource_command_name(command_name) abort
  let s:resource_command_name = a:command_name
endfunction

function! fzf_preview#remote#window#set_fzf_last_query(...) abort
  if &filetype ==# 'fzf'
    let matches = matchlist(getline('.'), '^\w\+\>.\(\(\w\|\s\|''\)\+\)')
    if len(matches) > 0
      let query = substitute(substitute(matches[1], '\s\+$', '', ''), '^\s\+', '', '')
      call FzfPreviewDispatchResumeQuery(s:resource_command_name, query)
    endif

    call timer_start(50, function('fzf_preview#remote#window#set_fzf_last_query'))
  endif
endfunction
