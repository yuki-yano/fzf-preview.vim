function! fzf_preview#remote#consumer#git#patch(file) abort
  if exists(':Gdiff') != 0
    execute 'silent tabedit ' . a:file . ' | silent Gdiff'
    return
  elseif exists(':Gina') == 2
    execute 'silent Gina patch ' . a:file
    return
  endif

  echoerr 'Fugitive and Gina not installed'
endfunction
