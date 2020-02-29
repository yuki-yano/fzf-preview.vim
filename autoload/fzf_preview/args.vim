function! fzf_preview#args#parse(args) abort
  let types = [
  \ 'processors',
  \ 'add-fzf-arg',
  \ 'overwrite-fzf-args',
  \ 'resume',
  \ ]

  let args = {
  \ 'extra': [],
  \ }

  for type in types
    let args[type] = ''
  endfor

  for arg in a:args
    let if_match = v:false

    for type in types
      let matches = matchlist(arg, '^-' . type . '=\?\(\(\S\)\+\)\?$')
      if len(matches) >= 1
        if matches[1] ==# ''
          let args[type] = v:true
        else
          let args[type] = args[type] . ' ' . matches[1]
        endif
        let if_match = v:true
      endif
    endfor

    if !if_match
      call add(args['extra'], arg)
    endif
  endfor

  return args
endfunction

function! fzf_preview#args#complete_files_resources(lead, line, pos) abort
  return fzf_preview#args#complete_options(a:lead, a:line, a:pos) + ['project', 'git', 'directory', 'buffer', 'project_old', 'project_mru', 'old', 'mru']
endfunction

function! fzf_preview#args#complete_options(lead, line, pos) abort
  return ['-processors=']
endfunction
