import type { ReadonlyDeep } from "type-fest"

import type { argsParser } from "@/args/parser"

export type ArgsOptions = ReadonlyDeep<ReturnType<ReturnType<typeof argsParser>["parse"]>>
