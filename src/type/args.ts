import type { argsParser } from "@/args/parser"

export type ArgsOptions = ReturnType<ReturnType<typeof argsParser>["parse"]>
