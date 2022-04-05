# ERB::Formatter 🪜 (for VSCode)

VSCode extension for the `ERB::Formatter` gem (https://github.com/nebulab/erb-formatter#readme).

## Features

- very fast
- attempts to limit length (configurable)
- tries to have an output similar to prettier for HTML
- indents correctly ruby blocks (e.g. `if`/`elsif`/`do`/`end`)
- designed to be integrated into editors and commit hooks
- gives meaningful output in case of errors (most of the time)
- will use multiline values for `class` and `data-action` attributes

## Requirements

Only requires the `erb` language to be defined, usually added by https://github.com/rubyide/vscode-ruby.

## Extension Settings

Include if your extension adds any VSCode settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `erb-formatter.commandPath`: Customize the full command for the ERB Formatter, includes bundler or any extra option.

## Release Notes

VSCode extension: https://github.com/nebulab/erb-formatter-vscode/releases
ERB::Formatter https://github.com/nebulab/erb-formatter/releases
