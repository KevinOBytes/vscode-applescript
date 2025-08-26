# AppleScript Support for VS Code

A comprehensive VS Code extension providing rich AppleScript language support with advanced features for macOS automation development.

## ✨ Features

- **Rich Syntax Highlighting** - Full AppleScript syntax highlighting for `.scpt`, `.applescript`, and `.scptd` files
- **Intelligent IntelliSense** - Auto-completion with 25+ built-in AppleScript keywords, control structures, and common commands
- **Custom File Icons** - Distinctive AppleScript file icons in the Explorer
- **Script Execution** - Run AppleScript files directly from the editor with `Cmd+R`
- **Selection Execution** - Execute only selected AppleScript code with `Cmd+Shift+R`
- **Dictionary Support** - Load additional application dictionaries (SDEF files) for enhanced IntelliSense
- **Code Snippets** - Pre-built code snippets for common AppleScript patterns
- **Error Handling** - Comprehensive error handling with helpful user feedback

## 🚀 Quick Start

### Installation

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "AppleScript Support"
4. Click Install

### Basic Usage

1. **Create or open** an AppleScript file (`.applescript` or `.scpt`)
2. **Write your script** with full syntax highlighting and IntelliSense support
3. **Run the script** by pressing `Cmd+R` or using the Command Palette (`Cmd+Shift+P`) → "Run AppleScript"
4. **Run selected code** by selecting text and pressing `Cmd+Shift+R`

### Example Script

```applescript
-- Simple AppleScript example
tell application "Finder"
    display dialog "Hello from AppleScript!" buttons {"OK"} default button 1
    beep 2
end tell
```

## 🎯 Available Commands

| Command | Keyboard Shortcut | Description |
|---------|-------------------|-------------|
| **Run AppleScript** | `Cmd+R` | Execute the current AppleScript file |
| **Run Selected AppleScript** | `Cmd+Shift+R` | Execute only the selected code |
| **Load AppleScript Dictionary** | - | Load additional SDEF files for better IntelliSense |

## 🛠️ Advanced Features

### IntelliSense Support

The extension provides intelligent auto-completion for:
- **Control structures**: `if`, `then`, `else`, `repeat`, `while`, `try`, `on error`
- **Common commands**: `tell`, `display dialog`, `display notification`, `log`, `beep`, `delay`
- **Data operations**: `set`, `get`, `copy`, `property`
- **Popular applications**: Finder, System Events, Terminal
- **Custom dictionaries**: Load SDEF files for application-specific commands

### Context Menus

Right-click in any AppleScript file to access:
- Run AppleScript
- Run Selected AppleScript (when text is selected)

### Code Snippets

Type these prefixes and press `Tab` to insert common patterns:
- `tell` → Tell application block
- `if` → If statement
- `ifelse` → If-else statement  
- `repeat` → Repeat loop
- `try` → Try-error block
- `dialog` → Display dialog
- `shell` → Shell script command
- `on` → Handler (function)

## ⚙️ Requirements

- **macOS** (AppleScript is macOS-specific)
- **VS Code** 1.91.0 or higher
- **osascript** command (included with macOS)

## 🔧 Configuration

No additional configuration required! The extension works out of the box with sensible defaults.

### Loading Custom Dictionaries

To enhance IntelliSense with application-specific commands:

1. Use Command Palette (`Cmd+Shift+P`)
2. Search for "Load AppleScript Dictionary"
3. Select an SDEF file from an application bundle

## 📝 Language Features

- **Syntax Highlighting** for all AppleScript constructs
- **Auto-closing pairs** for parentheses, quotes, and block comments
- **Smart indentation** and formatting
- **Comment toggling** with `Cmd+/`
- **Block comments** with `(*` and `*)`

## 🐛 Known Issues

- Script execution requires saving untitled files first
- Large scripts may take a moment to execute
- Some application-specific commands require the target app to be installed

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Clone the repository
2. Run `npm install` to install dependencies  
3. Press `F5` in VS Code to launch the Extension Development Host
4. Run `npm test` to execute unit tests
5. Use `npm run compile` to build the extension
6. Create a `.vsix` package with `npx vsce package`

## 📋 Release Notes

### 1.0.0 - Major Enhancement Release

**🎉 New Features:**
- Enhanced IntelliSense with 25+ built-in AppleScript completions
- Improved error handling and user feedback
- Keyboard shortcuts (`Cmd+R`, `Cmd+Shift+R`) 
- Context menu integration
- Better temporary file management

**🔧 Improvements:**
- Updated to modern VS Code APIs
- Comprehensive input validation
- Professional extension metadata
- Updated dependencies and security fixes

**🛠️ Technical:**
- Modern GitHub Actions workflows
- ESLint integration for code quality
- Automated security scanning
- Node.js LTS support

### 0.0.2 - Previous Version
- Run selected AppleScript code
- Command to load additional dictionaries

### 0.0.1 - Initial Release
- Basic syntax highlighting
- File icon support
- Run AppleScript command
- Preliminary dictionary-based completions

## 📄 License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for the macOS automation community**
