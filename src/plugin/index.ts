import type { Neovim } from "coc.nvim"
import type { NvimPlugin } from "neovim"
import type { CommandOptions, NvimFunctionOptions } from "neovim/lib/host/NvimPlugin"
import type { VimValue } from "neovim/lib/types/VimValue"
import type { MessageConnection } from "vscode-jsonrpc"

// @ts-ignore
let remotePlugin: NvimPlugin = null
// @ts-ignore
let cocClient: Neovim = null
// @ts-ignore
let rpcClient: MessageConnection = null

export const setRemotePlugin = (initialPlugin: NvimPlugin): void => {
  remotePlugin = initialPlugin
}

export const setCocClient = (initialCocClient: Neovim): void => {
  cocClient = initialCocClient
}

export const setRpcClient = (initialRpcClient: MessageConnection): void => {
  rpcClient = initialRpcClient
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const remotePluginRegisterCommand = (name: string, fn: Function, options?: CommandOptions): void =>
  remotePlugin.registerCommand(name, fn, options)

// eslint-disable-next-line @typescript-eslint/ban-types
export const remotePluginRegisterFunction = (name: string, fn: Function, options?: NvimFunctionOptions): void =>
  remotePlugin.registerFunction(name, fn, options)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pluginCommand = (command: string): Promise<any> => {
  if (remotePlugin != null) {
    return remotePlugin.nvim.command(command)
  } else if (cocClient != null) {
    return cocClient.command(command)
  } else if (rpcClient != null) {
    return rpcClient.sendRequest("execCommand", { command })
  }

  throw new Error("Unexpected remote plugin, coc client and rpc client is not exists")
}

const convertRpcArgs = (args?: VimValue | ReadonlyArray<VimValue>) => {
  if (args == null) {
    return []
  } else if (Array.isArray(args)) {
    return args
  } else {
    return [args]
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pluginCall = (fname: string, args?: VimValue | ReadonlyArray<VimValue>): Promise<any> | null => {
  if (remotePlugin != null) {
    return remotePlugin.nvim.call(fname, args)
  } else if (cocClient != null) {
    return cocClient.call(fname, args)
  } else if (rpcClient != null) {
    return rpcClient.sendRequest("execCall", { fname, args: convertRpcArgs(args) })
  }

  throw new Error("Unexpected remote plugin, coc client and rpc client is not exists")
}

export const pluginGetVar = (name: string): Promise<VimValue | null> => {
  if (remotePlugin != null) {
    return remotePlugin.nvim.getVar(name)
  } else if (cocClient != null) {
    return cocClient.getVar(name)
  } else if (rpcClient != null) {
    return rpcClient.sendRequest("getVar", { name })
  }

  throw new Error("Unexpected remote plugin, coc client and rpc client is not exists")
}

export const pluginGetVvar = (name: string): Promise<VimValue> => {
  if (remotePlugin != null) {
    return remotePlugin.nvim.getVvar(name)
  } else if (cocClient != null) {
    return cocClient.getVvar(name)
  } else if (rpcClient != null) {
    return rpcClient.sendRequest("getVvar", name)
  }

  throw new Error("Unexpected remote plugin, coc client and rpc client is not exists")
}
