import { parseFzfOption } from "@/args/fzf-option-parser"

describe("parseFzfOption", () => {
  it('parseFzfOption(["-add-fzf-args=-a"])', () => {
    expect(parseFzfOption(["-add-fzf-args=-a"])).toStrictEqual([
      {
        optionName: "-a"
      }
    ])
  })

  it('parseFzfOption(["-add-fzf-args=--foo"])', () => {
    expect(parseFzfOption(["-add-fzf-args=--foo"])).toStrictEqual([
      {
        optionName: "--foo"
      }
    ])
  })

  it('parseFzfOption(["-add-fzf-args=--foo", "-add-fzf-args=--bar"])', () => {
    expect(parseFzfOption(["-add-fzf-args=--foo", "-add-fzf-args=--bar"])).toStrictEqual([
      {
        optionName: "--foo"
      },
      {
        optionName: "--bar"
      }
    ])
  })

  it('parseFzfOption(["-add-fzf-args=--foo=bar"])', () => {
    expect(parseFzfOption(["-add-fzf-args=--foo=bar"])).toStrictEqual([
      {
        optionName: "--foo",
        value: "bar"
      }
    ])
  })

  it('parseFzfOption(["-add-fzf-args=--foo", "-add-fzf-args=--foobar=hoge"])', () => {
    expect(parseFzfOption(["-add-fzf-args=--foo", "-add-fzf-args=--foobar=hoge"])).toStrictEqual([
      {
        optionName: "--foo"
      },
      {
        optionName: "--foobar",
        value: "hoge"
      }
    ])
  })
})
