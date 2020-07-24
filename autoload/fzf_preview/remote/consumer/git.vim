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

function! fzf_preview#remote#consumer#git#checkout(branch_or_file) abort
  call system('git checkout ' . a:branch_or_file)
  if v:shell_error
    echomsg 'Failed: git checkout ' . a:branch_or_file
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

function! fzf_preview#remote#consumer#git#diff(branch, ...) abort
  let branch2 = get(a:, 1, '')

  if has('nvim') && exists(':Gina') == 2
    execute 'silent Gina diff ' . a:branch . ' ' . branch2
    echomsg 'git diff ' . a:branch . ' ' . branch2
    return
  elseif exists(':G') == 2
    execute 'silent G diff ' . a:branch . ' ' . branch2
    echomsg 'git diff ' . a:branch . ' ' . branch2
    return
  endif

  echoerr 'Fugitive and Gina not installed'
endfunction

function! fzf_preview#remote#consumer#git#branch_yank(branch) abort
  let hash = system('git rev-parse ' . a:branch)
  call fzf_preview#remote#consumer#register#set(hash, 'v')
  echomsg 'yanked ' a:branch . ' branch hash: ' . hash
endfunction
