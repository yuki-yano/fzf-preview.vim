import type { FzfOptions, Processors } from "@/type"
import { generateOptions } from "@/fzf/option/generator"
import { openFileProcessors as defaultProcessors } from "@/fzf/processor"

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
      "--expect": ["", "ctrl-x", "ctrl-v", "ctrl-t"]
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
      const mockGetVar = jest.fn().mockReturnValue(
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
        await generateOptions(
          {
            fzfCommandDefaultOptions,
            defaultProcessors,
            userProcessorsName: "foo",
            userOptions: []
          },
          mockGetVar
        )
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

      const mockGetVar = jest.fn().mockReturnValue(
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
        await generateOptions(
          {
            fzfCommandDefaultOptions,
            defaultProcessors: otherDefaultProcessors,
            userProcessorsName: "foo",
            userOptions: []
          },
          mockGetVar
        )
      ).toStrictEqual(fzfCommandDefaultOptions)
    })
  })

  it("set user not dictionary processors", async () => {
    const mockGetVar = jest.fn(() => {
      throw new Error("foo")
    })

    try {
      await generateOptions(
        {
          fzfCommandDefaultOptions,
          defaultProcessors,
          userProcessorsName: "foo",
          userOptions: []
        },
        mockGetVar
      )
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
