import { parseProcesses } from "@/args/processes-parser"

describe("parseProcesses", () => {
  it('parseProcesses("foo")', () => {
    expect(parseProcesses("foo")).toBeUndefined()
  })

  it('parseProcesses("--foo --processes=foo_processes")', () => {
    expect(parseProcesses("--processes=foo_processes")).toBe("foo_processes")
  })

  it('parseProcesses("--processes=foo_processes --processes=bar_processes")', () => {
    expect(() => {
      parseProcesses("--processes=foo_processes --processes=bar_processes")
    }).toThrow()
  })
})
