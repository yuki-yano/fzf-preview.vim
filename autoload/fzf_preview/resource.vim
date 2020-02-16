function! fzf_preview#resource#project_files() abort
  if !fzf_preview#util#is_git_directory()
    return []
  endif

  let files = systemlist(g:fzf_preview_filelist_command)
  return fzf_preview#converter#convert_for_fzf(files)
endfunction

function! fzf_preview#resource#git_files() abort
  if !fzf_preview#util#is_git_directory()
    return []
  endif

  let files = filter(systemlist(g:fzf_preview_git_files_command), 'filereadable(v:val)')
  return fzf_preview#converter#convert_for_fzf(files)
endfunction

function! fzf_preview#resource#directory_files() abort
  let files = systemlist(g:fzf_preview_directory_files_command)
  return fzf_preview#converter#convert_for_fzf(files)
endfunction

function! fzf_preview#resource#git_status() abort
  if !fzf_preview#util#is_git_directory()
    return
  endif

  let list = systemlist(g:fzf_preview_git_status_command)
  return list
endfunction

function! fzf_preview#resource#buffers() abort
  let list = filter(range(1, bufnr('$')),
  \ "bufexists(v:val) && buflisted(v:val) && filereadable(expand('#' . v:val . ':p'))"
  \ )
  let buffers = map(list, 'bufname(v:val)')
  return fzf_preview#converter#convert_for_fzf(buffers)
endfunction

