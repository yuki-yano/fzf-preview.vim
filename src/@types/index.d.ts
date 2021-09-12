declare namespace NodeJS {
  interface ProcessEnv {
    readonly VIMRUNTIME: string
    readonly FZF_PREVIEW_PLUGIN_HELP_ROOT_DIR?: string
  }
}

declare const PLUGIN: {
  ENV: "remote" | "coc" | "rpc"
}
