function! fzf_preview#args#parse(args) abort
  let args = {
  \ 'processor': v:false,
  \ 'extra': []
  \ }

  for arg in a:args
    let matches = matchlist(arg, '^-processor=\(\(\w\|:\)\+\)$')
    if len(matches) >= 1
      let args['processor'] = matches[1]
    else
      call add(args['extra'], arg)
    endif
  endfor

  return args
endfunction

function! fzf_preview#args#complete_files_resources(lead, line, pos) abort
  return fzf_preview#args#complete_options(a:lead, a:line, a:pos) + ['project', 'git', 'directory', 'buffer', 'project_old', 'project_mru', 'old', 'mru']
endfunction

function! fzf_preview#args#complete_options(lead, line, pos) abort
  return ['-processor=']
endfunction

