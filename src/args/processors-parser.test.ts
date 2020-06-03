import { parseProcessors } from "@/args/processors-parser"

describe("parseProcessors", () => {
  it('parseProcessors("foo")', () => {
    expect(parseProcessors("foo")).toBeUndefined()
  })

  it('parseProcessors("--foo --processors=foo_processors")', () => {
    expect(parseProcessors("--processors=foo_processors")).toBe("foo_processors")
  })

  it('parseProcessors("--processors=foo_processors --processors=bar_processors")', () => {
    expect(() => {
      parseProcessors("--processors=foo_processors --processors=bar_processors")
    }).toThrow()
  })
})
