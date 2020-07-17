function! fzf_preview#remote#resource#buffers#get_other_buffers() abort
  let list = filter(range(1, bufnr('$')),
  \ { _, bufnr -> bufexists(bufnr) && buflisted(bufnr) && filereadable(expand('#' . bufnr . ':p')) && bufnr != bufnr('%') && bufnr != bufnr('#')}
  \ )

  return map(list, { _, bufnr -> s:bufnr_to_bufinfo(bufnr) })
endfunction

function! fzf_preview#remote#resource#buffers#get_current_buffer() abort
  return s:bufnr_to_bufinfo(bufnr('%'))
endfunction

function! fzf_preview#remote#resource#buffers#get_alternate_buffer() abort
  return s:bufnr_to_bufinfo(bufnr('#'))
endfunction

function! fzf_preview#remote#resource#buffers#get() abort
  let list = filter(range(1, bufnr('$')),
  \ { _, bufnr -> bufexists(bufnr) && buflisted(bufnr) && filereadable(expand('#' . bufnr . ':p'))}
  \ )

  return map(list, { _, bufnr -> s:bufnr_to_bufinfo(bufnr) })
endfunction

function! s:bufnr_to_bufinfo(bufnr) abort
  let name = bufname(a:bufnr)
  let is_current = a:bufnr == bufnr('%')
  let is_alternate = a:bufnr == bufnr('#')
  let is_modified = getbufvar(a:bufnr, '&modified')

  return {
  \ 'fileName': name,
  \ 'bufnr': a:bufnr,
  \ 'isCurrent': is_current == 1 ? v:true : v:false,
  \ 'isAlternate': is_alternate == 1 ? v:true : v:false,
  \ 'isModified': is_modified == 1 ? v:true : v:false,
  \ }
endfunction
