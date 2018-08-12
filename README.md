# fzf-preview.vim

fzf-preview is a Neovim plugin to provide **some fzf sources to with preview.**

Neovim can operate fzf in terminal mode in Neovim.
By doing this, Neovim can manage the size of fzf's window.
Be careful when using it as vim may cause unstable behavior. Operation with vim can not be guaranteed.

This plugin does not use [fzf.vim](https://github.com/junegunn/fzf.vim) but uses the library attached to fzf.
Thought is different from this plugin, [fzf.vim](https://github.com/junegunn/fzf.vim) has a lot of functions.
[fzf.vim](https://github.com/junegunn/fzf.vim) has no preview of the project's file list and grep of the interactive project.

![fzf-preview](https://user-images.githubusercontent.com/5423775/37551910-a6de0e52-29ed-11e8-950a-c16d164218de.gif 'fzf-preview')

## Demo

**Select files while watching the preview with fzf**

![ProjectFilesPreview](https://user-images.githubusercontent.com/5423775/37551915-b0588a52-29ed-11e8-9bb6-3c892887fa28.gif 'ProjectFilesPreview')

**Select buffer with preview**

![BuffersPreview](https://user-images.githubusercontent.com/5423775/37553007-bc5484a4-2a02-11e8-8af8-7589bf32adae.gif 'BuffersPreview')

**Select files from oldfiles in the project**

![ProjectOldFiles](https://user-images.githubusercontent.com/5423775/37551924-c8c36972-29ed-11e8-97c4-133dd8a80870.gif 'ProjectOldFiles')

**Grep in project with preview and filtering**

![ProjectGrep](https://user-images.githubusercontent.com/5423775/37552077-19619716-29f1-11e8-8cdb-f208d9c27a9c.gif 'ProjectGrep')

**Select files from all oldfiles**

![OldFilesPreview](https://user-images.githubusercontent.com/5423775/37551927-d5e0eaee-29ed-11e8-869e-4cf4b70d4911.gif 'OldfilesPreview')

## Feature

1. Fast file and buffer search using fuzzy match and preview.
2. All file and history search in the project.
3. Real time preview of the selected file.
4. Searching from file history file using oldfiles.
5. Switch the buffer of fzf full-screen buffer and normal size buffer.
6. It is possible to interactively execute grep from within the project by specifying the directory
7. Highlight code in preview with ccat. (Optional)

## Requirements

* **Neovim** <https://neovim.io/>
* git <https://git-scm.com/>
* fzf <https://github.com/junegunn/fzf>

### Optional

* **ccat (Colorizing cat)** (Reccomended) <https://github.com/jingweno/ccat>
* ripgrep (Use ProjectGrepPreview command and default settings ProjectSearch commands and fast search) <https://github.com/BurntSushi/ripgrep>
* neomru.vim (require ProjectMruFilesPreview and MruFilesPreview) <https://github.com/Shougo/neomru.vim>

When ccat is installed you can highlight the preview and see it.

If it is not installed, head will be used

## Installation

Use [Dein](https://github.com/Shougo/dein.vim), [vim-plug](https://github.com/junegunn/vim-plug) or any Vim plugin manager of your choice.

If you are using MacOS and installed fzf using Homebrew
suffice:

```vim
set  runtimepath+=/usr/local/opt/fzf
call dein#add('yuki-ycino/fzf-preview.vim')
```

You install fzf as well using Dein:

```vim
call dein#add('junegunn/fzf', { 'build': './install --all', 'merged': 0 })
call dein#add('yuki-ycino/fzf-preview.vim')
```

## Usage

```vim
:ProjectFilesPreview              " Select project files

:GitFilesPreview                  " Select git status listed file

:BuffersPreview                   " Select buffers

:ProjectOldFilesPreview           " Select project files from oldfiles

:ProjectMruFilesPreview           " Select project mru files with neomru

:ProjectGrepPreview {dir or none} " Grep project files from args dir

:OldFilesPreview                  " Select files from oldfiles

:MruFilesPreview                  " Select mru files with neomru
```

## Keymap

    <C-s> (Neovim Only)
      Toggle window size of fzf, normal size and full-screen

    <C-d>
      Preview page down

    <C-u>
      Preview page up

    <C-t> or ?
      Toggle display of preview screen

## Optional Configuration Tips

* Increase the number of file history:

```vim
" oldfiles uses viminfo, but the default setting is 100
" Change the number by setting it in viminfo with a single quote.
" Ref: viminfo-'
set viminfo='1000
```

* Set values for each variable. The default settings are as follows.

```vim
" Add fzf quit mapping
g:fzf_preview_quit_map = 1

" fzf window layout
let g:fzf_preview_layout = 'top split new'

" Rate of fzf window
let g:fzf_preview_rate =  0.3

" Key to toggle fzf window size of normal size and full-screen
let g:fzf_full_preview_toggle_key = '<C-s>'

" Commands used for fzf preview.
" The file name selected by fzf becomes {}
let g:fzf_preview_command = 'head -100 {}'           " Not installed ccat
let g:fzf_preview_command = 'ccat --color=always {}' " Installed ccat

" Commands used for binary file
let g:fzf_binary_preview_command = 'echo "{} is a binary file"'

" Commands used to get the file list from project
let g:fzf_preview_filelist_command = 'git ls-files --exclude-standard'               " Not Installed ripgrep
let g:fzf_preview_filelist_command = 'rg --files --hidden --follow --glob "!.git/*"' " Installed ripgrep

" Commands used for project grep
let g:fzf_preview_grep_cmd = 'rg --line-number --no-heading'
```

# License

The MIT License (MIT)
