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
  if exists(':Gdiff') != 0
    execute 'silent tabedit ' . a:file . ' | silent Gdiff'
    return
  elseif exists(':Gina') == 2
    execute 'silent Gina patch ' . a:file
    return
  endif

  echoerr 'Fugitive and Gina not installed'
endfunction
