# How to migrate to remote plugin (v2)

You can use Remote Plugin or coc extensions.

## Install

### Installing Remote Plugin

Install [Node](https://nodejs.org/), [Yarn](https://classic.yarnpkg.com/) and install the [neovim](https://www.npmjs.com/package/neovim) package with npm.

If you are using MacOS and Homebrew:

```shell
$ brew install node
$ npm install -g neovim
```

Run `$yarn install` and `:UpdateRemotePlugins` after installing the plugin.

Dein:

```vim
call dein#add('yuki-ycino/fzf-preview.vim', { 'build': 'yarn install' })
```

vim-plug:

```vim
Plug 'yuki-ycino/fzf-preview.vim', { 'do': ':FzfPreviewInstall' }
```

### Installing coc extensions

Install the [coc.nvim](https://github.com/neoclide/coc.nvim) and install coc-fzf-preview

```vim
:CocInstall coc-fzf-preview
```

## Change command name (only coc extensions)

`:FzfPreview{command_name}` to `:CocCommand fzf-preview.{command_name}`

Example: `:CocCommand fzf-preview.ProjectFiles`

## Change settings variable and function name

- variable
  - `g:fzf_preview_custom_default_processors` -> `g:fzf_preview_custom_processes['open-file']`
  - `g:fzf_preview_dev_icon_prefix_length` -> `g:fzf_preview_dev_icon_prefix_string_length`
- function
  - `fzf_preview#resource_processor#get_processors()` -> `fzf_preview#remote#process#get_default_processes('open-file', {plugin_type ('remote' or 'coc')})`
  - `fzf_preview#resource_processor#get_default_processors()` -> `fzf_preview#remote#process#get_default_processes('open-file', {plugin_type ('remote' or 'coc')})`

## Change command option

- `-processors` -> `--processes`
  - and remove global variable prefix. ( `-processors=g:foo_processors` to `--processes=foo_processors` )
- `-add-fzf-arg` -> `--add-fzf-arg`
- `-resume` -> `--resume`

## Remove settings variable and function

- variable
  - `g:fzf_preview_use_floating_window`
  - `g:fzf_preview_floating_window_winblend`
- function
  - `fzf_preview#command#get_common_command_options`
  - `fzf_preview#window#create_centered_floating_window()`
    - fzf has a floating window by default.

## Remove deprecated and experimental settings

- variable
  - `g:fzf_preview_split_key_map`
  - `g:fzf_preview_vsplit_key_map`
  - `g:fzf_preview_tabedit_key_map`
  - `g:fzf_preview_build_quickfix_key_map`
  - `g:fzf_preview_layout`
  - `g:fzf_preview_rate`
  - `g:fzf_full_preview_toggle_key`
- function
  - `fzf_preview#command#get_common_command_options`
- option
  - `-overwrite-fzf-args`
