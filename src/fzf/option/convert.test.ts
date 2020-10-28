import { fzfOptionsToString, joinBind } from "@/fzf/option/convert"
import type { FzfOptions } from "@/type"

const defaultBind = [
  {
    key: "ctrl-d",
    action: "preview-page-down",
  },
  {
    key: "ctrl-u",
    action: "preview-page-up",
  },
  {
    key: "?",
    action: "toggle-preview",
  },
]

describe("joinBind", () => {
  it("bind option is array", () => {
    expect(joinBind(defaultBind)).toEqual("ctrl-d:preview-page-down,ctrl-u:preview-page-up,?:toggle-preview")
  })
})

describe("fzfOptionsToString", () => {
  let options: FzfOptions = {}

  describe("setting defined options", () => {
    beforeEach(() => {
      options = {
        "--ansi": true,
        "--bind": defaultBind,
        "--expect": ["ctrl-x", "ctrl-v", "ctrl-t"],
      }
    })

    it("default value", () => {
      expect(fzfOptionsToString(options)).toBe(
        '--ansi --bind=ctrl-d:preview-page-down,ctrl-u:preview-page-up,?:toggle-preview --expect="ctrl-x,ctrl-v,ctrl-t"'
      )
    })

    it("delete ansi", () => {
      options["--ansi"] = undefined
      expect(fzfOptionsToString(options)).toBe(
        '--bind=ctrl-d:preview-page-down,ctrl-u:preview-page-up,?:toggle-preview --expect="ctrl-x,ctrl-v,ctrl-t"'
      )
    })

    it("string bind", () => {
      options["--bind"] = '"foo"'
      expect(fzfOptionsToString(options)).toBe('--ansi --bind="foo" --expect="ctrl-x,ctrl-v,ctrl-t"')
    })

    it("string expect", () => {
      options["--expect"] = '"foo"'
      expect(fzfOptionsToString(options)).toBe(
        '--ansi --bind=ctrl-d:preview-page-down,ctrl-u:preview-page-up,?:toggle-preview --expect="foo"'
      )
    })
  })

  describe("setting undefined options", () => {
    it('--foo: undefined, --bar: "bar"', () => {
      options = {
        "--foo": undefined,
        "--bar": "bar",
      }
      expect(fzfOptionsToString(options)).toBe("--foo --bar=bar")
    })

    it('use double quote in value: --foobar: ""foo bar""', () => {
      options = {
        "--foobar": '"foo bar"',
      }
      expect(fzfOptionsToString(options)).toBe('--foobar="foo bar"')
    })

    // If not enclosed in double quotes, another args is used
    it('not use double quote in value: --foobar: "foo bar"', () => {
      options = {
        "--foobar": "foo bar",
      }
      expect(fzfOptionsToString(options)).toBe("--foobar=foo bar")
    })
  })
})
