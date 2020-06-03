import type { FzfOptions } from "@/type"
import { generateOptions } from "@/fzf/option/generator"

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
      "--expect": ["ctrl-x", "ctrl-v", "ctrl-t"]
    }
  })

  it("empty user processors", async () => {
    expect(
      await generateOptions({
        fzfCommandDefaultOptions,
        userProcessorsName: undefined,
        userOptions: []
      })
    ).toStrictEqual(fzfCommandDefaultOptions)
  })

  it("set user processors", async () => {
    const mockGetVar = jest.fn().mockReturnValue(
      new Promise<object>((resolve) => {
        resolve({
          "ctrl-a": null,
          "ctrl-b": null,
          "ctrl-c": null
        })
      })
    )

    fzfCommandDefaultOptions["--expect"] = ["ctrl-a", "ctrl-b", "ctrl-c"]

    expect(
      await generateOptions(
        {
          fzfCommandDefaultOptions,
          userProcessorsName: "foo",
          userOptions: []
        },
        mockGetVar
      )
    ).toStrictEqual(fzfCommandDefaultOptions)
  })

  it("set user not dictionary processors", async () => {
    const mockGetVar = jest.fn(() => {
      throw new Error("foo")
    })

    try {
      await generateOptions(
        {
          fzfCommandDefaultOptions,
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

    const generatedOptions = await generateOptions({ fzfCommandDefaultOptions, userOptions })
    expect(generatedOptions).toEqual(expect.objectContaining(fzfCommandDefaultOptions))
    expect(generatedOptions).toStrictEqual({ ...fzfCommandDefaultOptions, ...convertedUserOptions })
  })
})
