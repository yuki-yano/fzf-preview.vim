import { editConsumer, exportQuickfixConsumer, splitConsumer } from "@/fzf/process/consumer/open-file"
import { exportQuickFix, openFile } from "@/plugin/connector/open-file"

jest.mock("@/plugin/connector/open-file")

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
      }).rejects.toThrow("SelectedLine is invalid: ' foo'")
    })
  })

  describe("export quickfix", () => {
    beforeEach(() => {
      ;(exportQuickFix as jest.Mock).mockClear()
    })

    it("with only filename", async () => {
      const lines = ["foo.txt", "bar.txt"]
      await exportQuickfixConsumer.consume(lines)
      expect(exportQuickFix).toHaveBeenCalledWith([{ filename: "foo.txt" }, { filename: "bar.txt" }])
    })

    it("with filename, line number and text", async () => {
      const lines = ["foo.txt:10", "bar.txt:20 foobar"]
      await exportQuickfixConsumer.consume(lines)
      expect(exportQuickFix).toHaveBeenCalledWith([
        { filename: "foo.txt", lnum: 10, text: "" },
        { filename: "bar.txt", lnum: 20, text: "foobar" }
      ])
    })

    it("with invalid converted line", async () => {
      const lines = [" foo", " bar"]
      await expect(async () => {
        await exportQuickfixConsumer.consume(lines)
      }).rejects.toThrow("SelectedLine is invalid: ' foo'")
    })
  })
})
