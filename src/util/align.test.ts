import { alignLists } from "@/util/align"

describe("align lists", () => {
  it("align 1 digit", () => {
    const lists = [
      ["1", "a"],
      ["2", "b"],
      ["3", "c"],
    ]

    expect(alignLists(lists)).toEqual([
      ["1", "a"],
      ["2", "b"],
      ["3", "c"],
    ])
  })

  it("align 3 digit", () => {
    const lists = [
      ["1", "foo"],
      ["10", "bar"],
      ["100", "foobar"],
    ]

    expect(alignLists(lists)).toEqual([
      ["1  ", "foo   "],
      ["10 ", "bar   "],
      ["100", "foobar"],
    ])
  })

  it("align 5 digit", () => {
    const lists = [
      ["1", "a"],
      ["10000", "bbbbb"],
    ]

    expect(alignLists(lists)).toEqual([
      ["1    ", "a    "],
      ["10000", "bbbbb"],
    ])
  })
})
