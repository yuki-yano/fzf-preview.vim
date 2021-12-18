let s:references = {}
let s:definition = {}
let s:type_definition = {}
let s:implementation = {}
let s:code_action = {}

function! fzf_preview#remote#resource#vim_lsp#servers(method) abort
  return filter(lsp#get_allowed_servers(), 'lsp#capabilities#has_' . a:method . '_provider(v:val)')
endfunction

function! fzf_preview#remote#resource#vim_lsp#request_references(servers) abort
  let s:references = {}

  let command_id = lsp#_new_command()
  let ctx = {
  \ 'counter': len(a:servers),
  \ 'list':[],
  \ 'last_command_id': command_id,
  \ 'mods': '',
  \ 'in_preview': 0,
  \ 'jump_if_one': 0,
  \ }

  let params = {
  \ 'textDocument': lsp#get_text_document_identifier(),
  \ 'position': lsp#get_position(),
  \ 'context': {'includeDeclaration': v:false},
  \ }

  for server in a:servers
    call lsp#send_request(server, {
    \ 'method': 'textDocument/references',
    \ 'params': params,
    \ 'on_notification': function('s:handle_references', [ctx, server, 'references']),
    \ })
  endfor
endfunction

function! fzf_preview#remote#resource#vim_lsp#request_definition(servers) abort
  let s:definition = {}

  let command_id = lsp#_new_command()
  let ctx = {
  \ 'counter': len(a:servers),
  \ 'list':[],
  \ 'last_command_id': command_id,
  \ 'mods': '',
  \ 'in_preview': 0,
  \ 'jump_if_one': 0,
  \ }

  let params = {
  \ 'textDocument': lsp#get_text_document_identifier(),
  \ 'position': lsp#get_position(),
  \ }

  for server in a:servers
    call lsp#send_request(server, {
    \ 'method': 'textDocument/definition',
    \ 'params': params,
    \ 'on_notification': function('s:handle_definition', [ctx, server, 'definition']),
    \ })
  endfor
endfunction

function! fzf_preview#remote#resource#vim_lsp#request_type_definition(servers) abort
  let s:type_definition = {}

  let command_id = lsp#_new_command()
  let ctx = {
  \ 'counter': len(a:servers),
  \ 'list':[],
  \ 'last_command_id': command_id,
  \ 'mods': '',
  \ 'in_preview': 0,
  \ 'jump_if_one': 0,
  \ }

  let params = {
  \ 'textDocument': lsp#get_text_document_identifier(),
  \ 'position': lsp#get_position(),
  \ }

  for server in a:servers
    call lsp#send_request(server, {
    \ 'method': 'textDocument/typeDefinition',
    \ 'params': params,
    \ 'on_notification': function('s:handle_type_definition', [ctx, server, 'typeDefinition']),
    \ })
  endfor
endfunction

function! fzf_preview#remote#resource#vim_lsp#request_implementation(servers) abort
  let s:implementation = {}

  let command_id = lsp#_new_command()
  let ctx = {
  \ 'counter': len(a:servers),
  \ 'list':[],
  \ 'last_command_id': command_id,
  \ 'mods': '',
  \ 'in_preview': 0,
  \ 'jump_if_one': 0,
  \ }

  let params = {
  \ 'textDocument': lsp#get_text_document_identifier(),
  \ 'position': lsp#get_position(),
  \ }

  for server in a:servers
    call lsp#send_request(server, {
    \ 'method': 'textDocument/implementation',
    \ 'params': params,
    \ 'on_notification': function('s:handle_implementation', [ctx, server, 'implementation']),
    \ })
  endfor
endfunction

function! fzf_preview#remote#resource#vim_lsp#request_code_action(servers) abort
  let s:code_action = {}

  let command_id = lsp#_new_command()
  let ctx = {}

  let params = {
  \ 'textDocument': lsp#get_text_document_identifier(),
  \ 'position': lsp#get_position(),
  \ 'context': {'includeDeclaration': v:false},
  \ }

  let bufnr = bufnr('%')

  for server in a:servers
    let diagnostic = lsp#internal#diagnostics#under_cursor#get_diagnostic({'server': server})
    call lsp#send_request(server, {
    \ 'method': 'textDocument/codeAction',
    \ 'params': {
    \   'textDocument': lsp#get_text_document_identifier(),
    \   'range': lsp#utils#range#_get_current_line_range(),
    \   'context': {
    \     'diagnostics' : empty(diagnostic) ? [] : [diagnostic],
    \     'only': ['', 'quickfix', 'refactor', 'refactor.extract', 'refactor.inline', 'refactor.rewrite', 'source', 'source.organizeImports'],
    \   },
    \ },
    \ 'sync': v:false,
    \ 'on_notification': function('s:handle_code_action', [ctx, server, command_id, bufnr]),
    \ })
  endfor
endfunction

function! fzf_preview#remote#resource#vim_lsp#fetch_references() abort
  return s:references
endfunction

function! fzf_preview#remote#resource#vim_lsp#fetch_definition() abort
  return s:definition
endfunction

function! fzf_preview#remote#resource#vim_lsp#fetch_type_definition() abort
  return s:type_definition
endfunction

function! fzf_preview#remote#resource#vim_lsp#fetch_implementation() abort
  return s:implementation
endfunction

function! fzf_preview#remote#resource#vim_lsp#fetch_code_action() abort
  return s:code_action
endfunction

function! s:handle_references(ctx, server, type, data) abort
  let s:references[a:data['server_name']] = a:data['response']['result']
endfunction

function! s:handle_definition(ctx, server, type, data) abort
  let s:definition[a:data['server_name']] = a:data['response']['result']
endfunction

function! s:handle_type_definition(ctx, server, type, data) abort
  let s:type_definition[a:data['server_name']] = a:data['response']['result']
endfunction

function! s:handle_implementation(ctx, server, type, data) abort
  let s:implementation[a:data['server_name']] = a:data['response']['result']
endfunction

function! s:handle_code_action(ctx, server, command_id, bufnr, data) abort
  let s:code_action[a:data['server_name']] = a:data['response']['result']
endfunction
