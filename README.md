# fzf-preview.vim

fzf-preview is a Neovim plugin that provides collection of features to assist file management using fzf. It provides multiple presets of fzf and correspondingly powerful preview.

This plugin can be easily extended in comparison to [fzf.vim](https://github.com/junegunn/fzf.vim).
e.g. Fugitive(launch git commands), bdelete(delete a selected buffer from the buffer list)

Neovim is highly recommended for this plugin because of its floating window system.

## Features

1. provides an excellent UI with floating windows by default
2. preview the selected item (with an arbitrary command)
3. fast file and buffer search by fuzzy matching
4. search all project files and history
5. search from file history files using oldfiles and mru
6. using diff preview to find a file from the state of git
7. jump lines from jumplist or changelist
8. interactive grep and preview from the current project
9. Export the selected items to QuickFix.
10. execute the callback function for the selected item (processor)
    - Deleting a buffer
    - [tpope/vim-fugitive: fugitive.vim: A Git wrapper so awesome, it should be illegal](https://github.com/tpope/vim-fugitive)
    - [liuchengxu/vista.vim: Viewer & Finder for LSP symbols and tags](https://github.com/liuchengxu/vista.vim)
    - [MattesGroeger/vim-bookmarks: Vim bookmark plugin](https://github.com/MattesGroeger/vim-bookmarks)
    - [LeafCage/yankround.vim: logging registers and reusing them.](https://github.com/LeafCage/yankround.vim)
    - etc.

## Demo

### Project Files

![fzf-preview](https://user-images.githubusercontent.com/5423775/73932616-18138380-491e-11ea-9078-de222fb47998.gif "fzf-preview")

### Git Status (Integrate with Fugitive)

![fzf-preview](https://user-images.githubusercontent.com/5423775/75104517-506cce80-564d-11ea-917d-8f5ceabfd557.gif "fzf-preview")

### Project Grep

![fzf-preview](https://user-images.githubusercontent.com/5423775/73932630-1ea1fb00-491e-11ea-8547-4fd68e45857b.gif "fzf-preview")

### Export QuickFix

![fzf-preview](https://user-images.githubusercontent.com/5423775/74020208-68e9b180-49dc-11ea-9cbb-6e7423d065df.gif "fzf-preview")

## Requirements

- **Neovim** <https://neovim.io/>
- git <https://git-scm.com/>
- fzf <https://github.com/junegunn/fzf>

### Optional

#### Functional

- **Python3 (Used grep preview)** (Recomended) <https://www.python.org/>
- **ripgrep (Require FzfPreviewProjectGrep and FzfPreviewDirectoryFiles)** (Recommended) <https://github.com/BurntSushi/ripgrep>
- GitHub cli (Require FzfPreviewBlamePR) <https://github.com/cli/cli>
- universal-ctags (Require FzfPreviewCtags and FzfPreviewBufferTags) <https://github.com/universal-ctags/ctags>

#### Appearance

When bat is installed you can highlight the preview and see it. Otherwise, head will be used

- **bat (Add color to the preview)** (Recomended) <https://github.com/sharkdp/bat>
- exa (Use color to the file list) <https://github.com/ogham/exa>
  - exa on mac `brew install findutils`
- vim-devicons (Use devicons) <https://github.com/ryanoasis/vim-devicons>

## Installation

Use [Dein](https://github.com/Shougo/dein.vim), [vim-plug](https://github.com/junegunn/vim-plug) or any Vim plugin manager of your choice.

If you are using MacOS and installed fzf using Homebrew:

```vim
set  runtimepath+=/usr/local/opt/fzf
call dein#add('yuki-ycino/fzf-preview.vim')
```

or Using Dein:

```vim
call dein#add('junegunn/fzf', { 'build': './install --all', 'merged': 0 })
call dein#add('yuki-ycino/fzf-preview.vim')
```

## Usage

### Command

```vim
:FzfPreviewProjectFiles                      " Select project files

:FzfPreviewGitFiles                          " Select file from git ls-files

:FzfPreviewDirectoryFiles {path or none}     " Select file from directory files (default to current working directory) (Required [ripgrep](https://github.com/BurntSushi/ripgrep))

:FzfPreviewGitStatus                         " Select git status listed file

:FzfPreviewBuffers                           " Select file buffers

:FzfPreviewAllBuffers                        " Select all buffers

:FzfPreviewProjectOldFiles                   " Select project files from oldfiles

:FzfPreviewProjectMruFiles                   " Select project mru (Most Recently Used) files

:FzfPreviewProjectMrwFiles                   " Select project mrw (Most Recently Written) files

:FzfPreviewProjectGrep {word}                " Grep project files from args word (Required [Python3](https://www.python.org/))

:FzfPreviewProjectCommandGrep {word or none} " Grep project files with advanced ripgrep integration (not fuzzy find) Ref: [Advanced ripgrep integration](https://github.com/junegunn/fzf.vim#example-advanced-ripgrep-integration) (Required [Python3](https://www.python.org/))

:FzfPreviewCtags                             " Select tags from tags file (Required [universal-ctags](https://github.com/universal-ctags/ctags) and [Python3](https://www.python.org/))

:FzfPreviewBufferTags                        " Select tags from current files (Required [universal-ctags](https://github.com/universal-ctags/ctags) and [Python3](https://www.python.org/))

:FzfPreviewOldFiles                          " Select files from oldfiles

:FzfPreviewMruFiles                          " Select mru (Most Recently Used) files

:FzfPreviewMrwFiles                          " Select mrw (Most Recently Written) files

:FzfPreviewQuickFix                          " Select line from QuickFix (Required [Python3](https://www.python.org/))

:FzfPreviewLocationList                      " Select line from LocationList (Required [Python3](https://www.python.org/))

:FzfPreviewLines                             " Select line from current buffer (Required [Python3](https://www.python.org/))

:FzfPreviewBufferLines                       " Select line from loaded buffer (Required [Python3](https://www.python.org/))

:FzfPreviewJumps                             " Select jumplist item (Required [Python3](https://www.python.org/))

:FzfPreviewChanges                           " Select changelist item (Required [Python3](https://www.python.org/))

:FzfPreviewMarks                             " Select mark (Required [Python3](https://www.python.org/))

:FzfPreviewConflict                          " Select conflict (Required [Python3](https://www.python.org/))

:FzfPreviewBlamePR                           " Open the PR corresponding to the selected line (Required [GitHub cli](https://github.com/cli/cli))

:FzfPreviewFromResources                     " Select files from selected resources (project, git, directory, buffer, project_old, project_mru, project_mrw, old, mru, mrw)
```

### Recommended mappings

```vim
nmap <Leader>f [fzf-p]
xmap <Leader>f [fzf-p]

nnoremap <silent> [fzf-p]p     :<C-u>FzfPreviewFromResources project_mru git<CR>
nnoremap <silent> [fzf-p]gs    :<C-u>FzfPreviewGitStatus<CR>
nnoremap <silent> [fzf-p]b     :<C-u>FzfPreviewBuffers<CR>
nnoremap <silent> [fzf-p]B     :<C-u>FzfPreviewAllBuffers<CR>
nnoremap <silent> [fzf-p]o     :<C-u>FzfPreviewFromResources buffer project_mru<CR>
nnoremap <silent> [fzf-p]<C-o> :<C-u>FzfPreviewJumps<CR>
nnoremap <silent> [fzf-p]g;    :<C-u>FzfPreviewChanges<CR>
nnoremap <silent> [fzf-p]/     :<C-u>FzfPreviewLines -add-fzf-arg=--no-sort -add-fzf-arg=--query="'"<CR>
nnoremap <silent> [fzf-p]*     :<C-u>FzfPreviewLines -add-fzf-arg=--no-sort -add-fzf-arg=--query="'<C-r>=expand('<cword>')<CR>"<CR>
nnoremap          [fzf-p]gr    :<C-u>FzfPreviewProjectGrep<Space>
xnoremap          [fzf-p]gr    "sy:FzfPreviewProjectGrep<Space>-F<Space>"<C-r>=substitute(substitute(@s, '\n', '', 'g'), '/', '\\/', 'g')<CR>"
nnoremap <silent> [fzf-p]t     :<C-u>FzfPreviewBufferTags<CR>
nnoremap <silent> [fzf-p]q     :<C-u>FzfPreviewQuickFix<CR>
nnoremap <silent> [fzf-p]l     :<C-u>FzfPreviewLocationList<CR>
```

### Fzf window Keymaps

```text
<C-g>, <Esc>
  Cancel fzf

<C-x>
  Open split

<C-v>
  Open vsplit

<C-t>
  Open tabedit

<C-q>
  Build QuickFix

<C-d>
  Preview page down

<C-u>
  Preview page up

?
  Toggle display of preview screen

DEPRECATED
<C-s> (Neovim Only)
  Toggle window size of fzf, normal size and full-screen
```

## Customization

### Example of Fugitive integration

```vim
nnoremap <silent> [fzf-p]gs :<C-u>FzfPreviewGitStatus -processors=g:fzf_preview_fugitive_processors<CR>

augroup fzf_preview
  autocmd!
  autocmd User fzf_preview#initialized call s:fzf_preview_settings()
augroup END

function! s:fugitive_add(paths) abort
  for path in a:paths
    execute 'silent G add ' . path
  endfor
  echomsg 'Git add ' . join(a:paths, ', ')
endfunction

function! s:fugitive_reset(paths) abort
  for path in a:paths
    execute 'silent G reset ' . path
  endfor
  echomsg 'Git reset ' . join(a:paths, ', ')
endfunction

function! s:fugitive_patch(paths) abort
  for path in a:paths
    execute 'silent tabedit ' . path . ' | silent Gdiff'
  endfor
  echomsg 'Git add --patch ' . join(a:paths, ', ')
endfunction

function! s:fzf_preview_settings() abort
  let g:fzf_preview_fugitive_processors = fzf_preview#resource_processor#get_processors()
  let g:fzf_preview_fugitive_processors['ctrl-a'] = function('s:fugitive_add')
  let g:fzf_preview_fugitive_processors['ctrl-r'] = function('s:fugitive_reset')
  let g:fzf_preview_fugitive_processors['ctrl-c'] = function('s:fugitive_patch')
endfunction
```

### Optional Configuration Tips

- Increase the size of file history:

```vim
" oldfiles uses viminfo, but the default setting is 100
" Change the number by setting it in viminfo with a single quote.
" Ref: viminfo-'
set viminfo='1000
```

- Set values for each variable. The default settings are as follows.

```vim
" Add fzf quit mapping
let g:fzf_preview_quit_map = 1

" Use floating window (for neovim)
let g:fzf_preview_use_floating_window = 1

" floating window size ratio
let g:fzf_preview_floating_window_rate = 0.9

" floating window winblend value
let g:fzf_preview_floating_window_winblend = 15

" Commands used for fzf preview.
" The file name selected by fzf becomes {}
let g:fzf_preview_command = 'head -100 {-1}'                       " Not installed bat
" let g:fzf_preview_command = 'bat --color=always --style=grid {-1}' " Installed bat

" g:fzf_binary_preview_command is executed if this command succeeds, and g:fzf_preview_command is executed if it fails
let g:fzf_preview_if_binary_command = '[[ "$(file --mime {})" =~ binary ]]'

" Commands used for binary file
let g:fzf_binary_preview_command = 'echo "{} is a binary file"'

" Commands used to get the file list from project
let g:fzf_preview_filelist_command = 'git ls-files --exclude-standard'               " Not Installed ripgrep
" let g:fzf_preview_filelist_command = 'rg --files --hidden --follow --no-messages -g \!"* *"' " Installed ripgrep

" Commands used to get the file list from git reposiroty
let g:fzf_preview_git_files_command = 'git ls-files --exclude-standard'

" Commands used to get the file list from current directory
let g:fzf_preview_directory_files_command = 'rg --files --hidden --follow --no-messages -g \!"* *"'

" Commands used to get the git status file list
let g:fzf_preview_git_status_command = "git status --short --untracked-files=all | awk '{if (substr($0,2,1) !~ / /) print $2}'"

" Commands used for git status preview.
let g:fzf_preview_git_status_preview_command =  "[[ $(git diff -- {-1}) != \"\" ]] && git diff --color=always -- {-1} || " .
\ "[[ $(git diff --cached -- {-1}) != \"\" ]] && git diff --cached --color=always -- {-1} || " .
\ g:fzf_preview_command

" Commands used for project grep
let g:fzf_preview_grep_cmd = 'rg --line-number --no-heading'

" Commands used for current file lines
let g:fzf_preview_lines_command = 'cat'
" let g:fzf_preview_lines_command = 'bat --color=always --style=grid --theme=ansi-dark --plain'

" Commands used for preview of the grep result
let g:fzf_preview_grep_preview_cmd = expand('<sfile>:h:h') . '/bin/preview_fzf_grep'

" Cache directory for mru and mrw
let g:fzf_preview_cache_directory = expand('~/.cache/vim/fzf_preview')

" Keyboard shortcuts while fzf preview is active
let g:fzf_preview_preview_key_bindings = 'ctrl-d:preview-page-down,ctrl-u:preview-page-up,?:toggle-preview'

" Specify the color of fzf
let g:fzf_preview_fzf_color_option = ''

" Set the processors when selecting an element with fzf
" Do not use with g:fzf_preview_*_key_map
let g:fzf_preview_custom_default_processors = {}
" For example, set split to ctrl-s
" let g:fzf_preview_custom_default_processors = fzf_preview#resource_processor#get_default_processors()
" call remove(g:fzf_preview_custom_default_processors, 'ctrl-x')
" let g:fzf_preview_custom_default_processors['ctrl-s'] = function('fzf_preview#resource_processor#split')

" Use as fzf preview-window option
let g:fzf_preview_fzf_preview_window_option = ''
" let g:fzf_preview_fzf_preview_window_option = 'up:30%'

" Command to be executed after file list creation
let g:fzf_preview_filelist_postprocess_command = ''
" let g:fzf_preview_filelist_postprocess_command = 'xargs -d "\n" ls -U --color'      " Use dircolors
" let g:fzf_preview_filelist_postprocess_command = 'xargs -d "\n" exa --color=always' " Use exa
" on Mac
" let g:fzf_preview_filelist_postprocess_command = 'gxargs -d "\n" exa --color=always' "use exa


" Use vim-devicons
let g:fzf_preview_use_dev_icons = 0

" devicons character width
let g:fzf_preview_dev_icon_prefix_length = 2

" The theme used in the bat preview
$FZF_PREVIEW_PREVIEW_BAT_THEME = 'ansi-dark'

" DEPRECATED
" Use g:fzf_preview_custom_default_processors
" Keyboard shortcut for opening files with split
let g:fzf_preview_split_key_map = 'ctrl-x'

" DEPRECATED
" Use g:fzf_preview_custom_default_processors
" Keyboard shortcut for opening files with vsplit
let g:fzf_preview_vsplit_key_map = 'ctrl-v'

" DEPRECATED
" Use g:fzf_preview_custom_default_processors
" Keyboard shortcut for opening files with tabedit
let g:fzf_preview_tabedit_key_map = 'ctrl-t'

" DEPRECATED
" Use g:fzf_preview_custom_default_processors
" Keyboard shortcut for building quickfix
let g:fzf_preview_build_quickfix_key_map = 'ctrl-q'

" DEPRECATED
" fzf window layout
let g:fzf_preview_layout = 'top split new'

" DEPRECATED
" Rate of fzf window
let g:fzf_preview_rate = 0.3

" DEPRECATED
" Key to toggle fzf window size of normal size and full-screen
let g:fzf_full_preview_toggle_key = '<C-s>'
```

### Command Options

```vim
-processors
" Set processor when selecting element with fzf started by this command.
" Value must be a global variable name.
" Variable is dictionary and format is same as g:fzf_preview_custom_default_processors.
"
" Most commands are passed a file path to the processor function.
" FzfPreviewAllBuffers will be passed “buffer {bufnr}”
"
" Value example: let g:foo_processors = {
"                \ '':       function('fzf_preview#resource_processor#edit'),
"                \ 'ctrl-x': function('s:foo_function'),
"                \ }
"

" Example: 'bdelete!' buffers

augroup fzf_preview
  autocmd!
  autocmd User fzf_preview#initialized call s:fzf_preview_settings()
augroup END

function! s:fzf_preview_settings() abort
  let g:fzf_preview_buffer_delete_processors = fzf_preview#resource_processor#get_default_processors()
  let g:fzf_preview_buffer_delete_processors['ctrl-x'] = function('s:buffers_delete_from_lines')
endfunction

function! s:buffers_delete_from_lines(lines) abort
  for line in a:lines
    let matches = matchlist(line, '^buffer \(\d\+\)$')
    if len(matches) >= 1
      execute 'bdelete! ' . matches[1]
    else
      execute 'bdelete! ' . line
    endif
  endfor
endfunction

nnoremap <silent> <Leader>b :<C-u>FzfPreviewBuffers -processors=g:fzf_preview_buffer_delete_processors<CR>


-add-fzf-arg
" Set the arguments to be passed when executing fzf.
" This value is added to the default options.
" Value must be a string without spaces.

" Example: Exclude filename with FzfPreviewProjectGrep
nnoremap <Leader>g :<C-u>FzfPreviewProjectGrep -add-fzf-arg=--nth=3<Space>


-resume
" Reuse the input that was last used to select the element with fzf.
" Do not need to pass a value for this option.

" Example: Reuse last query for project grep.
nnoremap <Leader>G :<C-u>FzfPreviewProjectGrep -resume<Space>


" EXPERIMENTAL: Specifications may change.
-overwrite-fzf-args
" Set the arguments to be passed when executing fzf.
" Value must be a global variable name.
" Variable is string and format is shell command options.
" This option is experimental.
"
" Value example: let g:foo_arguments = '--multi --reverse --ansi --bind=ctrl-d:preview-page-down,ctrl-u:preview-page-up,?:toggle-preview'
"

" Example: Exclude filename with FzfPreviewProjectGrep

augroup fzf_preview
  autocmd!
  autocmd User fzf_preview#initialized call s:fzf_preview_settings()
augroup END

function! s:fzf_preview_settings() abort
  let g:fzf_preview_grep_command_options = fzf_preview#command#get_common_command_options()
  let g:fzf_preview_grep_command_options = g:fzf_preview_grep_command_options . ' --nth=3'
endfunction

nnoremap <Leader>g :<C-u>FzfPreviewProjectGrep -overwrite-fzf-args=g:fzf_preview_grep_command_options<Space>
```

### Function

```vim
" Function to display the floating window used by this plugin
call fzf_preview#window#create_centered_floating_window()

" Example
call fzf#run({
\ 'source':  files,
\ 'sink':   'edit',
\ 'window': 'call fzf_preview#window#create_centered_floating_window()',
\ })

" Get the initial value of the process executed when selecting the element of fzf
call fzf_preview#resource_processor#get_default_processors()

" Get the current value of the process executed when selecting the element of fzf
" Use in fzf_preview#initialized event.
call fzf_preview#resource_processor#get_processors()

" EXPERIMENTAL: Specifications may change.
" Get the common value of the passed when executed fzf.
" Use in fzf_preview#initialized event.
call fzf_preview#command#get_common_command_options()
```

## Inspiration

- [Blacksuan19/init.nvim: An Opinionated Minimalist Neovim Configuration](https://github.com/Blacksuan19/init.nvim)

## License

The MIT License (MIT)
