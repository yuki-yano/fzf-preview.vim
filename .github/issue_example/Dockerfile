FROM ubuntu:bionic

# Neovim
RUN apt-get update && apt install -y ninja-build gettext libtool libtool-bin autoconf automake cmake g++ pkg-config unzip git

WORKDIR /usr/local/src
RUN git clone https://github.com/neovim/neovim.git

WORKDIR /usr/local/src/neovim
RUN make && make install

# Node
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install -y nodejs

# Python
RUN apt install -y python

# bat
RUN curl -LO https://github.com/sharkdp/bat/releases/download/v0.15.4/bat_0.15.4_amd64.deb
RUN dpkg -i bat_0.15.4_amd64.deb

# ripgrep
RUN curl -LO https://github.com/BurntSushi/ripgrep/releases/download/11.0.2/ripgrep_11.0.2_amd64.deb
RUN dpkg -i ripgrep_11.0.2_amd64.deb

# fd
RUN curl -LO https://github.com/sharkdp/fd/releases/download/v8.1.1/fd_8.1.1_amd64.deb
RUN dpkg -i fd_8.1.1_amd64.deb

# vim plugin
RUN sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
RUN mkdir -p /root/.config/nvim
RUN echo "call plug#begin('~/.vim/plugged') \n\
Plug 'junegunn/fzf', {'dir': '~/.fzf', 'do': './install --all'} \n\
Plug 'neoclide/coc.nvim', {'branch': 'release'} \n\
call plug#end() \n\
\n\
let g:coc_global_extensions = ['coc-fzf-preview'] \n" >> /root/.config/nvim/init.vim

RUN nvim +PlugInstall +qa!

ENTRYPOINT ["nvim"]
