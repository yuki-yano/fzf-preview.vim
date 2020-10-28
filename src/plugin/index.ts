import type { Neovim } from "coc.nvim"
import type { NvimPlugin } from "neovim"
import type { AutocmdOptions, CommandOptions, NvimFunctionOptions } from "neovim/lib/host/NvimPlugin"
import type { VimValue } from "neovim/lib/types/VimValue"

// @ts-ignore
let remotePlugin: NvimPlugin = null // eslint-disable-line import/no-mutable-exports
// @ts-ignore
let cocClient: Neovim = null // eslint-disable-line import/no-mutable-exports

export const setRemotePlugin = (initialPlugin: NvimPlugin): void => {
  remotePlugin = initialPlugin
}

export const setCocClient = (initialCocClient: Neovim): void => {
  cocClient = initialCocClient
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const pluginRegisterCommand = (name: string, fn: Function, options?: CommandOptions): void =>
  remotePlugin.registerCommand(name, fn, options)

// eslint-disable-next-line @typescript-eslint/ban-types
export const pluginRegisterFunction = (name: string, fn: Function, options?: NvimFunctionOptions): void =>
  remotePlugin.registerFunction(name, fn, options)

// eslint-disable-next-line @typescript-eslint/ban-types
export const pluginRegisterAutocmd = (name: string, fn: Function, options: AutocmdOptions): void =>
  remotePlugin.registerAutocmd(name, fn, options)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pluginCommand = (arg: string): Promise<any> => {
  if (remotePlugin != null) {
    return remotePlugin.nvim.command(arg)
  } else if (cocClient != null) {
    return cocClient.command(arg)
  }

  throw new Error("Unexpected remote plugin and coc client is not exists")
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pluginCall = (fname: string, args?: VimValue | Array<VimValue>): Promise<any> | null => {
  if (remotePlugin != null) {
    return remotePlugin.nvim.call(fname, args)
  } else if (cocClient != null) {
    return cocClient.callFunction(fname, args)
  }

  throw new Error("Unexpected remote plugin and coc client is not exists")
}

export const pluginGetVar = (name: string): Promise<VimValue> => {
  if (remotePlugin != null) {
    return remotePlugin.nvim.getVar(name)
  } else if (cocClient != null) {
    return cocClient.getVar(name)
  }

  throw new Error("Unexpected remote plugin and coc client is not exists")
}

export const pluginGetVvar = (name: string): Promise<VimValue> => {
  if (remotePlugin != null) {
    return remotePlugin.nvim.getVvar(name)
  } else if (cocClient != null) {
    return cocClient.getVvar(name)
  }

  throw new Error("Unexpected remote plugin and coc client is not exists")
}
