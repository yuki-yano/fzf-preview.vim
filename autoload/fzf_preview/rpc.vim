let s:Promise = vital#fzf_preview#import('Async.Promise')
let s:Server = fzf_preview#rpc#server#import()

let s:root_dir = expand('<sfile>:h:h:h')

let s:state = {
\   'id': -1,
\   'sources': {},
\   'server': v:null
\ }

let default_processes = {}

call s:Promise.on_unhandled_rejection({ err -> fzf_preview#rpc#log('[ERROR]', err) })

function! fzf_preview#rpc#initialize() abort
  if !filereadable(printf('%s/lib/rpc.js', s:root_dir))
    return
  endif

  call s:start()

  function! s:initialize_default_processes(response) abort
    let s:default_processes = a:response

    let g:fzf_preview_has_rpc = v:true
    silent doautocmd User fzf_preview#initialized
    silent doautocmd User fzf_preview#rpc#initialized
  endfunction

  call s:state.server.request('getDefaultProcesses', {}).then({ response -> s:initialize_default_processes(response) })
endfunction

function! fzf_preview#rpc#restart() abort
  if !empty(s:state.server)
    call s:state.server.stop()
  endif

  let s:state.server = v:null
  call s:start()
endfunction

function! fzf_preview#rpc#get_default_processes(name) abort
  return s:default_processes[a:name]
endfunction

function! fzf_preview#rpc#command(command, ...) abort
  call s:start()
  if a:0 == 0
    call s:state.server.request('execCommand', { 'commandName': a:command })
  else
    call s:state.server.request('execCommand', { 'commandName': a:command, 'args': a:1 })
  endif
endfunction

function! fzf_preview#rpc#rpc_handler(lines) abort
  call feedkeys('', 'x')
  call s:state.server.request('callProcess', { 'lines': a:lines })
endfunction

function! fzf_preview#rpc#exec_process_callback(process_name, lines) abort
  call s:state.server.request('execProcessCallback', { 'processName': a:process_name, 'lines': a:lines })
endfunction

function! fzf_preview#rpc#dispatch_resume_query(command_name, query) abort
  call s:state.server.request('dispatchResumeQuery', { 'commandName': a:command_name, 'query': a:query })
endfunction

function! fzf_preview#rpc#log(...) abort
  if exists('g:fzf_preview_debug')
    call writefile([join([strftime('%H:%M:%S')] + a:000, "\t")], '/tmp/fzf_preview_rpc.log', 'a')
  endif
endfunction

function! s:start() abort
  try
    if !empty(s:state.server)
      return s:state.server
    endif
    let s:state.server = s:Server.new({ 'command': s:command() })
    " call s:state.server.rpc.job.events.on('stdout', { out -> fzf_preview#rpc#log('[STDOUT]', out) })
    call s:state.server.events.on('stderr', { err -> fzf_preview#rpc#log('[ERROR]', err) })
    call s:state.server.events.on('request', { request -> s:on_request(request) })
    call s:state.server.start()
    return s:state.server
  catch /.*/
    echomsg string({ 'exception': v:exception, 'throwpoint': v:throwpoint })
  endtry
endfunction

function! s:on_request(request) abort
  if a:request['method'] ==# 'execCommand'
    execute a:request['params']['command']
    call s:state.server.response(a:request['id'], { 'result': v:null })
  elseif a:request['method'] ==# 'execCall'
    let result = call(a:request['params']['fname'], a:request['params']['args'])
    call s:state.server.response(a:request['id'], { 'result': result })
  elseif a:request['method'] ==# 'getVar'
    let result = get(g:, a:request['params']['name'])
    call s:state.server.response(a:request['id'], { 'result': result })
  elseif a:request['method'] ==# 'getVvar'
    let result = get(v:, a:request['params']['name'])
    call s:state.server.response(a:request['id'], { 'result': result })
  endif
endfunction

function! s:command() abort
  return ['node', printf('%s/lib/rpc.js', s:root_dir)]
endfunction
