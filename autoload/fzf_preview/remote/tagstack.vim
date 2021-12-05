function! fzf_preview#remote#tagstack#push_tag_stack() abort
  let from = [bufnr('%'), line('.'), col('.'), 0]
  let tagname = expand('<cword>')
  let winid = win_getid()
  call settagstack(winid, {'items': [{'from': from, 'tagname': tagname}]}, 'a')
  call settagstack(winid, {'curidx': len(gettagstack(winid)['items']) + 1})
endfunction
