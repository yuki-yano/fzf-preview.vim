function! fzf_preview#remote#consumer#git#add(file) abort
  call system('git add ' . a:file)
  if v:shell_error
    echomsg 'Failed: git add ' . a:file
  endif
endfunction

function! fzf_preview#remote#consumer#git#reset(file) abort
  call system('git reset ' . a:file)
  if v:shell_error
    echomsg 'Failed: git reset ' . a:file
  endif
endfunction

function! fzf_preview#remote#consumer#git#patch(file) abort
  if has('nvim') && exists(':Gina') == 2
    execute 'Gina patch ' . a:file
    return
  elseif exists(':Gdiff') != 0
    execute 'tabedit ' . a:file . ' | Gdiff'
    return
  endif

  echoerr 'Fugitive and Gina not installed'
endfunction
