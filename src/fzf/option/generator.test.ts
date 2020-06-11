import { generateOptions } from "@/fzf/option/generator"
import { directOpenFileProcessors as defaultProcessors } from "@/fzf/processor"
import { pluginGetVar } from "@/plugin"
import type { FzfOptions, Processors } from "@/type"

jest.mock("@/plugin")

describe("generateOptions", () => {
  let fzfCommandDefaultOptions: FzfOptions = {}

  beforeEach(() => {
    fzfCommandDefaultOptions = {
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
      "--expect": ["", "ctrl-x", "ctrl-v", "ctrl-t", "ctrl-q"]
    }
  })

  describe("empty user processors", () => {
    it("open file processor", async () => {
      expect(
        await generateOptions({
          fzfCommandDefaultOptions,
          defaultProcessors,
          userProcessorsName: undefined,
          userOptions: []
        })
      ).toStrictEqual(fzfCommandDefaultOptions)
    })

    it("other default processors", async () => {
      const processorsFunc = (lines: Array<string>) => lines
      const otherDefaultProcessors: Processors = {
        "": processorsFunc,
        "ctrl-a": processorsFunc,
        "ctrl-b": processorsFunc,
        "ctrl-c": processorsFunc
      }

      fzfCommandDefaultOptions["--expect"] = ["", "ctrl-a", "ctrl-b", "ctrl-c"]
      expect(
        await generateOptions({
          fzfCommandDefaultOptions,
          defaultProcessors: otherDefaultProcessors,
          userProcessorsName: undefined,
          userOptions: []
        })
      ).toStrictEqual(fzfCommandDefaultOptions)
    })
  })

  describe("set user processors", () => {
    it("open file processors", async () => {
      ;(pluginGetVar as jest.Mock).mockReturnValue(
        new Promise<object>((resolve) => {
          resolve({
            "": null,
            "ctrl-d": null,
            "ctrl-e": null,
            "ctrl-f": null
          })
        })
      )

      fzfCommandDefaultOptions["--expect"] = ["", "ctrl-d", "ctrl-e", "ctrl-f"]

      expect(
        await generateOptions({
          fzfCommandDefaultOptions,
          defaultProcessors,
          userProcessorsName: "foo",
          userOptions: []
        })
      ).toStrictEqual(fzfCommandDefaultOptions)
    })

    it("open file processors", async () => {
      const processorsFunc = (lines: Array<string>) => lines
      const otherDefaultProcessors: Processors = {
        "": processorsFunc,
        "ctrl-a": processorsFunc,
        "ctrl-b": processorsFunc,
        "ctrl-c": processorsFunc
      }

      ;(pluginGetVar as jest.Mock).mockReturnValue(
        new Promise<object>((resolve) => {
          resolve({
            "": null,
            "ctrl-d": null,
            "ctrl-e": null,
            "ctrl-f": null
          })
        })
      )

      fzfCommandDefaultOptions["--expect"] = ["", "ctrl-d", "ctrl-e", "ctrl-f"]

      expect(
        await generateOptions({
          fzfCommandDefaultOptions,
          defaultProcessors: otherDefaultProcessors,
          userProcessorsName: "foo",
          userOptions: []
        })
      ).toStrictEqual(fzfCommandDefaultOptions)
    })
  })

  it("set user not dictionary processors", async () => {
    ;(pluginGetVar as jest.Mock).mockImplementation(() => {
      throw new Error("foo")
    })

    try {
      await generateOptions({
        fzfCommandDefaultOptions,
        defaultProcessors,
        userProcessorsName: "foo",
        userOptions: []
      })
    } catch (error) {
      expect(error.message).toBe("foo")
    }
  })

  it("empty user options", async () => {
    expect(
      await generateOptions({
        fzfCommandDefaultOptions,
        defaultProcessors,
        userOptions: []
      })
    ).toStrictEqual(fzfCommandDefaultOptions)
  })

  it("added user options", async () => {
    const userOptions = [{ optionName: "foo" }, { optionName: "bar", value: "bar" }]
    const convertedUserOptions = {
      foo: undefined,
      bar: "bar"
    }

    const generatedOptions = await generateOptions({
      fzfCommandDefaultOptions,
      defaultProcessors,
      userOptions
    })
    expect(generatedOptions).toEqual(expect.objectContaining(fzfCommandDefaultOptions))
    expect(generatedOptions).toStrictEqual({ ...fzfCommandDefaultOptions, ...convertedUserOptions })
  })
})
