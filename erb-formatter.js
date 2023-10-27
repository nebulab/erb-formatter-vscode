const vscode = require("vscode")
const { execSync } = require("child_process")
const path = require("path")
const { hrtime } = require("process")

class ErbFormatter {
  constructor() {
    this._channel = vscode.window.createOutputChannel("erb formatter")
    this._config = vscode.workspace.getConfiguration("erb-formatter")
  }

  provideDocumentFormattingEdits(document) {
    const erbFormatCommand = this._config["commandPath"]
    const lineLength = this._config["lineLength"] || 80
    const cmd = `${erbFormatCommand} --stdin-filename "${document.fileName}" --print-width ${lineLength}`
    const projectDir = this.getCurrentPath(document.fileName)
    const originalSource = document.getText()

    const output = this.execSync(cmd, {
      cwd: projectDir,
      input: originalSource,
    })

    return [new vscode.TextEdit(this.getFullRange(document), output.toString())]
  }

  execSync(cmd, { cwd, input }) {
    try {
      this.log(`executing: ${cmd}`)
      const startTime = hrtime()
      const output = execSync(cmd, { cwd, input })
      const [secs, nanosecs] = hrtime(startTime)
      this.log(`completed in ${secs}s ${Math.round(nanosecs / 1000000)}ms`)
      return output
    } catch (e) {
      this.log(`failed: \n${e.message}`)
      if (this.detectBundledErbFormatter()) {
        vscode.window.showErrorMessage(
          "erb-formatter not found by bundler. Add `gem 'erb-formatter'` to your Gemfile and run `bundle install`."
        )
      } else {
        vscode.window.showErrorMessage(`format-erb failed: ${e.message}`)
      }
      return input
    }
  }

  firstWorkspace() {
    return vscode.workspace.workspaceFolders &&
      vscode.workspace.workspaceFolders[0]
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : null
  }

  getCurrentPath(fileName) {
    return this.firstWorkspace() || path.dirname(fileName)
  }

  detectBundledErbFormatter() {
    try {
      execSync(`${this._config["bundlerPath"]} show erb-formatter`, {
        cwd: this.firstWorkspace() || undefined,
      })
      return true
    } catch (e) {
      return false
    }
  }

  log(text) {
    console.log(text)
    this._channel.appendLine(text)
  }

  getFullRange(document) {
    return new vscode.Range(
      new vscode.Position(0, 0),
      document.lineAt(document.lineCount - 1).range.end
    )
  }
}

module.exports = { ErbFormatter }
