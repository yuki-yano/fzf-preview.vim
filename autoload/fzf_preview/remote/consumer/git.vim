function! fzf_preview#remote#consumer#git#add(file) abort
  call system('git add ' . a:file)
  if v:shell_error
    echomsg 'Failed: git add ' . a:file
  endif
endfunction

function! fzf_preview#remote#consumer#git#reset(file, option) abort
  if a:option !=# ''
    let command = 'git reset ' . a:option . ' ' . a:file
  else
    let command = 'git reset ' . a:file
  endif

  call system(command)

  if v:shell_error
    echomsg 'Failed: ' . command
  endif
endfunction

function! fzf_preview#remote#consumer#git#patch(file) abort
  if has('nvim') && exists(':Gina') == 2
    execute 'Gina patch ' . a:file
    return
  elseif exists(':Git') != 0
    execute 'tabedit ' . a:file . ' | Git diff'
    return
  endif

  echoerr 'Fugitive and Gina not installed'
endfunction

function! fzf_preview#remote#consumer#git#commit(option) abort
  if match(a:option, '--fixup') != -1
    echomsg system('git commit ' . a:option)
    return
  elseif has('nvim') && exists(':Gina') == 2
    Gina diff --cached --opener=vsplit
    execute 'Gina commit ' . a:option
    return
  elseif exists(':Git') == 2
    Git diff --cached
    execute 'Git commit ' . a:option
    return
  endif

  echoerr 'Fugitive and Gina not installed'
endfunction

function! fzf_preview#remote#consumer#git#checkout(branch_or_file) abort
  if has('nvim') && exists(':Gina') == 2
    execute 'Gina checkout ' . a:branch_or_file
    return
  elseif exists(':Git') == 2
    execute 'Git checkout ' . a:branch_or_file
    return
  else
    call system('git checkout ' . a:branch_or_file)
    if v:shell_error
      echomsg 'Failed: git checkout ' . a:branch_or_file
    endif
  endif
endfunction

function! fzf_preview#remote#consumer#git#create_branch() abort
  let branch_name = input('Branch name: ')
  if branch_name !=# ''
    echomsg system('git checkout -b ' . branch_name)
  endif
endfunction

function! fzf_preview#remote#consumer#git#diff(branch, ...) abort
  let branch2 = get(a:, 1, '')

  " NOTE: Gina can not handle two branches
  if has('nvim') && exists(':Gina') == 2
    execute 'silent Gina diff ' . a:branch . '..' . branch2
    echomsg 'git diff ' . a:branch . '..' . branch2
    return
  elseif exists(':Git') == 2
    execute 'silent Git diff ' . a:branch . '..' . branch2
    echomsg 'git diff ' . a:branch . '..' . branch2
    return
  endif

  echoerr 'Fugitive and Gina not installed'
endfunction

function! fzf_preview#remote#consumer#git#show(name_or_hash) abort
  if has('nvim') && exists(':Gina') == 2
    execute 'Gina show ' . a:name_or_hash
    return
  elseif exists(':Git') == 2
    execute 'Git show ' . a:name_or_hash
    return
  endif

  echoerr 'Fugitive and Gina not installed'
endfunction

function! fzf_preview#remote#consumer#git#merge(branch, option) abort
  if has('nvim') && exists(':Gina') == 2
    execute 'Gina merge ' . a:option . ' ' . a:branch
    return
  elseif exists(':Git') == 2
    execute 'Git merge ' . a:option . ' ' . a:branch
    return
  endif

  echoerr 'Fugitive and Gina not installed'
endfunction

function! fzf_preview#remote#consumer#git#rebase(branch) abort
  if has('nvim') && exists(':Gina') == 2
    execute 'Gina rebase ' . a:branch
    return
  elseif exists(':Git') == 2
    execute 'Git rebase ' . a:branch
    return
  endif

  echoerr 'Fugitive and Gina not installed'
endfunction

function! fzf_preview#remote#consumer#git#rebase_interactive(branch_or_hash) abort
  if exists(':Git') == 2
    execute 'Git rebase --interactive ' . a:branch_or_hash
    return
  endif

  echoerr 'Fugitive not installed'
endfunction

function! fzf_preview#remote#consumer#git#push(option) abort
  if has('nvim') && exists(':Gina') == 2
    execute 'Gina push ' . a:option
    return
  elseif exists(':Git') == 2
    execute 'Git push ' . a:option
    return
  else
    echomsg system('git push ' . a:option)
    if v:shell_error
      echomsg 'Failed: git push ' . a:option
    endif
  endif
endfunction

function! fzf_preview#remote#consumer#git#fetch() abort
  if has('nvim') && exists(':Gina') == 2
    execute 'Gina fetch'
    return
  elseif exists(':Git') == 2
    execute 'Git fetch'
    return
  else
    echomsg system('git fetch')
    if v:shell_error
      echomsg 'Failed: git fetch'
    endif
  endif
endfunction

function! fzf_preview#remote#consumer#git#delete_branch(branch, option) abort
  if has('nvim') && exists(':Gina') == 2
    execute 'Gina branch --delete ' . a:option . ' ' . a:branch
    return
  elseif exists(':Git') == 2
    execute 'Git branch --delete ' . a:option . ' ' . a:branch
    return
  else
    echomsg system('git branch --delete ' . a:option . ' ' . a:branch)
    if v:shell_error
      echomsg 'Failed: git branch --delete ' . a:option . ' ' . a:branch
    endif
  endif
endfunction

function! fzf_preview#remote#consumer#git#rename_branch(src) abort
  let dest = input('Branch name: ')
  if dest !=# ''
    let command = 'git branch -m ' . a:src . ' ' . dest
    echo system(command)

    if v:shell_error
      echomsg 'Failed: ' . command
    endif
  endif
endfunction

function! fzf_preview#remote#consumer#git#stash_apply(stash) abort
  let command = 'git stash apply ' . a:stash
  echo system(command)

  if v:shell_error
    echomsg 'Failed: ' . command
  endif
endfunction

function! fzf_preview#remote#consumer#git#stash_pop(stash) abort
  let command = 'git stash pop ' . a:stash
  echo system(command)

  if v:shell_error
    echomsg 'Failed: ' . command
  endif
endfunction

function! fzf_preview#remote#consumer#git#stash_drop(stash) abort
  let command = 'git stash drop ' . a:stash
  echo system(command)

  if v:shell_error
    echomsg 'Failed: ' . command
  endif
endfunction

function! fzf_preview#remote#consumer#git#stash_create() abort
  let message = input('Message: ')
  if  message !=# ''
    let command = 'git stash save "' . message . '"'
  else
    let command = 'git stash save'
  endif

  echo system(command)

  if v:shell_error
    echomsg 'Failed: ' . command
  endif
endfunction

function! fzf_preview#remote#consumer#git#pull() abort
  if has('nvim') && exists(':Gina') == 2
    execute 'Gina pull'
    return
  elseif exists(':Git') == 2
    execute 'Git pull'
    return
  else
    echomsg system('git pull')
    if v:shell_error
      echomsg 'Failed: git pull'
    endif
  endif
endfunction

function! fzf_preview#remote#consumer#git#yank(branch) abort
  let hash = system('git rev-parse ' . a:branch)
  call fzf_preview#remote#consumer#register#set(hash, 'v')
  echomsg 'yanked ' a:branch . ' branch hash: ' . hash
endfunction
