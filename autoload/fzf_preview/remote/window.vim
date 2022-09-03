" TODO: Command other than fzf-preview saves wrong resumes
let s:resource_command_name = ''

function! fzf_preview#remote#window#set_resource_command_name(command_name) abort
  if s:resource_command_name !=# a:command_name
    let s:resource_command_name = a:command_name
  endif
  call timer_start(10, { -> fzf_preview#remote#window#set_status_line(v:true) })
endfunction

function! fzf_preview#remote#window#get_resource_command_name() abort
  return substitute(s:resource_command_name, '^FzfPreview', '', '')
endfunction

function! fzf_preview#remote#window#set_status_line(updated_command_name) abort
  if !g:fzf_preview_update_statusline
    return
  endif

  if &laststatus != 3
    return
  endif

  if a:updated_command_name
    setlocal statusline=%#Identifier#\ >\ fzf-preview\ %{fzf_preview#remote#window#get_resource_command_name()}
  else
    setlocal statusline=\ 
  endif
endfunction

function! fzf_preview#remote#window#set_fzf_last_query(...) abort
  if &filetype ==# 'fzf' && s:resource_command_name !=# ''
    let matches = matchlist(getline('.'), '\w\+\>.\(\(\w\|\s\|''\)\+\)')
    if len(matches) > 0
      let query = substitute(substitute(matches[1], '\s\+$', '', ''), '^\s\+', '', '')

      if get(g:, 'fzf_preview_has_remote', v:false)
        call FzfPreviewDispatchResumeQuery(s:resource_command_name, query)
      endif

      if get(g:, 'fzf_preview_has_coc', v:false)
        call CocAction('runCommand', 'fzf-preview-function.DispatchResumeQuery', [s:resource_command_name, query])
      endif

      if get(g:, 'fzf_preview_has_rpc', v:false)
        call fzf_preview#rpc#dispatch_resume_query(s:resource_command_name, query)
      endif
    endif

    call timer_start(50, function('fzf_preview#remote#window#set_fzf_last_query'))
  endif
endfunction
