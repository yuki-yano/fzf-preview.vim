scriptencoding utf-8

function! fzf_preview#converter#convert_for_fzf(files, ...) abort
  let disable_postprocess_command = get(a:, 1, 0)
  if g:fzf_preview_filelist_postprocess_command !=# '' && !disable_postprocess_command
    let filenames = s:postprocess_filename(a:files)
  else
    let filenames = copy(a:files)
  endif

  if g:fzf_preview_use_dev_icons && len(a:files) < g:fzf_preview_devicons_limit
    let devicons = s:create_dev_icon_list(a:files)
  else
    let devicons = map(copy(a:files), "''")
  endif

  return map(filenames, 'devicons[v:key] . v:val')
endfunction

function! s:postprocess_filename(files) abort
  let files = copy(a:files)
  let result = []

  while len(files) > 0
    let chunk_size = len(files) > g:fzf_preview#FILELIST_CHUNK_SIZE ? g:fzf_preview#FILELIST_CHUNK_SIZE : len(files) - 1
    let slice = remove(files, 0, chunk_size)
    let result = result + systemlist('echo -e "' . join(slice, '\n') . '" | ' . g:fzf_preview_filelist_postprocess_command)
  endwhile

  return result
endfunction

function! s:create_dev_icon_list(files) abort
  let result = []

  for file in copy(a:files)
    let file = split(file, ':')[0]
    let filename = fnamemodify(file, ':p:t')
    let icon = WebDevIconsGetFileTypeSymbol(substitute(filename, '\[[0-9;]*m', '', 'g'), isdirectory(filename))
    call add(result, s:dev_icon_format(icon))
  endfor

  return result
endfunction

function! s:dev_icon_format(icon) abort
  return printf('%s  ', a:icon)
endfunction
