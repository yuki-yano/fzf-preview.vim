import { directlyConverter, splitSpacePopConverter } from "@/fzf/processor/converter"
import {
  editProcess,
  processorCreator,
  splitProcess,
  tabeditProcess,
  vsplitProcess
} from "@/fzf/processor/process"
import type { Processors } from "@/type"

const createDirectProcessor = processorCreator(directlyConverter)

export const directOpenFileProcessors: Processors = {
  "": createDirectProcessor(editProcess),
  "ctrl-x": createDirectProcessor(splitProcess),
  "ctrl-v": createDirectProcessor(vsplitProcess),
  "ctrl-t": createDirectProcessor(tabeditProcess)
}

const createSplitSpaceLastProcessor = processorCreator(splitSpacePopConverter)

export const splitSpaceOpenFileProcessors: Processors = {
  "": createSplitSpaceLastProcessor(editProcess),
  "ctrl-x": createSplitSpaceLastProcessor(splitProcess),
  "ctrl-v": createSplitSpaceLastProcessor(vsplitProcess),
  "ctrl-t": createSplitSpaceLastProcessor(tabeditProcess)
}