function! fzf_preview#resource#project_oldfiles() abort
  if !fzf_preview#util#is_git_directory()
    return []
  endif

  let copyfiles = deepcopy(v:oldfiles, 1)
  call filter(copyfiles, { _, file -> file !=# expand('%:p') })
  return fzf_preview#converter#convert_for_fzf(s:filter_history_file_to_project_file(copyfiles))
endfunction

function! fzf_preview#resource#project_mrufiles() abort
  if !fzf_preview#util#is_git_directory()
    return []
  endif

  let files = readfile(g:neomru#file_mru_path)
  call remove(files, 0)
  call filter(files, { _, file -> file !=# expand('%:p') })
  return fzf_preview#converter#convert_for_fzf(s:filter_history_file_to_project_file(files))
endfunction

function! fzf_preview#resource#oldfiles() abort
  let copyfiles = deepcopy(v:oldfiles, 1)
  let files = filter(copyfiles, 'filereadable(v:val)')

  let files = map(files, "fnamemodify(v:val, ':.')")
  return fzf_preview#converter#convert_for_fzf(files)
endfunction

function! fzf_preview#resource#mrufiles() abort
  let files = readfile(g:neomru#file_mru_path)
  call remove(files, 0)
  let files = filter(files, 'filereadable(v:val)')

  let files = map(files, "fnamemodify(v:val, ':.')")
  return fzf_preview#converter#convert_for_fzf(files)
endfunction

function! fzf_preview#resource#quickfix_or_locationlist(type) abort
  let lines = s:get_quickfix_or_locationlist_lines(a:type)

  if !empty(filter(lines, { _, line -> line !=# '' }))
    let matches = map(lines, { _, line -> matchlist(line, '^\([^|]*\)|\(\(\d\+\)\( col \(\d\+\)\)\?[^|]*\)\?|\(.*\)') })
    return fzf_preview#converter#convert_for_fzf(map(matches, { _, m ->
    \ m[3] !=# '' ?
    \   m[1] . ':' . m[3] . ':' . m[6] :
    \   m[1]
    \ }), 1)
  else
    return []
  endif
endfunction

function! fzf_preview#resource#grep(args) abort
  return  fzf_preview#converter#convert_for_fzf(systemlist(fzf_preview#command#grep_command(a:args)), 1)
endfunction

function! fzf_preview#resource#buffer_tags() abort
  if !filereadable(expand('%'))
    return []
  endif

  let lines = systemlist(fzf_preview#command#buffer_tags_command(expand('%')))
  let matches = map(lines, { _, line -> matchlist(line, '^\([^\t]\+\)\t\(\S\+\)\t\(\d\+\);"\t\(.\+\)') })
  let lists = map(sort(matches, { a, b -> a[3] - b[3] }), { _, m -> [m[3], m[1], m[4]] })
  return map(fzf_preview#util#align_lists(lists), { _, v -> join(v, '  ') })
endfunction

function! fzf_preview#resource#jumptoline() abort
  return jumptoline#winnrlist(-1, '') + [g:jumptoline#new_window, g:jumptoline#new_tabpage]
endfunction

function! fzf_preview#resource#bookmarks() abort
  return fzf_preview#converter#convert_for_fzf(filter(map(bm#location_list(), { _, b -> s:bookmarks_format_line(b) }), { _, b -> b !=# '' }), 1)
endfunction

function! fzf_preview#resource#files_from_resources(resources) abort
  let resource_map = {
  \ 'project': function('fzf_preview#resource#project_files'),
  \ 'git': function('fzf_preview#resource#git_files'),
  \ 'directory': function('fzf_preview#resource#directory_files'),
  \ 'buffer': function('fzf_preview#resource#buffers'),
  \ 'project_old': function('fzf_preview#resource#project_oldfiles'),
  \ 'project_mru': function('fzf_preview#resource#project_mrufiles'),
  \ 'old': function('fzf_preview#resource#oldfiles'),
  \ 'mru': function('fzf_preview#resource#mrufiles'),
  \ }

  let files = []
  for resource in a:resources
    let files = files + resource_map[resource]()
  endfor

  return fzf_preview#util#uniq(files)
endfunction

function! s:filter_history_file_to_project_file(files) abort
  let readable_filelist = filter(a:files, 'filereadable(v:val)')
  let splited_project_path = split(fzf_preview#util#project_root(), '/')

  let project_files = []
  for readable_file in readable_filelist
    if fzf_preview#util#is_project_file(readable_file, splited_project_path)
      let project_files = add(project_files, readable_file)
    endif
  endfor

  return map(project_files, "fnamemodify(v:val, ':.')")
endfunction

function! s:get_quickfix_or_locationlist_lines(type) abort
  let qf_or_loc_lists = s:get_quickfix_or_loclist(a:type)

  if len(qf_or_loc_lists) != 0
    return len(qf_or_loc_lists) > 0 ? getbufline(qf_or_loc_lists[0]['bufnr'], 1, '$') : []
  endif

  return s:open_process_with_qf_and_close(a:type, { type -> s:get_quickfix_or_locationlist_lines(type) })
endfunction

function! s:get_quickfix_or_loclist(type) abort
  return filter(getwininfo(), { _, w -> w['tabnr'] == tabpagenr() && getwinvar(w['winnr'], '&filetype') ==# 'qf' && w[a:type]})
endfunction

function! s:open_process_with_qf_and_close(type, F) abort
  let winid = win_getid()

  if a:type ==# 'quickfix'
    copen
  elseif a:type ==# 'loclist'
    try
      lopen
    catch
      return []
    endtry
  else
    return []
  endif

  call win_gotoid(winid)

  let result = a:F(a:type)

  if a:type ==# 'quickfix'
    cclose
  elseif a:type ==# 'loclist'
    lclose
  endif

  return result
endfunction

function! s:bookmarks_format_line(line) abort
  let line = split(a:line, ':')
  let filename = fnamemodify(line[0], ':.')
  if !filereadable(filename)
    return ''
  endif

  let line_number = line[1]
  let text = line[2]

  if text ==# 'Annotation'
    let comment = line[3]
  else
    let text = join(line[2:], ':')
  endif

  if text !=# 'Annotation'
    return filename . ':' . line_number . ':' . text
  else
    return filename . ':' . line_number . ':' . text . ':' . comment
  endif
endfunction
