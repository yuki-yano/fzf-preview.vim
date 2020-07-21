function! fzf_preview#remote#mr#append(path, cache_path) abort
  let files = s:get_files_with_create_directory(a:cache_path)

  call insert(files, a:path)
  call writefile(fzf_preview#remote#util#uniq(files), a:cache_path)
endfunction

function! fzf_preview#remote#mr#mru_file_path() abort
  return g:fzf_preview_cache_directory . '/mru'
endfunction

function! fzf_preview#remote#mr#mrw_file_path() abort
  return g:fzf_preview_cache_directory . '/mrw'
endfunction

function! s:get_files_with_create_directory(cache_path) abort
  if !isdirectory(g:fzf_preview_cache_directory)
    call mkdir(g:fzf_preview_cache_directory, 'p')
  endif

  try
    let files = readfile(a:cache_path)
  catch
    let files = []
  endtry

  return files
endfunction
