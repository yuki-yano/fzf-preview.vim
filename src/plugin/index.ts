import { NvimPlugin } from "neovim"
import { CommandOptions, NvimFunctionOptions } from "neovim/lib/host/NvimPlugin"
import { VimValue } from "neovim/lib/types/VimValue"

// @ts-ignore
export let plugin: NvimPlugin = null // eslint-disable-line import/no-mutable-exports

export const setPlugin = (initialPlugin: NvimPlugin) => {
  plugin = initialPlugin
}

export const pluginRegisterCommand = (name: string, fn: Function, options?: CommandOptions) =>
  plugin.registerCommand(name, fn, options)

export const pluginRegisterFunction = (name: string, fn: Function, options?: NvimFunctionOptions) =>
  plugin.registerFunction(name, fn, options)

export const pluginCall = (fname: string, args?: VimValue | Array<VimValue>) => plugin.nvim.call(fname, args)

export const getVar = (name: string) => plugin.nvim.getVar(name)
