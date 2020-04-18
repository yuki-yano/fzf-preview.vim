function! fzf_preview#mru#append(path) abort
  if !isdirectory(g:fzf_preview_cache_directory)
    call mkdir(g:fzf_preview_cache_directory, 'p')
  endif

  try
    let files = readfile(fzf_preview#mru#mru_file_path())
  catch
    let files = []
  endtry

  call insert(files, a:path)
  call writefile(fzf_preview#util#uniq(files), fzf_preview#mru#mru_file_path())
endfunction

function! fzf_preview#mru#mru_file_path() abort
  return g:fzf_preview_cache_directory . '/mru'
endfunction
