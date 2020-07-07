import { parseProcesses } from "@/args/processes-parser"

describe("parseProcesses", () => {
  it('parseProcesses("foo")', () => {
    expect(parseProcesses("open-file", "foo")).toBeUndefined()
  })

  it('parseProcesses("--foo --processes=foo_processes")', () => {
    expect(parseProcesses("open-file", "--processes=foo_processes")).toEqual({
      type: "global_variable",
      value: "foo_processes",
    })
  })

  it('parseProcesses("--processes=foo_processes --processes=bar_processes")', () => {
    expect(() => {
      parseProcesses("open-file", "--processes=foo_processes --processes=bar_processes")
    }).toThrow()
  })
})
