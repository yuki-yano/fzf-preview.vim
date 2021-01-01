function! fzf_preview#remote#resource#vim_command#commands() abort
  return map(getcompletion('', 'command'), {_, command -> {
  \   'name': command,
  \   'number': v:null,
  \ }})
endfunction

function! fzf_preview#remote#resource#vim_command#history() abort
  let commands = filter(map(range(1, max([0, histnr(':')])), {_, index -> histget(':', index)}), {_, command -> command !=# ''})
  return map(reverse(commands), {index, command -> {
  \   'name': command,
  \   'number': index + 1,
  \ }})
endfunction

function! fzf_preview#remote#resource#vim_command#exec(command) abort
  echo a:command
  execute a:command
endfunction

function! fzf_preview#remote#resource#vim_command#edit(command) abort
  call histadd(':', a:command)
  redraw
  call feedkeys(":\<Up>", 'n')
endfunction
