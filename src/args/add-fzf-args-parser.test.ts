import { parseAddFzfArgs } from "@/args/add-fzf-args-parser"

describe("parseAddFzfArgs", () => {
  it('parseAddFzfArgs("--add-fzf-args=-a")', () => {
    expect(parseAddFzfArgs("--add-fzf-args=-a")).toStrictEqual([
      {
        optionName: "-a"
      }
    ])
  })

  it('parseAddFzfArgs("--add-fzf-args=--foo")', () => {
    expect(parseAddFzfArgs("--add-fzf-args=--foo")).toStrictEqual([
      {
        optionName: "--foo"
      }
    ])
  })

  it('parseAddFzfArgs("--add-fzf-args=--foo --add-fzf-args=--bar")', () => {
    expect(parseAddFzfArgs("--add-fzf-args=--foo --add-fzf-args=--bar")).toStrictEqual([
      {
        optionName: "--foo"
      },
      {
        optionName: "--bar"
      }
    ])
  })

  it('parseAddFzfArgs("--add-fzf-args=--foo=bar")', () => {
    expect(parseAddFzfArgs("--add-fzf-args=--foo=bar")).toStrictEqual([
      {
        optionName: "--foo",
        value: "bar"
      }
    ])
  })

  it('parseAddFzfArgs("--add-fzf-args=--foo --add-fzf-args=--foobar="hoge fuga"")', () => {
    expect(parseAddFzfArgs('--add-fzf-args=--foo --add-fzf-args=--foobar="hoge fuga"')).toStrictEqual([
      {
        optionName: "--foo"
      },
      {
        optionName: "--foobar",
        value: '"hoge fuga"'
      }
    ])
  })
})
