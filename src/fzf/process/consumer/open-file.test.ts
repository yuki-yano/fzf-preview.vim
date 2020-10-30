import { exportQuickFix, openFile } from "@/connector/open-file"
import { editConsumer, exportQuickfixConsumer, splitConsumer } from "@/fzf/process/consumer/open-file"
import { executeCommandSelector } from "@/module/selector/execute-command"
import type { FileData, LineData } from "@/type"

jest.mock("@/connector/open-file")
jest.mock("@/module/selector/execute-command")

describe("open file consumer", () => {
  describe("open command", () => {
    describe("with only filename", () => {
      it("edit open file consumer", async () => {
        const data: FileData = {
          command: "FzfPreviewProjectFiles",
          type: "file",
          file: "foo.txt",
        }
        await editConsumer.consume(data)
        expect(openFile).toHaveBeenCalledWith({ openCommand: "edit", file: "foo.txt" })
      })

      it("split open file consumer", async () => {
        const data: FileData = {
          command: "FzfPreviewProjectFiles",
          type: "file",
          file: "foo.txt",
        }
        await splitConsumer.consume(data)
        expect(openFile).toHaveBeenCalledWith({ openCommand: "split", file: "foo.txt" })
      })
    })

    it("with filename and line number", async () => {
      const data: LineData = {
        command: "FzfPreviewProjectGrep",
        type: "line",
        file: "foo.txt",
        lineNumber: 10,
        text: "",
      }
      await editConsumer.consume(data)
      expect(openFile).toHaveBeenCalledWith({ openCommand: "edit", file: "foo.txt", lineNumber: 10 })
    })

    it("with filename, line number and text", async () => {
      const data: LineData = {
        command: "FzfPreviewProjectGrep",
        type: "line",
        file: "foo.txt",
        lineNumber: 10,
        text: "bar",
      }
      await editConsumer.consume(data)
      expect(openFile).toHaveBeenCalledWith({ openCommand: "edit", file: "foo.txt", lineNumber: 10 })
    })
  })

  describe("export quickfix", () => {
    it("with only filename", async () => {
      ;(executeCommandSelector as jest.Mock).mockImplementation(() => ({ commandName: "fooCommand" }))
      const dataList: Array<FileData> = [
        {
          command: "FzfPreviewProjectFiles",
          type: "file",
          file: "foo.txt",
        },
        {
          command: "FzfPreviewProjectFiles",
          type: "file",
          file: "bar.txt",
        },
      ]
      await exportQuickfixConsumer.consume(dataList)
      expect(exportQuickFix).toHaveBeenCalledWith([{ filename: "foo.txt" }, { filename: "bar.txt" }], {
        title: "fooCommand",
      })
    })

    it("with filename, line number and text", async () => {
      ;(executeCommandSelector as jest.Mock).mockImplementation(() => ({ commandName: "fooCommand" }))
      const dataList: Array<LineData> = [
        {
          command: "FzfPreviewProjectGrep",
          type: "line",
          file: "foo.txt",
          text: "",
          lineNumber: 10,
        },
        {
          command: "FzfPreviewProjectGrep",
          type: "line",
          file: "bar.txt",
          text: "foobar",
          lineNumber: 20,
        },
      ]
      await exportQuickfixConsumer.consume(dataList)
      expect(exportQuickFix).toHaveBeenCalledWith(
        [
          { filename: "foo.txt", lnum: 10, text: "" },
          { filename: "bar.txt", lnum: 20, text: "foobar" },
        ],
        { title: "fooCommand" }
      )
    })
  })
})
