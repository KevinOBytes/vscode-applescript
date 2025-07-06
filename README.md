# AppleScript Support for VS Code

Rich AppleScript language support for Visual Studio Code.

## Features

- Syntax highlighting for AppleScript files (.scpt, .applescript, .scptd)
- Custom icon support for AppleScript files
- Run AppleScript files directly from the editor
- Basic IntelliSense using application dictionaries (SDEF files)
- Run only the selected AppleScript code
- Load additional dictionaries for IntelliSense

## Requirements

- Visual Studio Code 1.91.0 or higher

## Installation

You can install this extension through the VS Code Marketplace:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "AppleScript Support"
4. Click Install

To create a local VSIX package run `npx vsce package`.

## Usage

Open an AppleScript file and run the **Run AppleScript** command from the Command Palette (`Cmd+Shift+P`) or by right‑clicking in the editor. Use **Run Selected AppleScript** to execute just the highlighted code. Results are shown in a new terminal.

Use **Load AppleScript Dictionary** to select additional SDEF files and enhance the completion suggestions.

## Known Issues

Please report any issues on the [GitHub repository](https://github.com/KevinOBytes/vscode-applescript/issues).

## Development

1. Clone this repository and run `npm install`.
2. Open the folder in VS Code and press `F5` to start the Extension Development Host.
3. Run `npm test` to execute the unit tests.
4. Build a `.vsix` package with `npx vsce package`.

## Release Notes

### 0.0.1

Initial release:
- Basic syntax highlighting
- File icon support
- Run AppleScript command
- Preliminary dictionary-based completions

### 0.0.2

- Run selected AppleScript code
- Command to load additional dictionaries

## License

This project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE - see the LICENSE file for details.
