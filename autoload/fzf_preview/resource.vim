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

function! fzf_preview#resource#lines() abort
  if !filereadable(expand('%'))
    return []
  endif

  let lines = getbufline(bufnr('%'), 1, '$')
  call map(lines, { i, line -> [i + 1, line] })
  return map(fzf_preview#util#align_lists(lines), { _, v -> join(v, '  ') })
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
