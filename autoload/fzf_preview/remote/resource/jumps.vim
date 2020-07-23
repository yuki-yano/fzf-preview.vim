function! fzf_preview#remote#resource#jumps#get() abort
  let splitted_project_path = split(fzf_preview#remote#util#project_root(), '/')
  let bufnr_and_lnum_list = map(copy(getjumplist()[0]), {
  \ _, jump -> { 'bufnr': jump['bufnr'], 'lnum': jump['lnum'] }
  \ })

  let result = fzf_preview#remote#util#bufnr_and_lnum_to_resource(bufnr_and_lnum_list, splitted_project_path)

  call reverse(result)
  return result
endfunction
