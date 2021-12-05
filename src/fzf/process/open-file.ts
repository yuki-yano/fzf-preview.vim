import type { ReadonlyDeep } from "type-fest"

import {
  dropConsumer,
  editConsumer,
  editWithTagStackConsumer,
  exportQuickfixConsumer,
  splitConsumer,
  tabeditConsumer,
  vsplitConsumer,
} from "@/fzf/process/consumer/open-file"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createOpenFileProcess = createProcessCreator("open-file")

export const openFileProcesses: ReadonlyDeep<Processes> = [
  createOpenFileProcess("enter", editConsumer),
  createOpenFileProcess("ctrl-x", splitConsumer),
  createOpenFileProcess("ctrl-v", vsplitConsumer),
  createOpenFileProcess("ctrl-t", tabeditConsumer),
  createOpenFileProcess("ctrl-o", dropConsumer),
  createOpenFileProcess("ctrl-q", exportQuickfixConsumer),
]

const createOpenFileWithTagStackProcess = createProcessCreator("open-file-with-tag-stack")

export const openFileWithTagStackProcesses: ReadonlyDeep<Processes> = [
  createOpenFileWithTagStackProcess("enter", editWithTagStackConsumer),
  createOpenFileWithTagStackProcess("ctrl-x", splitConsumer),
  createOpenFileWithTagStackProcess("ctrl-v", vsplitConsumer),
  createOpenFileWithTagStackProcess("ctrl-t", tabeditConsumer),
  createOpenFileWithTagStackProcess("ctrl-o", dropConsumer),
  createOpenFileWithTagStackProcess("ctrl-q", exportQuickfixConsumer),
]
