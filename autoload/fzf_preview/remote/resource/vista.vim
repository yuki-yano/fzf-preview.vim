function! fzf_preview#remote#resource#vista#ctags() abort
  let result = vista#executive#ctags#ProjectRun()
  let keys = keys(result)
  let source = []

  let index = 0
  while index < len(keys)
    let kind = keys[index]
    let values = result[kind]

    for value in values
      call add(source, { 'lineNumber': value['lnum'], 'kind': kind, 'text': value['text'], 'tagFile': value['tagfile'] })
    endfor

    let index = index + 1
  endwhile

  return source
endfunction

function! fzf_preview#remote#resource#vista#buffer_ctags() abort
  let result = vista#executive#ctags#Run(expand('%:p'))
  let keys = keys(result)
  let source = []

  let index = 0
  while index < len(keys)
    let kind = keys[index]
    let values = result[kind]

    for value in values
      call add(source, { 'lineNumber': value['lnum'], 'kind': kind, 'text': value['text'], 'line': getline(value['lnum']) })
    endfor

    let index = index + 1
  endwhile

  return source
endfunction
