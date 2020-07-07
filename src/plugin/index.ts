import { NvimPlugin } from "neovim"
import { AutocmdOptions, CommandOptions, NvimFunctionOptions } from "neovim/lib/host/NvimPlugin"
import { VimValue } from "neovim/lib/types/VimValue"

// @ts-ignore
export let plugin: NvimPlugin = null // eslint-disable-line import/no-mutable-exports

export const setPlugin = (initialPlugin: NvimPlugin): void => {
  plugin = initialPlugin
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const pluginRegisterCommand = (name: string, fn: Function, options?: CommandOptions): void =>
  plugin.registerCommand(name, fn, options)

// eslint-disable-next-line @typescript-eslint/ban-types
export const pluginRegisterFunction = (name: string, fn: Function, options?: NvimFunctionOptions): void =>
  plugin.registerFunction(name, fn, options)

// eslint-disable-next-line @typescript-eslint/ban-types
export const pluginRegisterAutocmd = (name: string, fn: Function, options: AutocmdOptions): void =>
  plugin.registerAutocmd(name, fn, options)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pluginCommand = (arg: string): Promise<any> => plugin.nvim.command(arg)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pluginCall = (fname: string, args?: VimValue | Array<VimValue>): Promise<any> =>
  plugin.nvim.call(fname, args)

export const pluginGetVar = (name: string): Promise<VimValue> => plugin.nvim.getVar(name)

export const pluginGetVvar = (name: string): Promise<VimValue> => plugin.nvim.getVvar(name)
