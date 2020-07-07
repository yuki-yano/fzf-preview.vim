import { parseAddFzfArg } from "@/args/add-fzf-arg-parser"

describe("parseAddFzfArgs", () => {
  it('parseAddFzfArgs("--add-fzf-arg=-a")', () => {
    expect(parseAddFzfArg("--add-fzf-arg=-a")).toEqual([
      {
        optionName: "-a",
      },
    ])
  })

  it('parseAddFzfArgs("--add-fzf-arg=--foo")', () => {
    expect(parseAddFzfArg("--add-fzf-arg=--foo")).toEqual([
      {
        optionName: "--foo",
      },
    ])
  })

  it('parseAddFzfArgs("--add-fzf-arg=--foo --add-fzf-arg=--bar")', () => {
    expect(parseAddFzfArg("--add-fzf-arg=--foo --add-fzf-arg=--bar")).toEqual([
      {
        optionName: "--foo",
      },
      {
        optionName: "--bar",
      },
    ])
  })

  it('parseAddFzfArgs("--add-fzf-arg=--foo=bar")', () => {
    expect(parseAddFzfArg("--add-fzf-arg=--foo=bar")).toEqual([
      {
        optionName: "--foo",
        value: "bar",
      },
    ])
  })

  it('parseAddFzfArgs("--add-fzf-arg=--foo --add-fzf-arg=--foobar="hoge fuga"")', () => {
    expect(parseAddFzfArg('--add-fzf-arg=--foo --add-fzf-arg=--foobar="hoge fuga"')).toEqual([
      {
        optionName: "--foo",
      },
      {
        optionName: "--foobar",
        value: '"hoge fuga"',
      },
    ])
  })
})
