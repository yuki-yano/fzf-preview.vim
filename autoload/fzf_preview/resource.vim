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

  return fzf_preview#converter#convert_for_fzf(s:filter_history_file_to_project_file(v:oldfiles))
endfunction

function! fzf_preview#resource#project_mrufiles() abort
  if !fzf_preview#util#is_git_directory()
    return []
  endif

  let files = readfile(g:neomru#file_mru_path)
  call remove(files, 0)
  return fzf_preview#converter#convert_for_fzf(s:filter_history_file_to_project_file(files))
endfunction

function! fzf_preview#resource#oldfiles() abort
  let copyfiles = deepcopy(v:oldfiles, 1)
  let files = filter(copyfiles, 'filereadable(v:val)')

  let files = map(files, "fnamemodify(v:val, ':~')")
  return fzf_preview#converter#convert_for_fzf(files)
endfunction

function! fzf_preview#resource#mrufiles() abort
  let files = readfile(g:neomru#file_mru_path)
  call remove(files, 0)
  let files = filter(files, 'filereadable(v:val)')

  let files = map(files, "fnamemodify(v:val, ':.')")
  return fzf_preview#converter#convert_for_fzf(files)
endfunction

function! fzf_preview#resource#locationlist() abort
  let locationlist_lines = s:get_locationlist_lines()

  if !empty(locationlist_lines)
    let matches = map(locationlist_lines, { _, line -> matchlist(line, '^\([^|]*\)|\(\(\d\+\)\( col \(\d\+\)\)\?[^|]*\)\?|\(.*\)') })
    return map(matches, { _, m -> m[1] . ':' . m[3] . ':' . m[6] })
  else
    return []
  endif
endfunction

function! fzf_preview#resource#grep(args) abort
  return  fzf_preview#command#grep_command(a:args)
endfunction

function! fzf_preview#resource#jumptoline() abort
  return jumptoline#winnrlist(-1, '') + [g:jumptoline#new_window, g:jumptoline#new_tabpage]
endfunction

function! fzf_preview#resource#bookmarks() abort
  return filter(map(bm#location_list(), { _, b -> s:bookmarks_format_line(b) }), { _, b -> b !=# '' })
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

  let List = vital#fzf_preview#import('Data.List')
  return List.uniq(files)
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

function s:get_locationlist_lines() abort
  let locationlists = filter(getwininfo(), { _, w ->
    \ w['tabnr'] == tabpagenr() && getwinvar(w['winnr'], '&filetype') == 'qf' && w['loclist']})

  if len(locationlists) != 0
    return len(locationlists) > 0 ? getbufline(locationlists[0]['bufnr'], 1, '$') : []
  else
    let winid = win_getid()
    lopen
    call win_gotoid(winid)

    let locationlists = filter(getwininfo(), { _, w ->
      \ w['tabnr'] == tabpagenr() && getwinvar(w['winnr'], '&filetype') == 'qf' && w['loclist']})
    let lines = len(locationlists) > 0 ? getbufline(locationlists[0]['bufnr'], 1, '$') : []

    lclose
    return lines
 endif
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

