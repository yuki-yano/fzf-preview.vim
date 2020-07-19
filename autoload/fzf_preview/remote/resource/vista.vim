function! fzf_preview#remote#resource#vista#ctags() abort
  let data = items(vista#executive#ctags#ProjectRun())
  let source = []

  for kind_and_infos in data
    let [kind, infos] = kind_and_infos

    for info in infos
      call add(source, { 'lineNumber': info['lnum'], 'kind': kind, 'text': info['text'], 'tagFile': info['tagfile'] })
    endfor
  endfor

  return source
endfunction

function! fzf_preview#remote#resource#vista#buffer_ctags() abort
  let data = items(vista#executive#ctags#Run(expand('%:p')))
  let source = []

  for kind_and_infos in data
    let [kind, infos] = kind_and_infos

    for info in infos
      call add(source, { 'lineNumber': info['lnum'], 'kind': kind, 'text': info['text'], 'line': getline(info['lnum']) })
    endfor
  endfor

  return source
endfunction
