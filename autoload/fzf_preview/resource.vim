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

function! fzf_preview#resource#directory_files(path) abort
  let files = systemlist(g:fzf_preview_directory_files_command . ' ' . a:path)

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
  let mru_files = readfile(fzf_preview#mr#mru_file_path())
  call filter(mru_files, { _, file -> file !=# expand('%:p') })

  let list = filter(range(1, bufnr('$')),
  \ { _, bufnr -> bufexists(bufnr) && buflisted(bufnr) && filereadable(expand('#' . bufnr . ':p'))}
  \ )
  let buffers = map(list, { _, buffer -> bufname(buffer) })

  let index_with_files = {}
  let ignored_files = []

  for buffer in copy(buffers)
    let index = 0
    for mru_file in copy(mru_files)
      if buffer ==# mru_file
        let index_with_files[index] = buffer
      else
        call add(ignored_files, buffer)
      endif
      let index += 1
    endfor
  endfor

  let sorted_buffers = fzf_preview#util#uniq(values(index_with_files) + (ignored_files))
  return fzf_preview#converter#convert_for_fzf(sorted_buffers)
endfunction

function! fzf_preview#resource#all_buffers() abort
  let buffers = []
  for bufinfo in copy(getbufinfo())
    let buffer = {
    \ 'name': fnamemodify(bufinfo['name'], ':.'),
    \ 'bufnr': bufinfo['bufnr'],
    \ }
    call add(buffers, buffer)
  endfor

  let buffers = map(copy(getbufinfo({ 'buflisted': 1 })),
  \ { _, buffer -> [buffer['bufnr'], fnamemodify(buffer['name'], ':.')] }
  \ )

  return map(copy(fzf_preview#util#align_lists(buffers)), { _, buffer -> join(buffer, '  ') })
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

  let files = readfile(fzf_preview#mr#mru_file_path())
  call filter(files, { _, file -> file !=# expand('%:p') })
  return fzf_preview#converter#convert_for_fzf(s:filter_history_file_to_project_file(files))
endfunction

function! fzf_preview#resource#project_mrwfiles() abort
  if !fzf_preview#util#is_git_directory()
    return []
  endif

  let files = readfile(fzf_preview#mr#mrw_file_path())
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
  let files = readfile(fzf_preview#mr#mru_file_path())
  let files = filter(files, 'filereadable(v:val)')

  let files = map(files, "fnamemodify(v:val, ':.')")
  return fzf_preview#converter#convert_for_fzf(files)
endfunction

function! fzf_preview#resource#mrwfiles() abort
  let files = readfile(fzf_preview#mr#mrw_file_path())
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

function! fzf_preview#resource#lines() abort
  if !filereadable(expand('%'))
    return []
  endif

  let lines = systemlist(fzf_preview#command#lines_command(expand('%')))
  return lines
endfunction

function! fzf_preview#resource#buffer_lines() abort
  let lines = []
  let bufnrs = filter(range(1, bufnr('$')), { _, i -> bufexists(i) && buflisted(i) && filereadable(expand('#' . i . ':p')) })

  for buffer in map(copy(bufnrs), { _, bufnr -> bufname(bufnr) })
    let linenum = 1
    for line in readfile(expand(buffer))
      call add(lines, join([buffer, linenum, line], ':'))
      let linenum = linenum + 1
    endfor
  endfor

  return fzf_preview#converter#convert_for_fzf(lines, 1)
endfunction

function! fzf_preview#resource#grep(args) abort
  return  fzf_preview#converter#convert_for_fzf(systemlist(fzf_preview#command#grep_command(a:args)), 1)
endfunction

function! fzf_preview#resource#ctags() abort
  let taginfos = s:read_tag_file()
  let lines = []

  for taginfo in taginfos
    call add(lines, join([taginfo['line'], taginfo['name'], taginfo['type'], taginfo['file']], ' '))
  endfor
  return lines
endfunction

function! fzf_preview#resource#buffer_tags() abort
  if !filereadable(expand('%'))
    return []
  endif

  let lines = systemlist(fzf_preview#command#buffer_tags_command(expand('%')))
  let matches = map(lines, { _, line -> matchlist(line, '^\([^\t]\+\)\t\(\S\+\)\t\(\d\+\);"\t\(.\+\)') })
  call filter(matches, {_, m -> !empty(m)})
  let lists = map(sort(matches, { a, b -> a[3] - b[3] }), { _, m -> [m[3], m[1], m[4]] })
  return map(fzf_preview#util#align_lists(lists), { _, v -> join(v, '  ') })
endfunction

function! fzf_preview#resource#jumps() abort
  let splited_project_path = split(fzf_preview#util#project_root(), '/')
  let bufnr_and_lnum_list = map(copy(getjumplist()[0]), {
  \ _, jump -> { 'bufnr': jump['bufnr'], 'lnum': jump['lnum'] }
  \ })

  let result = s:bufnr_and_lnum_to_lines(bufnr_and_lnum_list, splited_project_path)

  call reverse(result)
  return fzf_preview#converter#convert_for_fzf(result, 1)
endfunction

function! fzf_preview#resource#changes() abort
  if !filereadable(expand('%'))
    return []
  endif

  let lists = []
  let lnums = map(copy(getchangelist('%')[0]), { _, change -> change['lnum'] })
  for lnum in lnums
    let lines = getbufline(bufnr('%'), lnum)
    if len(lines) > 0
      call add(lists, [lnum, lines[0]])
    endif
  endfor
  call reverse(lists)
  let lists = fzf_preview#util#uniq(lists)

  return map(fzf_preview#util#align_lists(lists), { _, v -> join(v, '  ') })
endfunction

function! fzf_preview#resource#marks() abort
  let splited_project_path = split(fzf_preview#util#project_root(), '/')

  let chars = [
  \ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  \ 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  \ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  \ 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  \ ]

  let bufnr_and_lnum_list = map(map(copy(chars), {
  \ _, char -> getpos("'" . char)
  \ }), {
  \ _, pos -> { 'bufnr': pos[0] == 0 ? bufnr('%') : pos[0], 'lnum': pos[1] }
  \ })
  call filter(bufnr_and_lnum_list, { _, bufnr_and_lnum -> bufnr_and_lnum['lnum'] != 0 })

  let result = s:bufnr_and_lnum_to_lines(bufnr_and_lnum_list, splited_project_path)
  return fzf_preview#converter#convert_for_fzf(result, 1)
endfunction

function! fzf_preview#resource#conflict() abort
  return  fzf_preview#converter#convert_for_fzf(systemlist(fzf_preview#command#conflict_search_command()), 1)
endfunction

function! fzf_preview#resource#blame_pr() abort
  return  systemlist(g:fzf_preview_open_pr_command . ' ' . expand('%:p'))
endfunction

function! fzf_preview#resource#files_from_resources(resources) abort
  let resource_map = {
  \ 'project': function('fzf_preview#resource#project_files'),
  \ 'git': function('fzf_preview#resource#git_files'),
  \ 'directory': function('fzf_preview#resource#directory_files', ['']),
  \ 'buffer': function('fzf_preview#resource#buffers'),
  \ 'project_old': function('fzf_preview#resource#project_oldfiles'),
  \ 'project_mru': function('fzf_preview#resource#project_mrufiles'),
  \ 'project_mrw': function('fzf_preview#resource#project_mrwfiles'),
  \ 'old': function('fzf_preview#resource#oldfiles'),
  \ 'mru': function('fzf_preview#resource#mrufiles'),
  \ 'mrw': function('fzf_preview#resource#mrwfiles'),
  \ }

  let files = []
  for resource in a:resources
    let files = files + resource_map[resource]()
  endfor

  return fzf_preview#util#uniq(files)
endfunction

function! s:filter_history_file_to_project_file(files) abort
  let readable_filelist = filter(a:files, { _, file -> filereadable(file) })
  let splited_project_path = split(fzf_preview#util#project_root(), '/')

  let project_files = []
  for readable_file in readable_filelist
    if fzf_preview#util#is_project_file(readable_file, splited_project_path)
      let project_files = add(project_files, readable_file)
    endif
  endfor

  return map(project_files, "fnamemodify(v:val, ':.')")
endfunction

function! s:bufnr_and_lnum_to_lines(bufnr_and_lnum_list, splited_project_path) abort
  let result = []
  for bufnr_and_lnum in a:bufnr_and_lnum_list
    let bufnr = bufnr_and_lnum['bufnr']
    let lnum = bufnr_and_lnum['lnum']
    let bufinfos = getbufinfo(bufnr)

    if len(bufinfos) > 0
      let bufinfo = bufinfos[0]
      let file = bufinfo['name']

      if fzf_preview#util#is_project_file(file, a:splited_project_path) && filereadable(file)
        let file = fnamemodify(file, ':.')
        let line_number = lnum
        let lines = getbufline(bufname(bufnr), lnum)

        if len(lines) > 0
          let text = lines[0]
        else
          let text = ''
        endif

        call add(result, file . ':' . line_number . ':' . text)
      endif
    endif
  endfor

  return result
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

function! s:read_tag_file() abort
  let lines = []
  let files = filter(s:get_tag_files(), { _, file -> filereadable(file) })
  for file in files
    let lines = lines + filter(readfile(file), { _, line -> match(line, '^!') == -1 })
  endfor

  call map(lines, { _, line -> s:parse_tagline(line) })
  return lines
endfunction

function! s:get_tag_files() abort
  return split(&tags, ',')
endfunction

function! s:parse_tagline(line) abort
  let elem = split(a:line, '\t')
  let file_path = fnamemodify(elem[1], ':.')

  let match = matchlist(elem[2], '^\(\d\+\);"')

  try
    let info = {
    \ 'name': elem[0],
    \ 'file': file_path,
    \ 'line': match[1],
    \ 'type': elem[3],
    \ }
  catch
    throw 'Set excmd=number or excmd=combine in universal-ctags options'
  endtry

  return info
endfunction
