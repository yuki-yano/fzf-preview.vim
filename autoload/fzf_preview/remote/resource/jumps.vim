function! fzf_preview#remote#resource#jumps#get() abort
  let splited_project_path = split(fzf_preview#remote#util#project_root(), '/')
  let bufnr_and_lnum_list = map(copy(getjumplist()[0]), {
  \ _, jump -> { 'bufnr': jump['bufnr'], 'lnum': jump['lnum'] }
  \ })

  let result = fzf_preview#remote#util#bufnr_and_lnum_to_lines(bufnr_and_lnum_list, splited_project_path)

  call reverse(result)
  return result
endfunction
