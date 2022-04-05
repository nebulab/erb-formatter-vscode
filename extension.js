const vscode = require("vscode")
const { ErbFormatter } = require("./erb-formatter")

async function activate(context) {
  const formatter = new ErbFormatter()
  context.subscriptions.push(formatter._channel)
  console.log({ language: "ruby" }, ErbFormatter)

  const disposable = vscode.languages.registerDocumentFormattingEditProvider(
    "erb",
    formatter
  )

  context.subscriptions.push(disposable)
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
