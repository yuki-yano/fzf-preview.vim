import { NvimPlugin } from "neovim"

// @ts-ignore
export let plugin: NvimPlugin = null // eslint-disable-line import/no-mutable-exports

export const setPlugin = (initialPlugin: NvimPlugin) => {
  plugin = initialPlugin
}
