scriptencoding utf-8

function! fzf_preview#window#float_or_normal_layout() abort
  return g:fzf_preview_use_floating_window ?
  \ 'call fzf_preview#window#create_centered_floating_window()' :
  \ g:fzf_preview_layout
endfunction

" Ref: https://github.com/Blacksuan19/init.nvim
function! fzf_preview#window#create_centered_floating_window() abort
    let width = min([&columns - 4, max([80, &columns - 20])])
    let height = min([&lines - 4, max([20, &lines - 10])])
    let top = ((&lines - height) / 2) - 1
    let left = (&columns - width) / 2
    let opts = {'relative': 'editor', 'row': top, 'col': left, 'width': width, 'height': height, 'style': 'minimal'}

    let top = '╭' . repeat('─', width - 2) . '╮'
    let mid = '│' . repeat(' ', width - 2) . '│'
    let bot = '╰' . repeat('─', width - 2) . '╯'
    let lines = [top] + repeat([mid], height - 2) + [bot]
    let s:b_buf = nvim_create_buf(v:false, v:true)
    call nvim_buf_set_lines(s:b_buf, 0, -1, v:true, lines)
    call nvim_open_win(s:b_buf, v:true, opts)
    set winhl=Normal:Floating
    let opts.row += 1
    let opts.height -= 2
    let opts.col += 2
    let opts.width -= 4
    let s:f_buf = nvim_create_buf(v:false, v:true)
    call nvim_open_win(s:f_buf, v:true, opts)
    setlocal nocursorcolumn
    augroup fzf_preview_floating_window
      autocmd WinLeave <buffer> silent! execute 'bwipeout! ' . s:f_buf . ' ' . s:b_buf
    augroup END
endfunction
