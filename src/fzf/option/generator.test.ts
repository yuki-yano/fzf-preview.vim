import { generateOptions } from "@/fzf/option/generator"
import { openFileProcesses as defaultProcesses } from "@/fzf/process/open-file"
import { pluginGetVar } from "@/plugin"
import type { ConvertedLines, FzfOptions, Processes } from "@/type"

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

  const otherDefaultProcesses: Processes = [
    {
      name: "",
      key: "",
      execute: (_: ConvertedLines) => {}
    },
    {
      name: "",
      key: "ctrl-a",
      execute: (_: ConvertedLines) => {}
    },
    {
      name: "",
      key: "ctrl-b",
      execute: (_: ConvertedLines) => {}
    },
    {
      name: "",
      key: "ctrl-c",
      execute: (_: ConvertedLines) => {}
    }
  ]

  describe("empty user processes", () => {
    it("open file process", async () => {
      expect(
        await generateOptions({
          fzfCommandDefaultOptions,
          defaultProcesses,
          userOptions: []
        })
      ).toEqual(fzfCommandDefaultOptions)
    })

    it("other default processes", async () => {
      fzfCommandDefaultOptions["--expect"] = ["", "ctrl-a", "ctrl-b", "ctrl-c"]
      expect(
        await generateOptions({
          fzfCommandDefaultOptions,
          defaultProcesses: otherDefaultProcesses,
          userOptions: []
        })
      ).toEqual(fzfCommandDefaultOptions)
    })
  })

  describe("set user processes", () => {
    it("open file processes", async () => {
      ;(pluginGetVar as jest.Mock).mockReturnValue(
        new Promise<Record<string, unknown>>((resolve) => {
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
      ).toEqual(fzfCommandDefaultOptions)
    })

    it("other processes (not open file processes)", async () => {
      ;(pluginGetVar as jest.Mock).mockReturnValue(
        new Promise<Record<string, unknown>>((resolve) => {
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
      ).toEqual(fzfCommandDefaultOptions)
    })
  })

  it("set user not dictionary processes", async () => {
    ;(pluginGetVar as jest.Mock).mockImplementation(() => {
      throw new Error("foo")
    })

    await expect(
      generateOptions({
        fzfCommandDefaultOptions,
        defaultProcesses,
        userProcessesName: "foo",
        userOptions: []
      })
    ).rejects.toThrow("foo")
  })

  it("empty user options", async () => {
    expect(
      await generateOptions({
        fzfCommandDefaultOptions,
        defaultProcesses,
        userOptions: []
      })
    ).toEqual(fzfCommandDefaultOptions)
  })

  it("added user options", async () => {
    const userOptions = [{ optionName: "foo" }, { optionName: "bar", value: "bar" }]
    const convertedUserOptions = {
      bar: "bar"
    }

    const generatedOptions = await generateOptions({
      fzfCommandDefaultOptions,
      defaultProcesses,
      userOptions
    })
    expect(generatedOptions).toEqual(expect.objectContaining(fzfCommandDefaultOptions))
    expect(generatedOptions).toEqual({ ...fzfCommandDefaultOptions, ...convertedUserOptions })
  })
})
