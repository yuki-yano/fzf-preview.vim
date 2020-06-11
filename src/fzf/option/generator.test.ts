import { generateOptions } from "@/fzf/option/generator"
import { openFileProcesses as defaultProcesses } from "@/fzf/process"
import { pluginGetVar } from "@/plugin"
import type { FzfOptions, Processes, SelectedLines } from "@/type"

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

  describe("empty user processes", () => {
    it("open file process", async () => {
      expect(
        await generateOptions({
          fzfCommandDefaultOptions,
          defaultProcesses,
          userProcessesName: undefined,
          userOptions: []
        })
      ).toStrictEqual(fzfCommandDefaultOptions)
    })

    it("other default processes", async () => {
      const process = {
        execute: (_: SelectedLines) => {}
      }
      const otherDefaultProcesses: Processes = {
        "": process,
        "ctrl-a": process,
        "ctrl-b": process,
        "ctrl-c": process
      }

      fzfCommandDefaultOptions["--expect"] = ["", "ctrl-a", "ctrl-b", "ctrl-c"]
      expect(
        await generateOptions({
          fzfCommandDefaultOptions,
          defaultProcesses: otherDefaultProcesses,
          userProcessesName: undefined,
          userOptions: []
        })
      ).toStrictEqual(fzfCommandDefaultOptions)
    })
  })

  describe("set user processes", () => {
    it("open file processes", async () => {
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
          defaultProcesses,
          userProcessesName: "foo",
          userOptions: []
        })
      ).toStrictEqual(fzfCommandDefaultOptions)
    })

    it("open file processes", async () => {
      const process = {
        execute: (_: SelectedLines) => {}
      }
      const otherDefaultProcesses: Processes = {
        "": process,
        "ctrl-a": process,
        "ctrl-b": process,
        "ctrl-c": process
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
          defaultProcesses: otherDefaultProcesses,
          userProcessesName: "foo",
          userOptions: []
        })
      ).toStrictEqual(fzfCommandDefaultOptions)
    })
  })

  it("set user not dictionary processes", async () => {
    ;(pluginGetVar as jest.Mock).mockImplementation(() => {
      throw new Error("foo")
    })

    try {
      await generateOptions({
        fzfCommandDefaultOptions,
        defaultProcesses,
        userProcessesName: "foo",
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
        defaultProcesses,
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
      defaultProcesses,
      userOptions
    })
    expect(generatedOptions).toEqual(expect.objectContaining(fzfCommandDefaultOptions))
    expect(generatedOptions).toStrictEqual({ ...fzfCommandDefaultOptions, ...convertedUserOptions })
  })
})
