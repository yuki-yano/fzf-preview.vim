import { parseAddFzfArgs } from "@/args/add-fzf-args-parser"

describe("parseAddFzfArgs", () => {
  it('parseAddFzfArgs("--add-fzf-args=-a")', () => {
    expect(parseAddFzfArgs("--add-fzf-args=-a")).toEqual([
      {
        optionName: "-a"
      }
    ])
  })

  it('parseAddFzfArgs("--add-fzf-args=--foo")', () => {
    expect(parseAddFzfArgs("--add-fzf-args=--foo")).toEqual([
      {
        optionName: "--foo"
      }
    ])
  })

  it('parseAddFzfArgs("--add-fzf-args=--foo --add-fzf-args=--bar")', () => {
    expect(parseAddFzfArgs("--add-fzf-args=--foo --add-fzf-args=--bar")).toEqual([
      {
        optionName: "--foo"
      },
      {
        optionName: "--bar"
      }
    ])
  })

  it('parseAddFzfArgs("--add-fzf-args=--foo=bar")', () => {
    expect(parseAddFzfArgs("--add-fzf-args=--foo=bar")).toEqual([
      {
        optionName: "--foo",
        value: "bar"
      }
    ])
  })

  it('parseAddFzfArgs("--add-fzf-args=--foo --add-fzf-args=--foobar="hoge fuga"")', () => {
    expect(parseAddFzfArgs('--add-fzf-args=--foo --add-fzf-args=--foobar="hoge fuga"')).toEqual([
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
