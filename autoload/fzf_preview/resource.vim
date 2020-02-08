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
