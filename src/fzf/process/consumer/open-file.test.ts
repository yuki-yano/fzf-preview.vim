import { exportQuickFix, openFile } from "@/connector/open-file"
import { editConsumer, exportQuickfixConsumer, splitConsumer } from "@/fzf/process/consumer/open-file"
import { executeCommandSelector } from "@/module/selector/execute-command"

jest.mock("@/connector/open-file")
jest.mock("@/module/selector/execute-command")

describe("open file consumer", () => {
  describe("open command", () => {
    beforeEach(() => {
      ;(openFile as jest.Mock).mockClear()
    })

    describe("with only filename", () => {
      it("edit open file consumer", async () => {
        const line = "foo.txt"
        await editConsumer.consume(line)
        expect(openFile).toHaveBeenCalledWith({ openCommand: "edit", file: "foo.txt" })
      })

      it("split open file consumer", async () => {
        const line = "foo.txt"
        await splitConsumer.consume(line)
        expect(openFile).toHaveBeenCalledWith({ openCommand: "split", file: "foo.txt" })
      })
    })

    it("with filename and line number", async () => {
      const line = "foo.txt:10"
      await editConsumer.consume(line)
      expect(openFile).toHaveBeenCalledWith({ openCommand: "edit", file: "foo.txt", lineNumber: 10 })
    })

    it("with filename, line number and text", async () => {
      const line = "foo.txt:10 bar"
      await editConsumer.consume(line)
      expect(openFile).toHaveBeenCalledWith({ openCommand: "edit", file: "foo.txt", lineNumber: 10 })
    })

    it("with invalid converted line", async () => {
      const line = " foo"
      await expect(async () => {
        await editConsumer.consume(line)
      }).rejects.toThrow("ConvertedLine is invalid: ' foo'")
    })
  })

  describe("export quickfix", () => {
    it("with only filename", async () => {
      ;(executeCommandSelector as jest.Mock).mockImplementation(() => ({ commandName: "fooCommand" }))
      const lines = ["foo.txt", "bar.txt"]
      await exportQuickfixConsumer.consume(lines)
      expect(exportQuickFix).toHaveBeenCalledWith([{ filename: "foo.txt" }, { filename: "bar.txt" }], {
        title: "fooCommand",
      })
    })

    it("with filename, line number and text", async () => {
      ;(executeCommandSelector as jest.Mock).mockImplementation(() => ({ commandName: "fooCommand" }))
      const lines = ["foo.txt:10", "bar.txt:20:foobar"]
      await exportQuickfixConsumer.consume(lines)
      expect(exportQuickFix).toHaveBeenCalledWith(
        [
          { filename: "foo.txt", lnum: 10, text: "" },
          { filename: "bar.txt", lnum: 20, text: "foobar" },
        ],
        { title: "fooCommand" }
      )
    })

    it("with invalid converted line", async () => {
      const lines = [" foo", " bar"]
      await expect(async () => {
        await exportQuickfixConsumer.consume(lines)
      }).rejects.toThrow("ConvertedLine is invalid: ' foo'")
    })
  })
})
