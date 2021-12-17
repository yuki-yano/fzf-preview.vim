import * as rpc from "vscode-jsonrpc"

import { commandDefinition } from "@/association/command"
import { dispatchResumeQuery } from "@/connector/resume"
import { executeCommand } from "@/fzf/command"
import { getDefaultProcesses } from "@/fzf/function"
import { callProcess } from "@/fzf/handler"
import { executeProcess, processesDefinition } from "@/fzf/process"
import { setRpcClient } from "@/plugin"
import type {
  DispatchResumeQueryParams,
  RpcCallProcessParams,
  RpcExecCommandParams,
  RpcExecProcessCallbackParams,
} from "@/type"

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
  const openFileWithTagStack = getDefaultProcesses("open-file-with-tag-stack")
  const openBuffer = getDefaultProcesses("open-buffer")
  const openBufnr = getDefaultProcesses("open-bufnr")
  const gitStatus = getDefaultProcesses("git-status")

  return {
    "open-file": openFile,
    "open-file-with-tag-stack": openFileWithTagStack,
    "open-buffer": openBuffer,
    "open-bufnr": openBufnr,
    "git-status": gitStatus,
  }
})

const execCommandRequest = new rpc.RequestType<RpcExecCommandParams, void, void>("execCommand")
connection.onRequest(execCommandRequest, async ({ commandName, args }) => {
  for (const fzfCommand of commandDefinition) {
    if (commandName === fzfCommand.commandName) {
      // eslint-disable-next-line no-await-in-loop
      await executeCommand(args != null ? args : "", fzfCommand)

      return
    }
  }
})

const callProcessRequest = new rpc.RequestType<RpcCallProcessParams, void, void>("callProcess")
connection.onRequest(callProcessRequest, async ({ lines }) => {
  await callProcess([lines])
})

const execProcessCallbackRequest = new rpc.RequestType<RpcExecProcessCallbackParams, void, void>("execProcessCallback")
connection.onRequest(execProcessCallbackRequest, async ({ processName, lines }) => {
  for (const { processes } of processesDefinition) {
    for (const process of processes) {
      if (processName === process.name) {
        // eslint-disable-next-line no-await-in-loop
        await executeProcess(lines, process)

        return
      }
    }
  }
})

const dispatchResumeQueryRequest = new rpc.RequestType<DispatchResumeQueryParams, void, void>("dispatchResumeQuery")
connection.onRequest(dispatchResumeQueryRequest, ({ commandName, query }) => {
  dispatchResumeQuery([commandName, query])
})

setRpcClient(connection)
connection.listen()
