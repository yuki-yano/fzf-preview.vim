# **Important:** Migrated to remote plugin and coc extensions (v2) written in Node

Settings are incompatible.

Please refer to the following documentation for more information on the migration

[Migrate v2 guide](https://github.com/yuki-ycino/fzf-preview.vim/blob/master/doc/migrate-v2.md)

# fzf-preview.vim

fzf-preview is a coc extensions and Neovim plugin that provides collection of features to assist file management using fzf. It provides multiple presets of fzf and correspondingly powerful preview.

Remote Plugin only works with Neovim, but you can use coc extensions also works in Vim.

This plugin can be easily extended in comparison to [fzf.vim](https://github.com/junegunn/fzf.vim).

e.g. [Fugitive](https://github.com/tpope/vim-fugitive)(launch git commands), bdelete(delete a selected buffer from the buffer list)

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

## Demo

### Open file and :bdelete

![fzf-preview](https://user-images.githubusercontent.com/5423775/87848670-5aa1a900-c91d-11ea-9a89-adbb0e30db39.gif "fzf-preview")

### Git Status with add, reset and patch (Integrate with [Fugitive](https://github.com/tpope/vim-fugitive))

![fzf-preview](https://user-images.githubusercontent.com/5423775/87848834-a2750000-c91e-11ea-8452-803bfc0d43c1.gif "fzf-preview")

### Grep

![fzf-preview](https://user-images.githubusercontent.com/5423775/87848887-2cbd6400-c91f-11ea-8ef0-b1d01106db83.gif "fzf-preview")

### Export quickfix and refactor (with [vim-qfreplace](https://github.com/thinca/vim-qfreplace))

![fzf-preview](https://user-images.githubusercontent.com/5423775/87848923-92115500-c91f-11ea-8ee6-7188e1f8fdea.gif "fzf-preview")

## Requirements

- **Node** <https://nodejs.org/>
- git <https://git-scm.com/>
- fzf <https://github.com/junegunn/fzf>

### Remote Plugin

- **Neovim** <https://neovim.io/>

### coc extensions

- **coc.nvim** <https://github.com/neoclide/coc.nvim>

### Optional

#### Functional

- **Python3 (Used grep preview)** (Recommended) <https://www.python.org/>
- **ripgrep (Require FzfPreviewProjectGrep and FzfPreviewDirectoryFiles)** (Recommended) <https://github.com/BurntSushi/ripgrep>
- Fugitive (Require git patch) <https://github.com/tpope/vim-fugitive>
- Gina (Require git patch) <https://github.com/lambdalisue/gina.vim>
- universal-ctags (Require FzfPreviewCtags and FzfPreviewBufferTags) <https://github.com/universal-ctags/ctags>
- vista.vim (Require FzfPreviewVistaCtags and FzfPreviewVistaBufferCtags) <https://github.com/liuchengxu/vista.vim>
- vim-bookmarks (Require FzfPreviewBookmarks) <https://github.com/MattesGroeger/vim-bookmarks>
- yankround.vim (Require FzfPreviewYankround) <https://github.com/LeafCage/yankround.vim>
- GitHub cli (Require FzfPreviewBlamePR) <https://github.com/cli/cli>
- Yarn (Require build latest version) <https://classic.yarnpkg.com/>

#### Appearance

When bat is installed you can highlight the preview and see it. Otherwise, head will be used

- **bat (Add color to the preview)** (Recommended) <https://github.com/sharkdp/bat>
- exa (Use color to the file list) <https://github.com/ogham/exa>
  - exa on mac `brew install findutils`
- vim-devicons (Use devicons) <https://github.com/ryanoasis/vim-devicons>

## Installation

### Remote Plugin

Install the npm package [neovim](https://www.npmjs.com/package/neovim) to get the remote plugin working.

```shell
$ npm install -g neovim
```

Use [Dein](https://github.com/Shougo/dein.vim), [vim-plug](https://github.com/junegunn/vim-plug) or any Vim plugin manager of your choice.

Install `release` branch and execute `:UpdateRemotePlugins` when after installed plugin.

```vim
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'yuki-ycino/fzf-preview.vim', { 'branch': 'release', 'do': ':UpdateRemotePlugins' }
```

or

```vim
call dein#add('junegunn/fzf', { 'build': './install --all', 'merged': 0 })
call dein#add('yuki-ycino/fzf-preview.vim', { 'rev': 'release' })
" call dein#add('yuki-ycino/fzf-preview.vim', { 'build': 'yarn install' })
```

### coc extensions

Install the [fzf](https://github.com/junegunn/fzf), [coc.nvim](https://github.com/neoclide/coc.nvim) and install coc-fzf-preview

```vim
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'neoclide/coc.nvim', { 'branch': 'release' }
```

```vim
call dein#add('junegunn/fzf', { 'build': './install --all', 'merged': 0 })
call dein#add('neoclide/coc.nvim', { 'rev': 'release', 'merged': 0 })
```

and

```vim
:CocInstall coc-fzf-preview
```

## Usage

### Command

```vim
:FzfPreviewProjectFiles                       " Select project files
:CocCommand fzf-preview.ProjectFiles

:FzfPreviewGitFiles                           " Select file from git ls-files
:CocCommand fzf-preview.GitFiles

:FzfPreviewDirectoryFiles {path or none}      " Select file from directory files (default to current working directory) (Required [ripgrep](https://github.com/BurntSushi/ripgrep))
:CocCommand fzf-preview.DirectoryFiles

:FzfPreviewGitStatus                          " Select git status listed file. Used git-status processes.
:CocCommand fzf-preview.GitStatus

:FzfPreviewBuffers                            " Select file buffers. Used open-buffer processes.
:CocCommand fzf-preview.Buffers

:FzfPreviewAllBuffers                         " Select all buffers. Used open-bufnr processes
:CocCommand fzf-preview.AllBuffers

:FzfPreviewProjectOldFiles                    " Select project files from oldfiles
:CocCommand fzf-preview.ProjectOldFiles

:FzfPreviewProjectMruFiles                    " Select project mru (Most Recently Used) files
:CocCommand fzf-preview.ProjectMruFiles

:FzfPreviewProjectMrwFiles                    " Select project mrw (Most Recently Written) files
:CocCommand fzf-preview.ProjectMrwFiles

:FzfPreviewProjectGrep {word}                 " Grep project files from args word (Required [Python3](https://www.python.org/))
:CocCommand fzf-preview.ProjectGrep {word}

:FzfPreviewProjectCommandGrep {word or none}  " Grep project files with advanced ripgrep integration (not fuzzy find) Ref: [Advanced ripgrep integration](https://github.com/junegunn/fzf.vim#example-advanced-ripgrep-integration) (Required [Python3](https://www.python.org/))
:CocCommand fzf-preview.ProjectCommandGrep {word or none}

:FzfPreviewCtags                              " Select tags from tags file (Required [universal-ctags](https://github.com/universal-ctags/ctags) and [Python3](https://www.python.org/))
:CocCommand fzf-preview.Ctags

:FzfPreviewBufferTags                         " Select tags from current files (Required [universal-ctags](https://github.com/universal-ctags/ctags) and [Python3](https://www.python.org/))
:CocCommand fzf-preview.BufferTags

:FzfPreviewOldFiles                           " Select files from oldfiles
:CocCommand fzf-preview.OldFiles

:FzfPreviewMruFiles                           " Select mru (Most Recently Used) files
:CocCommand fzf-preview.MruFiles

:FzfPreviewMrwFiles                           " Select mrw (Most Recently Written) files
:CocCommand fzf-preview.MrwFiles

:FzfPreviewQuickFix                           " Select line from QuickFix (Required [Python3](https://www.python.org/))
:CocCommand fzf-preview.QuickFix

:FzfPreviewLocationList                       " Select line from LocationList (Required [Python3](https://www.python.org/))
:CocCommand fzf-preview.LocationList

:FzfPreviewLines                              " Select line from current buffer (Required [Python3](https://www.python.org/))
:CocCommand fzf-preview.Lines

:FzfPreviewBufferLines                        " Select line from loaded buffer (Required [Python3](https://www.python.org/))
:CocCommand fzf-preview.BufferLines

:FzfPreviewJumps                              " Select jumplist item (Required [Python3](https://www.python.org/))
:CocCommand fzf-preview.Jumps

:FzfPreviewChanges                            " Select changelist item (Required [Python3](https://www.python.org/))
:CocCommand fzf-preview.Changes

:FzfPreviewMarks                              " Select mark (Required [Python3](https://www.python.org/))
:CocCommand fzf-preview.Marks

:FzfPreviewFromResources                      " Select files from selected resources (project, git, directory, buffer, project_old, project_mru, project_mrw, old, mru, mrw)
:CocCommand fzf-preview.FromResources

:FzfPreviewVistaCtags                         " Select tags from vista.vim (Required [vista.vim](https://github.com/liuchengxu/vista.vim))
:CocCommand fzf-preview.VistaCtags

:FzfPreviewVistaBufferCtags                   " Select current buffer tags from vista.vim (Required [vista.vim](https://github.com/liuchengxu/vista.vim))
:CocCommand fzf-preview.VistaBufferCtags

:FzfPreviewBookmarks                          " Select bookmarks (Required [vim-bookmarks](https://github.com/MattesGroeger/vim-bookmarks))
:CocCommand fzf-preview.Bookmarks

:FzfPreviewYankround                          " Select register history (Required [yankround.vim](https://github.com/LeafCage/yankround.vim))
:CocCommand fzf-preview.Yankround

:FzfPreviewBlamePR                            " Open the PR corresponding to the selected line (Required [GitHub cli](https://github.com/cli/cli))
:CocCommand fzf-preview.BlamePR

:CocCommand fzf-preview.CocReferences         " Select references from coc.nvim (only coc extensions)

:CocCommand fzf-preview.CocDiagnostics        " Select diagnostics from coc.nvim (only coc extensions)

:CocCommand fzf-preview.CocCurrentDiagnostics " Select current file diagnostics from coc.nvim (only coc extensions)
```

### Recommended mappings

#### Remote Plugin

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
nnoremap <silent> [fzf-p]/     :<C-u>FzfPreviewLines --add-fzf-arg=--no-sort --add-fzf-arg=--query="'"<CR>
nnoremap <silent> [fzf-p]*     :<C-u>FzfPreviewLines --add-fzf-arg=--no-sort --add-fzf-arg=--query="'<C-r>=expand('<cword>')<CR>"<CR>
nnoremap          [fzf-p]gr    :<C-u>FzfPreviewProjectGrep<Space>
xnoremap          [fzf-p]gr    "sy:FzfPreviewProjectGrep<Space>-F<Space>"<C-r>=substitute(substitute(@s, '\n', '', 'g'), '/', '\\/', 'g')<CR>"
nnoremap <silent> [fzf-p]t     :<C-u>FzfPreviewBufferTags<CR>
nnoremap <silent> [fzf-p]q     :<C-u>FzfPreviewQuickFix<CR>
nnoremap <silent> [fzf-p]l     :<C-u>FzfPreviewLocationList<CR>
```

#### coc extensions

```vim
nmap <Leader>f [fzf-p]
xmap <Leader>f [fzf-p]

nnoremap <silent> [fzf-p]p     :<C-u>CocCommand fzf-preview.FromResources project_mru git<CR>
nnoremap <silent> [fzf-p]gs    :<C-u>CocCommand fzf-preview.GitStatus<CR>
nnoremap <silent> [fzf-p]b     :<C-u>CocCommand fzf-preview.Buffers<CR>
nnoremap <silent> [fzf-p]B     :<C-u>CocCommand fzf-preview.AllBuffers<CR>
nnoremap <silent> [fzf-p]o     :<C-u>CocCommand fzf-preview.FromResources buffer project_mru<CR>
nnoremap <silent> [fzf-p]<C-o> :<C-u>CocCommand fzf-preview.Jumps<CR>
nnoremap <silent> [fzf-p]g;    :<C-u>CocCommand fzf-preview.Changes<CR>
nnoremap <silent> [fzf-p]/     :<C-u>CocCommand fzf-preview.Lines --add-fzf-arg=--no-sort --add-fzf-arg=--query="'"<CR>
nnoremap <silent> [fzf-p]*     :<C-u>CocCommand fzf-preview.Lines --add-fzf-arg=--no-sort --add-fzf-arg=--query="'<C-r>=expand('<cword>')<CR>"<CR>
nnoremap          [fzf-p]gr    :<C-u>CocCommand fzf-preview.ProjectGrep<Space>
xnoremap          [fzf-p]gr    "sy:CocCommand   fzf-preview.ProjectGrep<Space>-F<Space>"<C-r>=substitute(substitute(@s, '\n', '', 'g'), '/', '\\/', 'g')<CR>"
nnoremap <silent> [fzf-p]t     :<C-u>CocCommand fzf-preview.BufferTags<CR>
nnoremap <silent> [fzf-p]q     :<C-u>CocCommand fzf-preview.QuickFix<CR>
nnoremap <silent> [fzf-p]l     :<C-u>CocCommand fzf-preview.LocationList<CR>
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

<C-o>
  Jump to buffer if already open. See :drop.
  If g:fzf_preview_buffers_jump is set to 1 then it will open the buffer in
  current window instead.

<C-q>
  Build QuickFix in open-file processes.
  Execute :bdelete! command from open-buffer and open-bufnr processes.

<C-a>
  Git add with git-status processes

<C-r>
  Git reset with git-status processes

<C-c>
  Git patch with git-status processes (Require Fugitive or Gina)

<C-d>
  Preview page down

<C-u>
  Preview page up

?
  Toggle display of preview screen
```

## Customization

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
" floating window size ratio
let g:fzf_preview_floating_window_rate = 0.9

" fzf command default options
let g:fzf_preview_default_fzf_options = { '--reverse': v:true }

" Add fzf quit mapping
let g:fzf_preview_quit_map = 1

" jump to the buffers by default, when possible
let g:fzf_preview_buffers_jump = 0

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

" MRU and MRW cache directory
let g:fzf_preview_cache_directory = expand('~/.cache/vim/fzf_preview')

" If this value is not 0, disable mru and mrw
let g:fzf_preview_disable_mru = 0

" Use look-ahead cache for MRU and MRW
let g:fzf_preview_use_look_ahead_mr_cache = 0

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

" Set the processes when selecting an element with fzf
let g:fzf_preview_custom_processes = {}
" For example, set split to ctrl-s
" let g:fzf_preview_custom_processes['open-file'] = fzf_preview#remote#process#get_default_processes('open-file')
" on coc extensions
" let g:fzf_preview_custom_processes['open-file'] = fzf_preview#remote#process#get_default_processes('open-file', 'coc')
" let g:fzf_preview_custom_processes['open-file']['ctrl-s'] = g:fzf_preview_custom_processes['open-file']['ctrl-x']
" call remove(g:fzf_preview_custom_processes['open-file'], 'ctrl-x')

" Use as fzf preview-window option
let g:fzf_preview_fzf_preview_window_option = 'wrap'
" let g:fzf_preview_fzf_preview_window_option = 'up:30%'

" Command to be executed after file list creation
let g:fzf_preview_filelist_postprocess_command = ''
" let g:fzf_preview_filelist_postprocess_command = 'xargs -d "\n" ls  -1 -U --color'     " Use dircolors
" let g:fzf_preview_filelist_postprocess_command = 'xargs -d "\n" exa -1 --color=always' " Use exa
" on Mac
" let g:fzf_preview_filelist_postprocess_command = 'gxargs -d "\n" exa -1 --color=always' "use exa


" Use vim-devicons
let g:fzf_preview_use_dev_icons = 0

" devicons character width
let g:fzf_preview_dev_icon_prefix_string_length = 3

" Devicons can make fzf-preview slow when the number of results is high
" By default icons are disable when number of results is higher that 5000
let g:fzf_preview_dev_icons_limit = 5000

" The theme used in the bat preview
$FZF_PREVIEW_PREVIEW_BAT_THEME = 'ansi-dark'
```

### Command Options

Comment out line is settings for coc extensions.

```vim
--processes
" Set process when selecting element with fzf started by this command.
" Value must be a global variable name.
" Variable is dictionary and format is same as g:fzf_preview_custom_processes['open-file'].
"
" Most commands are passed a file path to the process function.
" FzfPreviewAllBuffers will be passed “buffer {bufnr}”
"
" Value example: let g:foo_processes = {
"                \ '':       'FzfPreviewOpenFileEnter',
"                \ 'ctrl-x': get(function('s:foo_function'), 'name'),
"                \ }
"

--add-fzf-arg
" Set the arguments to be passed when executing fzf.
" This value is added to the default options.
" Value must be a string without spaces.

" Example: Exclude filename with FzfPreviewProjectGrep
nnoremap <Leader>g :<C-u>FzfPreviewProjectGrep --add-fzf-arg=--nth=3<Space>
" nnoremap <Leader>g :<C-u>CocCommand fzf-preview.ProjectGrep --add-fzf-arg=--nth=3<Space>


--resume
" Reuse the input that was last used to select the element with fzf.
" Do not need to pass a value for this option.

" Example: Reuse last query for project grep.
nnoremap <Leader>G :<C-u>FzfPreviewProjectGrep --resume<Space>
" nnoremap <Leader>G :<C-u>CocCommand fzf-preview.ProjectGrep --resume<Space>
```

### Function

```vim
" Get the initial value of the open file processes
" processes_name is 'open-file', 'open-buffer', 'open-bufnr', 'git-status', 'register' and 'open-pr'.
" plugin_type is 'remote' or 'coc'. Default value is 'remote'
call fzf_preview#remote#process#get_default_processes({processes_name}, {plugin_type})
```

## Others

- How to use fish user?
  - Set the `set shell` and `$SHELL`.

```vim
set shell=/bin/zsh
let $SHELL = "/bin/zsh"
```

## Inspired by

- [antoinemadec/coc-fzf](https://github.com/antoinemadec/coc-fzf)

## License

The MIT License (MIT)
