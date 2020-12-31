let s:JSON = vital#fzf_preview#import('VS.RPC.JSON')
let s:Server = {}

function! fzf_preview#rpc#server#import() abort
  return s:Server
endfunction

function! s:Server.new(args) abort
  let l:server = extend(deepcopy(s:Server), { 'cmd': a:args.command, 'rpc': s:JSON.new(), 'request_id': 0 })
  let l:server.events = l:server.rpc.events
  return l:server
endfunction

function! s:Server.start() abort
  return self.rpc.start({ 'cmd': self.cmd })
endfunction

function! s:Server.request(method, params) abort
  return self.rpc.request(self.id(), a:method, a:params)
endfunction

function! s:Server.response(id, params) abort
  return self.rpc.response(a:id, a:params)
endfunction

function! s:Server.id() abort
  let self.request_id += 1
  return self.request_id
endfunction
