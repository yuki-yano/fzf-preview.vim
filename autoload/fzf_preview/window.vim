scriptencoding utf-8

let s:fzf_preview_last_queries = {}

function! fzf_preview#window#float_or_normal_layout() abort
  return g:fzf_preview_use_floating_window ?
  \ 'call fzf_preview#window#create_centered_floating_window()' :
  \ g:fzf_preview_layout
endfunction

" Ref: https://github.com/Blacksuan19/init.nvim
function! fzf_preview#window#create_centered_floating_window() abort
    let width = float2nr(&columns * g:fzf_preview_floating_window_rate)
    let height = float2nr(&lines * g:fzf_preview_floating_window_rate)
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

    setlocal filetype=fzf
    setlocal nocursorcolumn
    execute 'set winblend=' . g:fzf_preview_floating_window_winblend

    augroup fzf_preview_floating_window
      autocmd FileType fzf call s:set_fzf_last_query()
      autocmd WinLeave <buffer> silent! execute 'bdelete! ' . s:f_buf . ' ' . s:b_buf
    augroup END
endfunction

function! fzf_preview#window#get_last_query(func_name) abort
  if has_key(s:fzf_preview_last_queries, a:func_name)
    return s:fzf_preview_last_queries[a:func_name]
  else
    return ''
  endif
endfunction

function! fzf_preview#window#set_resource_func_name(func_name) abort
  let s:resource_func_name = a:func_name
endfunction

function! s:set_fzf_last_query(...) abort
  if &filetype ==# 'fzf'
    let matches = matchlist(getline('.'), '^\w\+\>.\(\(\w\|\s\|''\)\+\)')
    if len(matches) > 0
      let query = substitute(substitute(matches[1], '\s\+$', '', ''), '^\s\+', '', '')
      if strlen(query) > 0
        let s:fzf_preview_last_queries[s:resource_func_name] = query
      endif
    endif

    call timer_start(50, function('s:set_fzf_last_query'))
  endif
endfunction
