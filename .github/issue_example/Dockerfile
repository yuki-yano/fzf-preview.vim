FROM ubuntu:focal

ENV DEBIAN_FRONTEND=noninteractive

# Neovim
RUN apt update && apt install -y ninja-build gettext libtool libtool-bin autoconf automake cmake g++ pkg-config unzip git

WORKDIR /usr/local/src
RUN git clone https://github.com/neovim/neovim.git

WORKDIR /usr/local/src/neovim
RUN make && make install

# zsh
RUN apt install -y zsh

# Node
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install -y nodejs

# Python
RUN apt install -y python python3 python3-pip
# RUN pip3 install neovim

# bat & ripgrep
# RUN apt install -y bat
# RUN apt install -y ripgrep

# Workaround for https://github.com/sharkdp/bat/issues/938
RUN apt install -y -o Dpkg::Options::="--force-overwrite" bat ripgrep

# fd
RUN apt install -y fd-find

# vim plugin
RUN sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
RUN mkdir -p /root/.config/nvim
RUN echo "call plug#begin('~/.vim/plugged') \n\
Plug 'junegunn/fzf', {'dir': '~/.fzf', 'do': './install --all'} \n\
Plug 'neoclide/coc.nvim', {'branch': 'release'} \n\
call plug#end() \n\
\n\
let g:coc_global_extensions = ['coc-fzf-preview'] \n" >> /root/.config/nvim/init.vim

RUN nvim -c "PlugInstall" -c "qa!"
RUN nvim -c "CocInstall -sync coc-fzf-preview" -c "qa!"

ENTRYPOINT ["nvim"]
