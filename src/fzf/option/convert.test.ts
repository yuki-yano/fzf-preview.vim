import { fzfOptionsToStringArray, joinBind } from "@/fzf/option/convert"
import { FzfOptions } from "@/type"

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

describe("fzfOptionsToStringArray", () => {
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
      expect(fzfOptionsToStringArray(options)).toEqual([
        "--ansi",
        "--bind=ctrl-d:preview-page-down,ctrl-u:preview-page-up,?:toggle-preview",
        "--expect=ctrl-x,ctrl-v,ctrl-t",
      ])
    })

    it("delete ansi", () => {
      options["--ansi"] = undefined
      expect(fzfOptionsToStringArray(options)).toEqual([
        "--bind=ctrl-d:preview-page-down,ctrl-u:preview-page-up,?:toggle-preview",
        "--expect=ctrl-x,ctrl-v,ctrl-t",
      ])
    })

    it("string bind", () => {
      options["--bind"] = "foo"
      expect(fzfOptionsToStringArray(options)).toEqual(["--ansi", "--bind=foo", "--expect=ctrl-x,ctrl-v,ctrl-t"])
    })

    it("string expect", () => {
      options["--expect"] = "foo"
      expect(fzfOptionsToStringArray(options)).toEqual([
        "--ansi",
        "--bind=ctrl-d:preview-page-down,ctrl-u:preview-page-up,?:toggle-preview",
        "--expect=foo",
      ])
    })
  })

  describe("setting undefined options", () => {
    it('--foo: undefined, --bar: "bar"', () => {
      options = {
        "--foo": undefined,
        "--bar": "bar",
      }
      expect(fzfOptionsToStringArray(options)).toEqual(["--foo", "--bar=bar"])
    })

    it('use double quote in value: --foobar: ""foo bar""', () => {
      options = {
        "--foobar": "foo bar",
      }
      expect(fzfOptionsToStringArray(options)).toEqual(["--foobar=foo bar"])
    })

    // If not enclosed in double quotes, another args is used
    it('not use double quote in value: --foobar: "foo bar"', () => {
      options = {
        "--foobar": "foo bar",
      }
      expect(fzfOptionsToStringArray(options)).toEqual(["--foobar=foo bar"])
    })
  })
})
