function! fzf_preview#remote#resource#todo_comments#get() abort
  lua vim.g.fzf_preview_todo_keywords = vim.fn.keys((require('todo-comments.config').keywords))
  return g:fzf_preview_todo_keywords
endfunction
