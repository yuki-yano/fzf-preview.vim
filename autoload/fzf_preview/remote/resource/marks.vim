function! fzf_preview#remote#resource#marks#get() abort
  let splitted_project_path = split(fzf_preview#remote#util#project_root(), '/')

  let chars = [
  \ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  \ 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  \ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  \ 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  \ ]

  let bufnr_and_lnum_list = map(map(copy(chars), {
  \ _, char -> getpos("'" . char)
  \ }), {
  \ _, pos -> { 'bufnr': pos[0] == 0 ? bufnr('%') : pos[0], 'lnum': pos[1] }
  \ })
  call filter(bufnr_and_lnum_list, { _, bufnr_and_lnum -> bufnr_and_lnum['lnum'] != 0 })

  let result = fzf_preview#remote#util#bufnr_and_lnum_to_resource(bufnr_and_lnum_list, splitted_project_path)
  return result
endfunction
