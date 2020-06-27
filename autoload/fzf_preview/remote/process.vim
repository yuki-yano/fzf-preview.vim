function! fzf_preview#remote#process#get_open_file_processes() abort
  let processes = FzfPreviewGetDefaultProcessor('open-file')
  let processes[''] = processes['enter']
  call remove(processes, 'enter')

  return processes
endfunction
