const { execSync } = require("child_process")
const path = require("path")
const { existsSync } = require("fs")
const util = require("util")
const glob = util.promisify(require("glob"))

const BAT_THEME = process.env.FZF_PREVIEW_PREVIEW_BAT_THEME ?? "OneHalfDark"
const VIM_RUNTIME_DIR = process.env.VIMRUNTIME ?? ""
const HELP_ROOT_DIR = process.env.FZF_PREVIEW_PLUGIN_HELP_ROOT_DIR ?? ""

const GREP_OUTPUT_REGEX = /^(?<devIcon>.\s\s)?(?<fileName>[^:]+):(?<lineNum>\d+)(:(?<col>\d+))?(:(?<match>.*))?/

const expandHome = (filePath) => {
  if (filePath.startsWith("~")) {
    return path.join(process.env.HOME, filePath.slice(1))
  }

  return filePath
}

const isInstalled = (command) => {
  try {
    execSync(`which ${command.split(" ")[0]}`, { encoding: "utf-8" })
    return true
  } catch (_) {
    return false
  }
}

const main = async () => {
  const match = GREP_OUTPUT_REGEX.exec(process.argv[2])

  if (match == null) {
    console.log(
      "Cannot process the entry :(\n",
      "Please open an issue and describe what happened\n",
      "including information such as file name and g:fzf_preview_grep_cmd"
    )

    process.exit(1)
  }

  let fileName = match.groups["fileName"]
  const lineNum = Number(match.groups["lineNum"])

  if (!existsSync(fileName)) {
    let helpFileList = []
    if (VIM_RUNTIME_DIR != "") {
      helpFileList = await glob(`${VIM_RUNTIME_DIR}/doc/*`)
    }

    if (HELP_ROOT_DIR != "") {
      helpFileList = [...helpFileList, ...(await glob(`${expandHome(HELP_ROOT_DIR)}/**/doc/*`))]
    }

    const matchHelpFile = helpFileList.find((file) => file.split("/").slice(-1)[0] === fileName)
    if (matchHelpFile == null) {
      process.exit(1)
    } else {
      fileName = matchHelpFile
    }
  }

  const cats = [`bat --highlight-line="${lineNum}" --color=always --theme="${BAT_THEME}" --plain --number`, "cat"]
  const cat = cats.find((cat) => isInstalled(cat))

  const result = execSync(`${cat} ${fileName}`, { encoding: "utf-8" })

  if (cat === "cat") {
    for (const [index, line] of result.split("\n").entries()) {
      if (lineNum - 1 === index) {
        console.log(`\x1b[1m\x1b[4m\x1b[31m${line}\x1b[0m`)
      } else {
        console.log(line)
      }
    }
  } else {
    console.log(result)
  }
}

main()
