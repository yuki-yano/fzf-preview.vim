function! fzf_preview#command#file_list_command_options(console) abort
  let preview = g:fzf_preview_if_binary_command . ' && ' . g:fzf_binary_preview_command . ' || ' . g:fzf_preview_command
  return fzf_preview#command#get_command_options(a:console, preview)
endfunction

function! fzf_preview#command#get_common_command_options() abort
  let multi = '--multi'
  let reverse = '--reverse'
  let ansi = '--ansi'
  let bind = '--bind=' . g:fzf_preview_preview_key_bindings
  " alt-enter is workaround
  let color = g:fzf_preview_fzf_color_option !=# '' ? '--color=' . g:fzf_preview_fzf_color_option : ''
  let preview_window = g:fzf_preview_fzf_preview_window_option !=# '' ? '--preview-window="' . g:fzf_preview_fzf_preview_window_option . '"' : ''

  return join([multi, reverse, ansi, bind, color, preview_window], ' ')
endfunction

function! fzf_preview#command#get_command_options(console, preview, ...) abort
  if !exists('s:options')
    let s:options = fzf_preview#command#get_common_command_options()
  endif
  let optional = get(a:, 1, 0) !=# '' ? get(a:, 1, 0) : ''

  return join([s:options, s:get_uncommon_options(a:console, a:preview, optional)], ' ')
endfunction

function! fzf_preview#command#set_command_options(options) abort
  let s:options = a:options
endfunction

function! fzf_preview#command#reset_command_options() abort
  if exists('s:options')
    unlet s:options
  endif
endfunction

function! fzf_preview#command#grep_command(args) abort
  if len(a:args) >= 1
    return g:fzf_preview_grep_cmd . ' ' . a:args
  else
    return g:fzf_preview_grep_cmd . ' .'
  end
endfunction

function! fzf_preview#command#buffer_tags_command(file) abort
  return 'ctags -f - --sort=yes --excmd=number ' . a:file
endfunction

function! s:get_uncommon_options(console, preview, optional) abort
  let processors = copy(fzf_preview#resource_processor#get_processors())
  call remove(processors, '')
  let expect_keys = keys(processors)

  let expect = len(expect_keys) >= 1 ? '--expect=' . join(expect_keys, ',') : '--expect="alt-enter"'
  let prompt = '--prompt="' . a:console . '> "'
  let preview = "--preview='" . a:preview . "'"

  return join([expect, prompt, preview, a:optional], ' ')
endfunction
