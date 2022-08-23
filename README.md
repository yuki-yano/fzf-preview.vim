# ![logo](https://user-images.githubusercontent.com/5423775/104124691-7f8b4c00-5395-11eb-85d6-93b1c55cf0c8.png)

[![Build](https://github.com/yuki-yano/fzf-preview.vim/workflows/Build/badge.svg)](https://github.com/yuki-yano/fzf-preview.vim/actions?query=workflow:Build)
[![Release RPC](https://github.com/yuki-yano/fzf-preview.vim/workflows/Release%20Vim%20script%20RPC/badge.svg)](https://github.com/yuki-yano/fzf-preview.vim/actions?query=workflow:"Release+Vim+script+RPC")
[![Release remote plugin](https://github.com/yuki-yano/fzf-preview.vim/workflows/Release%20remote%20plugin/badge.svg)](https://github.com/yuki-yano/fzf-preview.vim/actions?query=workflow:%22Release+remote+plugin%22)
[![Release coc extensions](https://github.com/yuki-yano/fzf-preview.vim/workflows/Release%20coc%20extensions/badge.svg)](https://github.com/yuki-yano/fzf-preview.vim/actions?query=workflow:%22Release+coc+extensions%22)

[![Support](https://img.shields.io/badge/Support-Vim%208.1%20or%20above-yellowgreen)](https://www.vim.org)
[![Support](https://img.shields.io/badge/Support-Neovim%200.4%20or%20above-yellowgreen)](https://neovim.io)
[![Language](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org)
[![Language](https://img.shields.io/badge/Language-Vim%20script-green)](https://www.vim.org)
[![Lint with](https://img.shields.io/badge/Lint%20with-ESLint-blueviolet)](https://eslint.org)
[![Styled with](https://img.shields.io/badge/Styled%20with-Prettier-ff69b4)](https://prettier.io)
[![Tested with](https://img.shields.io/badge/Tested%20with-Jest-green)](https://jestjs.io/)
[![Powered by](https://img.shields.io/badge/Powered%20by-fzf-7b3948)](https://github.com/junegunn/fzf)
[![Powered by](https://img.shields.io/badge/Powered%20by-coc.nvim-7b3948)](https://github.com/neoclide/coc.nvim)
[![Powered by](https://img.shields.io/badge/Powered%20by-vital--vs-7b3948)](https://github.com/hrsh7th/vim-vital-vs)
[![License](https://img.shields.io/badge/License-MIT-green)](https://github.com/yuki-yano/fzf-preview.vim/blob/main/LICENSE)
[![Doc](https://img.shields.io/badge/Doc-:h%20fzf--preview-orange)](https://github.com/yuki-yano/fzf-preview.vim/blob/main/doc/fzf_preview_vim.txt)
[![All contributors](https://img.shields.io/badge/All%20contributors-17-orange)](https://github.com/yuki-yano/fzf-preview.vim/graphs/contributors)

fzf-preview is a (Neo)vim plugin and coc extension written in TypeScript that provide powerful integration with fzf. It provides multiple presets for fzf and correspondingly powerful preview functionality. It also provides advanced interactive git integration.

Since fzf-preview.vim implements RPC in the Vim script, it will work in both Vim and Neovim if you use the RPC release.
It can also be installed as Remote Plugin and coc extensions. If you want to use the integration with coc, install coc extensions.

[Introductory Article](https://zenn.dev/yano/articles/vim_with_fzf_preview_is_best_experience) (Japanese)

This plugin can be easily extended in comparison to [fzf.vim](https://github.com/junegunn/fzf.vim).

e.g. [Fugitive](https://github.com/tpope/vim-fugitive)(launch git commands), bdelete(delete a selected buffer from the buffer list)

## TOC

- [1. Features](#features)
- [2. Demo](#demo)
- [3. Requirements](#requirements)
- [4. Installation](#installation)
- [5. Usage](#usage)
- [6. Customization](#customization)
- [7. Release note](#release-note)
- [8. Others](#others)
- [9. License](#license)

## Features

1. Provides an excellent UI with floating windows by default
2. Supports devicons and output highlighting by default
3. Preview the selected item (with an arbitrary command)
4. Fast file and buffer search by fuzzy matching
5. Search all project files and history
6. Search from file history files using oldfiles and mru
7. Interactive git integration (with [Fugitive](https://github.com/tpope/vim-fugitive) or [Gina](https://github.com/lambdalisue/gina.vim))
8. Jump lines from jumplist or changelist
9. Interactive grep and preview from the current project
10. Export the selected items to QuickFix.

## Demo

### Open file and :bdelete

![fzf-preview](https://user-images.githubusercontent.com/5423775/88540152-6e4fbc80-d04d-11ea-8d19-314ee5e4d294.gif "fzf-preview")

### Interactive git integration (Integrate with [Fugitive](https://github.com/tpope/vim-fugitive) or [Gina](https://github.com/lambdalisue/gina.vim))

![fzf-preview](https://user-images.githubusercontent.com/5423775/88540232-86bfd700-d04d-11ea-8604-8ad8aed09cbb.gif "fzf-preview")

### Grep

![fzf-preview](https://user-images.githubusercontent.com/5423775/88540281-9ccd9780-d04d-11ea-9672-b9af8a6d6307.gif "fzf-preview")

### Export quickfix and refactor (with [vim-qfreplace](https://github.com/thinca/vim-qfreplace))

![fzf-preview](https://user-images.githubusercontent.com/5423775/88540327-af47d100-d04d-11ea-99b5-f453862ae892.gif "fzf-preview")

## Requirements

- **Node** <https://nodejs.org/>
- git <https://git-scm.com/>
- fzf <https://github.com/junegunn/fzf>

### Remote Plugin

- Neovim <https://neovim.io/>

### coc extensions

- coc.nvim <https://github.com/neoclide/coc.nvim>

### Optional

#### Functional

- **ripgrep (Require FzfPreviewProjectGrep and FzfPreviewDirectoryFiles)** (Recommended) <https://github.com/BurntSushi/ripgrep>
- **Fugitive (Require git integration)**  (Recommended) <https://github.com/tpope/vim-fugitive>
- Gina (Require git integration) <https://github.com/lambdalisue/gina.vim>
- universal-ctags (Require FzfPreviewCtags and FzfPreviewBufferTags) <https://github.com/universal-ctags/ctags>
- vista.vim (Require FzfPreviewVistaCtags and FzfPreviewVistaBufferCtags) <https://github.com/liuchengxu/vista.vim>
- vim-bookmarks (Require FzfPreviewBookmarks) <https://github.com/MattesGroeger/vim-bookmarks>
- yankround.vim (Require FzfPreviewYankround) <https://github.com/LeafCage/yankround.vim>
- memolist.vim (Require FzfPreviewMemoList and FzfPreviewMemoListGrep) <https://github.com/glidenote/memolist.vim>
- todo-comments.nvim (Require FzfPreviewTodoComments) <https://github.com/folke/todo-comments.nvim>
- GitHub cli (Require FzfPreviewBlamePR) <https://github.com/cli/cli>
- Yarn (Require build latest version) <https://classic.yarnpkg.com/>

#### Appearance

When bat is installed you can highlight the preview and see it. Otherwise, head will be used

- **bat (Add color to the preview)** (Recommended) <https://github.com/sharkdp/bat>
- vim-devicons (Use devicons) <https://github.com/ryanoasis/vim-devicons>

## Installation

### Vim script RPC

Use [Dein](https://github.com/Shougo/dein.vim), [vim-plug](https://github.com/junegunn/vim-plug) or any Vim plugin manager of your choice.

Install `release/rpc` branch.

```vim
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'yuki-yano/fzf-preview.vim', { 'branch': 'release/rpc' }
```

or

```vim
call dein#add('junegunn/fzf', { 'build': './install --all', 'merged': 0 })
call dein#add('yuki-yano/fzf-preview.vim', { 'rev': 'release/rpc' })
```

### Remote Plugin

Install the npm package [neovim](https://www.npmjs.com/package/neovim) to get the remote plugin working.

```shell
$ npm install -g neovim
```

Use [Dein](https://github.com/Shougo/dein.vim), [vim-plug](https://github.com/junegunn/vim-plug) or any Vim plugin manager of your choice.

Install `release/remote` branch and execute `:UpdateRemotePlugins` when after installed plugin.

```vim
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'yuki-yano/fzf-preview.vim', { 'branch': 'release/remote', 'do': ':UpdateRemotePlugins' }
```

or

```vim
call dein#add('junegunn/fzf', { 'build': './install --all', 'merged': 0 })
call dein#add('yuki-yano/fzf-preview.vim', { 'rev': 'release/remote' })
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

Vim script RPC, Remote Plugin, and coc extensions, in that order.

```vim
" Select project files
:FzfPreviewProjectFilesRpc
:FzfPreviewProjectFiles
:CocCommand fzf-preview.ProjectFiles

" Select file from git ls-files
:FzfPreviewGitFilesRpc
:FzfPreviewGitFiles
:CocCommand fzf-preview.GitFiles

" Select file from directory files (default to current working directory) (Required [ripgrep](https://github.com/BurntSushi/ripgrep))
:FzfPreviewDirectoryFilesRpc {path or none}
:FzfPreviewDirectoryFiles {path or none}
:CocCommand fzf-preview.DirectoryFiles

" Select file buffers. Used open-buffer processes.
:FzfPreviewBuffersRpc
:FzfPreviewBuffers
:CocCommand fzf-preview.Buffers

" Select all buffers. Used open-bufnr processes
:FzfPreviewAllBuffersRpc
:FzfPreviewAllBuffers
:CocCommand fzf-preview.AllBuffers

" Select project files from oldfiles
:FzfPreviewProjectOldFilesRpc
:CocCommand fzf-preview.ProjectOldFiles

" Select project mru (Most Recently Used) files
:FzfPreviewProjectMruFilesRpc
:FzfPreviewProjectMruFiles
:CocCommand fzf-preview.ProjectMruFiles

" Select project mrw (Most Recently Written) files
:FzfPreviewProjectMrwFilesRpc
:FzfPreviewProjectMrwFiles
:CocCommand fzf-preview.ProjectMrwFiles

" Grep project files from args word
:FzfPreviewProjectGrepRpc {args}
:FzfPreviewProjectGrep {args}
:CocCommand fzf-preview.ProjectGrep {args}

" Run FzfPreviewProjectGrep with the same arguments as before.
:FzfPreviewProjectGrepRecallRpc
:FzfPreviewProjectGrepRecall
:CocCommand fzf-preview.ProjectGrepRecall

" Select tags from tags file (Required [universal-ctags](https://github.com/universal-ctags/ctags))
:FzfPreviewCtagsRpc
:FzfPreviewCtags
:CocCommand fzf-preview.Ctags

" Select tags from current files (Required [universal-ctags](https://github.com/universal-ctags/ctags))
:FzfPreviewBufferTagsRpc
:FzfPreviewBufferTags
:CocCommand fzf-preview.BufferTags

" Select files from oldfiles
:FzfPreviewOldFilesRpc
:FzfPreviewOldFiles
:CocCommand fzf-preview.OldFiles

" Select mru (Most Recently Used) files
:FzfPreviewMruFilesRpc
:FzfPreviewMruFiles
:CocCommand fzf-preview.MruFiles

" Select mrw (Most Recently Written) files
:FzfPreviewMrwFilesRpc
:FzfPreviewMrwFiles
:CocCommand fzf-preview.MrwFiles

" Select line from QuickFix
:FzfPreviewQuickFixRpc
:FzfPreviewQuickFix
:CocCommand fzf-preview.QuickFix

" Select line from LocationList
:FzfPreviewLocationListRpc
:FzfPreviewLocationList
:CocCommand fzf-preview.LocationList

" Select line from current buffer (Required [bat](https://github.com/sharkdp/bat))
:FzfPreviewLinesRpc
:FzfPreviewLines
:CocCommand fzf-preview.Lines

" Select line from loaded buffer
:FzfPreviewBufferLinesRpc
:FzfPreviewBufferLines
:CocCommand fzf-preview.BufferLines

" Select jumplist item
:FzfPreviewJumpsRpc
:FzfPreviewJumps
:CocCommand fzf-preview.Jumps

" Select changelist item
:FzfPreviewChangesRpc
:FzfPreviewChanges
:CocCommand fzf-preview.Changes

" Select mark
:FzfPreviewMarksRpc
:CocCommand fzf-preview.Marks

" Select files from selected resources (project, git, directory, buffer, project_old, project_mru, project_mrw, old, mru, mrw)
:FzfPreviewFromResourcesRpc
:FzfPreviewFromResources
:CocCommand fzf-preview.FromResources

" Execute and edit command history
:FzfPreviewCommandPaletteRpc
:FzfPreviewCommandPalette
:CocCommand fzf-preview.CommandPalette

# Grep vim help
:FzfPreviewGrepHelpRpc
:FzfPreviewGrepHelp
:CocCommand fzf-preview.GrepHelp

" Interactive git integration. (Required [Fugitive](https://github.com/tpope/vim-fugitive) or [Gina](https://github.com/lambdalisue/gina.vim))
:FzfPreviewGitActionsRpc
:FzfPreviewGitActions
:CocCommand fzf-preview.GitActions

" Select git status listed file. (Required [Fugitive](https://github.com/tpope/vim-fugitive) or [Gina](https://github.com/lambdalisue/gina.vim))
:FzfPreviewGitStatusRpc
:FzfPreviewGitStatus
:CocCommand fzf-preview.GitStatus

" Select references from vim-lsp
:FzfPreviewVimLspReferencesRpc
:FzfPreviewVimLspReferences

" Select diagnostics from vim-lsp
:FzfPreviewVimLspDiagnosticsRpc
:FzfPreviewVimLspDiagnostics

" Select current file diagnostics from vim-lsp
:FzfPreviewVimLspCurrentDiagnosticsRpc
:FzfPreviewVimLspCurrentDiagnostics

" Select definitions from vim-lsp
:FzfPreviewVimLspDefinitionRpc
:FzfPreviewVimLspDefinition

" Select type definitions from vim-lsp
:FzfPreviewVimLspTypeDefinitionRpc
:FzfPreviewVimLspTypeDefinition

" Select implementations from vim-lsp
:FzfPreviewVimLspImplementationsRpc
:FzfPreviewVimLspImplementations

" Select tags from vista.vim (Required [vista.vim](https://github.com/liuchengxu/vista.vim))
:FzfPreviewVistaCtagsRpc
:FzfPreviewVistaCtags
:CocCommand fzf-preview.VistaCtags

" Select current buffer tags from vista.vim (Required [vista.vim](https://github.com/liuchengxu/vista.vim))
:FzfPreviewVistaBufferCtagsRpc
:FzfPreviewVistaBufferCtags
:CocCommand fzf-preview.VistaBufferCtags

" Select bookmarks (Required [vim-bookmarks](https://github.com/MattesGroeger/vim-bookmarks))
:FzfPreviewBookmarksRpc
:FzfPreviewBookmarks
:CocCommand fzf-preview.Bookmarks

" Select register history (Required [yankround.vim](https://github.com/LeafCage/yankround.vim))
:FzfPreviewYankroundRpc
:FzfPreviewYankround
:CocCommand fzf-preview.Yankround

" Select memolist (Required [glidenote/memolist.vim](https://github.com/glidenote/memolist.vim))
:FzfPreviewMemoListRpc
:FzfPreviewMemoList
:CocCommand fzf-preview.MemoList

" Grep memolist (Required [glidenote/memolist.vim](https://github.com/glidenote/memolist.vim))
:FzfPreviewMemoListGrepRpc
:FzfPreviewMemoListGrep
:CocCommand fzf-preview.MemoListGrep

" Search TodoComments (Required  [folke/todo-comments.nvim](https://github.com/folke/todo-comments.nvim))
:FzfPreviewTodoCommentsRpc
:FzfPreviewTodoComments
:CocCommand fzf-preview.TodoComments

" Open the PR corresponding to the selected line (Required [GitHub cli](https://github.com/cli/cli))
:FzfPreviewBlamePRRpc
:FzfPreviewBlamePR
:CocCommand fzf-preview.BlamePR

" Select references from coc.nvim (only coc extensions)
:CocCommand fzf-preview.CocReferences

" Select diagnostics from coc.nvim (only coc extensions)
:CocCommand fzf-preview.CocDiagnostics

" Select current file diagnostics from coc.nvim (only coc extensions)
:CocCommand fzf-preview.CocCurrentDiagnostics

" Select definitions from coc.nvim (only coc extensions)
:CocCommand fzf-preview.CocDefinition

" Select type definitions from coc.nvim (only coc extensions)
:CocCommand fzf-preview.CocTypeDefinition

" Select implementations from coc.nvim (only coc extensions)
:CocCommand fzf-preview.CocImplementations

" Select outline from coc.nvim (only coc extensions)
:CocCommand fzf-preview.CocOutline
```

### Recommended mappings

#### Vim script RPC

```vim
nmap <Leader>f [fzf-p]
xmap <Leader>f [fzf-p]

nnoremap <silent> [fzf-p]p     :<C-u>FzfPreviewFromResourcesRpc project_mru git<CR>
nnoremap <silent> [fzf-p]gs    :<C-u>FzfPreviewGitStatusRpc<CR>
nnoremap <silent> [fzf-p]ga    :<C-u>FzfPreviewGitActionsRpc<CR>
nnoremap <silent> [fzf-p]b     :<C-u>FzfPreviewBuffersRpc<CR>
nnoremap <silent> [fzf-p]B     :<C-u>FzfPreviewAllBuffersRpc<CR>
nnoremap <silent> [fzf-p]o     :<C-u>FzfPreviewFromResourcesRpc buffer project_mru<CR>
nnoremap <silent> [fzf-p]<C-o> :<C-u>FzfPreviewJumpsRpc<CR>
nnoremap <silent> [fzf-p]g;    :<C-u>FzfPreviewChangesRpc<CR>
nnoremap <silent> [fzf-p]/     :<C-u>FzfPreviewLinesRpc --add-fzf-arg=--no-sort --add-fzf-arg=--query="'"<CR>
nnoremap <silent> [fzf-p]*     :<C-u>FzfPreviewLinesRpc --add-fzf-arg=--no-sort --add-fzf-arg=--query="'<C-r>=expand('<cword>')<CR>"<CR>
nnoremap          [fzf-p]gr    :<C-u>FzfPreviewProjectGrepRpc<Space>
xnoremap          [fzf-p]gr    "sy:FzfPreviewProjectGrepRpc<Space>-F<Space>"<C-r>=substitute(substitute(@s, '\n', '', 'g'), '/', '\\/', 'g')<CR>"
nnoremap <silent> [fzf-p]t     :<C-u>FzfPreviewBufferTagsRpc<CR>
nnoremap <silent> [fzf-p]q     :<C-u>FzfPreviewQuickFixRpc<CR>
nnoremap <silent> [fzf-p]l     :<C-u>FzfPreviewLocationListRpc<CR>
```

#### Remote Plugin

```vim
nmap <Leader>f [fzf-p]
xmap <Leader>f [fzf-p]

nnoremap <silent> [fzf-p]p     :<C-u>FzfPreviewFromResources project_mru git<CR>
nnoremap <silent> [fzf-p]gs    :<C-u>FzfPreviewGitStatus<CR>
nnoremap <silent> [fzf-p]ga    :<C-u>FzfPreviewGitActions<CR>
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
nnoremap <silent> [fzf-p]ga    :<C-u>CocCommand fzf-preview.GitActions<CR>
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

### Base Fzf window Keymaps

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

" fzf window position settings
let g:fzf_preview_direct_window_option = ''

" fzf command default options
let g:fzf_preview_default_fzf_options = { '--reverse': v:true, '--preview-window': 'wrap' }

" Add fzf quit mapping
let g:fzf_preview_quit_map = 1

" jump to the buffers by default, when possible
let g:fzf_preview_buffers_jump = 0

" Commands used for fzf preview.
" The file name selected by fzf becomes {}
let g:fzf_preview_command = 'cat'                               " Not installed bat
" let g:fzf_preview_command = 'bat --color=always --plain {-1}' " Installed bat

" g:fzf_binary_preview_command is executed if this command succeeds, and g:fzf_preview_command is executed if it fails
let g:fzf_preview_if_binary_command = '[[ "$(file --mime {})" =~ binary ]]'

" Commands used for binary file
let g:fzf_binary_preview_command = 'echo "{} is a binary file"'

" Commands used to get the file list from project
let g:fzf_preview_filelist_command = 'git ls-files --exclude-standard'               " Not Installed ripgrep
" let g:fzf_preview_filelist_command = 'rg --files --hidden --follow --no-messages -g \!"* *"' " Installed ripgrep

" Commands used to get the file list from git repository
let g:fzf_preview_git_files_command = 'git ls-files --exclude-standard'

" Commands used to get the file list from current directory
let g:fzf_preview_directory_files_command = 'rg --files --hidden --follow --no-messages -g \!"* *"'

" Commands used to get the git status file list
let g:fzf_preview_git_status_command = 'git -c color.status=always status --short --untracked-files=all'

" Commands used for git status preview.
let g:fzf_preview_git_status_preview_command =  "[[ $(git diff --cached -- {-1}) != \"\" ]] && git diff --cached --color=always -- {-1} || " .
\ "[[ $(git diff -- {-1}) != \"\" ]] && git diff --color=always -- {-1} || " .
\ g:fzf_preview_command

" Commands used for project grep
let g:fzf_preview_grep_cmd = 'rg --line-number --no-heading --color=never --hidden'

" MRU and MRW cache directory
let g:fzf_preview_cache_directory = expand('~/.cache/vim/fzf_preview')

" If this value is not 0, disable mru and mrw
let g:fzf_preview_disable_mru = 0

" Limit of the number of files to be saved by mru
let g:fzf_preview_mru_limit = 1000

" Commands used for current file lines
let g:fzf_preview_lines_command = 'cat -n'                                " Not Installed bat
" let g:fzf_preview_lines_command = 'bat --color=always --plain --number' " Installed bat

" Commands used for preview of the grep result
let g:fzf_preview_grep_preview_cmd = expand('<sfile>:h:h') . '/bin/preview_fzf_grep'

" Cache directory for mru and mrw
let g:fzf_preview_cache_directory = expand('~/.cache/vim/fzf_preview')

" Keyboard shortcuts while fzf preview is active
let g:fzf_preview_preview_key_bindings = ''
" let g:fzf_preview_preview_key_bindings = 'ctrl-d:preview-page-down,ctrl-u:preview-page-up,?:toggle-preview'

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
let g:fzf_preview_fzf_preview_window_option = ''
" let g:fzf_preview_fzf_preview_window_option = 'up:30%'

" Use vim-devicons
let g:fzf_preview_use_dev_icons = 0

" Use fzf history option
let g:fzf_preview_history_dir = false
" let g:fzf_preview_history_dir = '~/.fzf'

" devicons character width
let g:fzf_preview_dev_icon_prefix_string_length = 3

" Devicons can make fzf-preview slow when the number of results is high
" By default icons are disable when number of results is higher that 5000
let g:fzf_preview_dev_icons_limit = 5000

" The theme used in the bat preview
$FZF_PREVIEW_PREVIEW_BAT_THEME = 'OneHalfDark'
```

### Command Options

Commented-out lines are settings for the coc extension.

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
nnoremap <Leader>G :<C-u>FzfPreviewProjectGrep . --resume<Space>
" nnoremap <Leader>G :<C-u>CocCommand fzf-preview.ProjectGrep . --resume<Space>
```

### Function

```vim
" Get the initial value of the open file processes
" processes_name is 'open-file', 'open-buffer' and 'open-bufnr'.
" plugin_type is 'remote', 'coc' or 'rpc'. Default value is 'remote'
call fzf_preview#remote#process#get_default_processes({processes_name}, {plugin_type})
```

## Release note

<details>
<summary>Changes history</summary>

- 2022/08/23 version 2.13.0
  - Implement coc TypeScript go to source definition resource.

- 2021/12/05 version 2.12.0
  - Implement vim-lsp resources.

- 2021/10/15 version 2.9.0
  - Implement coc outline resource.

- 2021/09/10 version 2.7.0
  - Implement vim help resource.

- 2021/09/08 version 2.6.0
  - Improve project files performance

- 2021/06/06 version 2.5.0
  - Implement --experimental-fast option.

- 2021/06/04 version 2.4.0
  - Implement [todo-comments.nvim](https://github.com/folke/todo-comments.nvim) resource.

- 2021/05/19 version 2.3.0
  - Implement fzf history option.

- 2021/05/18 version 2.2.0
  - Implement grep recall.

- 2021/01/16 version 2.0.7
  - Implement coc implementations resource.

- 2021/01/16 version 2.0.6
  - Implement [memolist.vim](https://github.com/glidenote/memolist.vim) resource.

- 2021/01/10 version 2.0.0
  - Release of stable version.
  - Change release from github actions.
  - Update latest npm packages.

- 2021/01/06 version 0.6.0
  - Update coc.nvim package version to 0.0.80.

- 2020/12/31 version 0.5.0
  - Implement Vim script RPC
    - Only need Vim and Node
  - **Breaking change**: The release branch of the Remote Plugin has been changed to release/remote.

- 2020/11/08 version 0.4.27
  - Add g:fzf_preview_direct_window_option option.

- 2020/11/07 version 0.4.26
  - Change buffer sort with mru order.
  - Add mru and mrw limit settings.
  - Improve grep preview highlight.

- 2020/10/30 version 0.4.24
  - Improved grep etc previews to scroll to the top of the file.

- 2020/10/4 version 0.4.20
  - Implement CommandPalette resource.

- 2020/10/4 version 0.4.17
  - Implement CocTypeDefinitions resource.

- 2020/07/30 version 0.4.7
  - Implement git reflog integration.

- 2020/07/30 version 0.4.6
  - Implement git stash integration.
  - Implement rename git branch.

- 2020/07/27 version 0.4.1
  - Implement create git branch.

- 2020/07/27 version 0.4.0
  - Implement interactive git integration. (`:FzfPreviewGitActions` and `:CocCommand fzf-preview.GitActions`)

- 2020/07/24 version 0.3.2
  - Remove g:fzf_preview_filelist_postprocess_command and to colorize the fzf window by default

- 2020/07/24 version 0.2.1
  - Change g:fzf_preview_default_fzf_options and g:fzf_preview_fzf_preview_window_option default value.
  - Fix export quickfix bug in grep.

- 2020/07/23 version 0.2.0
  - Improving the internal data structure.
  - Remove `FzfPreviewProjectCommandGrep` command. (Changes to the data structure have made implementation difficult)
  - Some bug fixes.

</details>

## Others

- How to use fish user?
  - Set the `set shell` and `$SHELL`.

```vim
set shell=/bin/zsh
let $SHELL = "/bin/zsh"
```

- Use true color preview in Neovim
  - Set the preview command to `COLORTERM=truecolor`

```vim
augroup fzf_preview
  autocmd!
  autocmd User fzf_preview#rpc#initialized call s:fzf_preview_settings() " fzf_preview#remote#initialized or fzf_preview#coc#initialized
augroup END

function! s:fzf_preview_settings() abort
  let g:fzf_preview_command = 'COLORTERM=truecolor ' . g:fzf_preview_command
  let g:fzf_preview_grep_preview_cmd = 'COLORTERM=truecolor ' . g:fzf_preview_grep_preview_cmd
endfunction
```

- `FzfPreviewVistaBufferCtags` does not work
  - Vista must be initialized. Run the Vista command once or write the following settings.

```vim
autocmd VimEnter * call vista#RunForNearestMethodOrFunction()
```

## License

The MIT License (MIT)
