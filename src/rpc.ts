import * as rpc from "vscode-jsonrpc"

import { commandDefinition } from "@/association/command"
import { executeCommand } from "@/fzf/command"
import { getDefaultProcesses } from "@/fzf/function"
import { callProcess } from "@/fzf/handler"
import { executeProcess, processesDefinition } from "@/fzf/process"
import { setRpcClient } from "@/plugin"
import type { RpcCallProcessParams, RpcExecCommandParams, RpcExecProcessCallbackParams } from "@/type"

const connection = rpc.createMessageConnection(
  // @ts-ignore
  new rpc.StreamMessageReader(process.stdin), // eslint-disable-line @typescript-eslint/no-unsafe-call
  // @ts-ignore
  new rpc.StreamMessageWriter(process.stdout) // eslint-disable-line @typescript-eslint/no-unsafe-call
)

const getDefaultProcessesRequest = new rpc.RequestType<void, { [key: string]: { [key: string]: string } }, void>(
  "getDefaultProcesses"
)
connection.onRequest(getDefaultProcessesRequest, () => {
  const openFile = getDefaultProcesses("open-file")
  const openBuffer = getDefaultProcesses("open-buffer")
  const openBufnr = getDefaultProcesses("open-bufnr")
  const gitStatus = getDefaultProcesses("git-status")

  return {
    "open-file": openFile,
    "open-buffer": openBuffer,
    "open-bufnr": openBufnr,
    "git-status": gitStatus,
  }
})

const execCommandRequest = new rpc.RequestType<RpcExecCommandParams, void, void>("execCommand")
connection.onRequest(execCommandRequest, ({ commandName, args }) => {
  commandDefinition.forEach(async (fzfCommand) => {
    if (commandName === fzfCommand.commandName) {
      await executeCommand(args != null ? args : "", fzfCommand)
    }
  })
})

const callProcessRequest = new rpc.RequestType<RpcCallProcessParams, void, void>("callProcess")
connection.onRequest(callProcessRequest, async ({ lines }) => {
  await callProcess([lines])
})

const execProcessCallbackRequest = new rpc.RequestType<RpcExecProcessCallbackParams, void, void>("execProcessCallback")
connection.onRequest(execProcessCallbackRequest, ({ processName, lines }) => {
  processesDefinition.forEach(({ processes }) => {
    processes.forEach(async (process) => {
      if (processName === process.name) {
        await executeProcess(lines, process)
      }
    })
  })
})

setRpcClient(connection)
connection.listen()
