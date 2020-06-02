import type { FzfOptions } from "@/type"
import { generateOptions } from "@/fzf/option/generator"

const defaultOptions: FzfOptions = {
  "--ansi": true,
  "--bind": [
    {
      key: "ctrl-d",
      action: "preview-page-down"
    },
    {
      key: "ctrl-u",
      action: "preview-page-up"
    },
    {
      key: "?",
      action: "toggle-preview"
    }
  ],
  "--expect": ["ctrl-x", "ctrl-v", "ctrl-t"]
}

describe("generateOptions", () => {
  it("empty user options", () => {
    expect(generateOptions(defaultOptions, [])).toStrictEqual(defaultOptions)
  })

  it("added user options", () => {
    const userOptions = [{ optionName: "foo" }, { optionName: "bar", value: "bar" }]
    const convertedUserOptions = {
      foo: undefined,
      bar: "bar"
    }

    const generatedOptions = generateOptions(defaultOptions, userOptions)
    expect(generatedOptions).toEqual(expect.objectContaining(defaultOptions))
    expect(generatedOptions).toStrictEqual({ ...defaultOptions, ...convertedUserOptions })
  })
})
