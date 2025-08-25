# Change Log

All notable changes to the "AppleScript Support" extension will be documented in this file.

## [1.0.0] - 2024-12-19 - Major Enhancement Release

### 🎉 New Features
- **Enhanced IntelliSense**: Added 25+ built-in AppleScript keywords and common commands including:
  - Control structures (if, then, else, repeat, while, try, on error)
  - Common commands (tell, display dialog, log, beep, delay)
  - Data operations (set, get, copy, property)
  - Popular application references (Finder, System Events, Terminal)
- **Keyboard Shortcuts**: 
  - `Cmd+R` to run current AppleScript file
  - `Cmd+Shift+R` to run selected AppleScript code
- **Context Menu Integration**: Right-click to run scripts or selected code
- **Improved Error Handling**: Comprehensive error handling with helpful user feedback
- **Smart File Validation**: Validates file types and existence before execution
- **Professional Extension Metadata**: Complete marketplace-ready package configuration

### 🔧 Improvements
- **Better Temporary File Management**: Automatic cleanup of temporary files with tracking
- **Enhanced User Messages**: More informative success and error messages
- **Input Validation**: Proper validation for all user interactions
- **Security Improvements**: Better file access validation and error handling
- **Completion Triggers**: Auto-completion triggered on space, quotes, and parentheses
- **SDEF Dictionary Loading**: Improved dictionary loading with error handling

### 🛠️ Technical Enhancements
- **Modern GitHub Actions**: Updated workflows to use latest actions (v4)
- **Multi-Node Testing**: Support for Node.js 18.x and 20.x LTS versions
- **Security Scanning**: Added CodeQL analysis and dependency vulnerability scanning
- **Code Quality**: ESLint integration with TypeScript support
- **Automated Auditing**: Weekly dependency security scans
- **Improved Build Process**: Better compilation and packaging workflows

### 📦 Package & Configuration
- **Consolidated Configuration**: Merged package.json configurations
- **Updated Dependencies**: Fixed deprecated packages and security vulnerabilities
- **Optimized Packaging**: Improved .vscodeignore for smaller extension size
- **Marketplace Optimization**: Added proper categories, keywords, and gallery banner

### 🧪 Testing & Documentation
- **Enhanced Test Suite**: More comprehensive tests covering commands and completion
- **Improved Issue Templates**: Better bug report and feature request templates
- **Comprehensive README**: Detailed documentation with examples and usage guides
- **Better Code Examples**: Enhanced test files demonstrating AppleScript features

### 🐛 Bug Fixes
- Fixed test runner compatibility with updated glob package
- Resolved deprecated dependency warnings
- Fixed temporary file cleanup issues
- Improved error handling in dictionary loading

---

## [0.0.1] - 2024-03-XX (Previous Version)

### Added
- Initial release
- Syntax highlighting for AppleScript files
- Snippet support for common AppleScript patterns
- Smart bracket matching and auto-closing
- Support for line and block comments 