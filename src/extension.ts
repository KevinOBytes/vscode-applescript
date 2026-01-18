import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

let dictionary: vscode.CompletionItem[] = [];
let tempFiles: string[] = [];

// Built-in AppleScript keywords and common commands
const builtInCompletions: vscode.CompletionItem[] = [
    // Control structures
    new vscode.CompletionItem('if', vscode.CompletionItemKind.Keyword),
    new vscode.CompletionItem('then', vscode.CompletionItemKind.Keyword),
    new vscode.CompletionItem('else', vscode.CompletionItemKind.Keyword),
    new vscode.CompletionItem('end if', vscode.CompletionItemKind.Keyword),
    new vscode.CompletionItem('repeat', vscode.CompletionItemKind.Keyword),
    new vscode.CompletionItem('end repeat', vscode.CompletionItemKind.Keyword),
    new vscode.CompletionItem('while', vscode.CompletionItemKind.Keyword),
    new vscode.CompletionItem('try', vscode.CompletionItemKind.Keyword),
    new vscode.CompletionItem('on error', vscode.CompletionItemKind.Keyword),
    new vscode.CompletionItem('end try', vscode.CompletionItemKind.Keyword),
    
    // Common commands
    new vscode.CompletionItem('tell', vscode.CompletionItemKind.Function),
    new vscode.CompletionItem('end tell', vscode.CompletionItemKind.Function),
    new vscode.CompletionItem('display dialog', vscode.CompletionItemKind.Function),
    new vscode.CompletionItem('display notification', vscode.CompletionItemKind.Function),
    new vscode.CompletionItem('log', vscode.CompletionItemKind.Function),
    new vscode.CompletionItem('beep', vscode.CompletionItemKind.Function),
    new vscode.CompletionItem('delay', vscode.CompletionItemKind.Function),
    
    // Data types
    new vscode.CompletionItem('set', vscode.CompletionItemKind.Variable),
    new vscode.CompletionItem('get', vscode.CompletionItemKind.Variable),
    new vscode.CompletionItem('copy', vscode.CompletionItemKind.Variable),
    new vscode.CompletionItem('property', vscode.CompletionItemKind.Property),
    
    // Applications
    new vscode.CompletionItem('application "Finder"', vscode.CompletionItemKind.Reference),
    new vscode.CompletionItem('application "System Events"', vscode.CompletionItemKind.Reference),
    new vscode.CompletionItem('application "Terminal"', vscode.CompletionItemKind.Reference)
];

async function loadSdefDictionary(sdefPath: string): Promise<void> {
    try {
        if (!fs.existsSync(sdefPath)) {
            console.warn(`SDEF file not found: ${sdefPath}`);
            return;
        }
        
        const xml = await fs.promises.readFile(sdefPath, 'utf8');
        const match = [...xml.matchAll(/<command name="([^"]+)"/g)];
        const sdefCompletions = match.map(m => {
            const item = new vscode.CompletionItem(m[1], vscode.CompletionItemKind.Function);
            item.detail = `From ${path.basename(sdefPath)}`;
            return item;
        });
        
        // Merge with built-in completions
        dictionary = [...builtInCompletions, ...sdefCompletions];
        
        console.log(`Loaded ${sdefCompletions.length} commands from ${sdefPath}`);
    } catch (err) {
        console.error(`Failed to load dictionary from ${sdefPath}:`, err);
        vscode.window.showErrorMessage(`Failed to load AppleScript dictionary: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
}

function cleanupTempFiles(): void {
    tempFiles.forEach(filePath => {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error(`Failed to delete temp file ${filePath}:`, err);
        }
    });
    tempFiles = [];
}

export function activate(context: vscode.ExtensionContext) {
    // Initialize built-in completions
    dictionary = [...builtInCompletions];
    
    const runScript = vscode.commands.registerCommand('applescript.runScript', async () => {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showInformationMessage('No active editor found. Please open an AppleScript file.');
                return;
            }
            
            const doc = editor.document;
            
            // Validate file type
            if (doc.languageId !== 'applescript') {
                const proceed = await vscode.window.showWarningMessage(
                    'This file is not recognized as AppleScript. Run anyway?',
                    'Yes', 'No'
                );
                if (proceed !== 'Yes') {
                    return;
                }
            }
            
            // Save untitled documents
            if (doc.isUntitled) {
                const saved = await doc.save();
                if (!saved) {
                    vscode.window.showErrorMessage('Please save the file before running.');
                    return;
                }
            }
            
            // Validate file exists and is readable
            if (!fs.existsSync(doc.fileName)) {
                vscode.window.showErrorMessage('File does not exist or cannot be accessed.');
                return;
            }
            
            const command = `osascript "${doc.fileName}"`;
            const terminal = vscode.window.createTerminal('AppleScript');
            terminal.show(true);
            terminal.sendText(command);
            
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error occurred';
            vscode.window.showErrorMessage(`Failed to run AppleScript: ${message}`);
            console.error('Error running AppleScript:', error);
        }
    });
    context.subscriptions.push(runScript);

    const runSelection = vscode.commands.registerCommand('applescript.runSelection', async () => {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showInformationMessage('No active editor found. Please select some AppleScript code.');
                return;
            }
            
            const selection = editor.document.getText(editor.selection);
            if (!selection.trim()) {
                vscode.window.showInformationMessage('No code selected. Please select some AppleScript code to run.');
                return;
            }
            
            // Create temporary file with proper cleanup tracking
            const tmpFile = path.join(os.tmpdir(), `vscode_applescript_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.applescript`);
            
            await fs.promises.writeFile(tmpFile, selection, 'utf8');
            tempFiles.push(tmpFile);
            
            const terminal = vscode.window.createTerminal('AppleScript Selection');
            terminal.show(true);
            terminal.sendText(`osascript "${tmpFile}"`);
            
            // Clean up after a delay to allow execution
            setTimeout(() => {
                const index = tempFiles.indexOf(tmpFile);
                if (index !== -1) {
                    try {
                        fs.unlinkSync(tmpFile);
                        tempFiles.splice(index, 1);
                    } catch (err) {
                        console.error(`Failed to cleanup temp file ${tmpFile}:`, err);
                    }
                }
            }, 10000); // 10 second delay
            
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error occurred';
            vscode.window.showErrorMessage(`Failed to run selected AppleScript: ${message}`);
            console.error('Error running selection:', error);
        }
    });
    context.subscriptions.push(runSelection);

    const loadDictionaryCmd = vscode.commands.registerCommand('applescript.loadDictionary', async () => {
        try {
            const uris = await vscode.window.showOpenDialog({
                canSelectMany: false,
                filters: { 'SDEF files': ['sdef'] },
                title: 'Select AppleScript Dictionary (SDEF) File'
            });
            
            if (uris && uris.length > 0) {
                const uri = uris[0];
                await loadSdefDictionary(uri.fsPath);
                vscode.window.showInformationMessage(`Successfully loaded dictionary from ${path.basename(uri.fsPath)}`);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error occurred';
            vscode.window.showErrorMessage(`Failed to load dictionary: ${message}`);
            console.error('Error loading dictionary:', error);
        }
    });
    context.subscriptions.push(loadDictionaryCmd);

    const provider = vscode.languages.registerCompletionItemProvider('applescript', {
        provideCompletionItems(_document, _position, _token, _context) {
            // Return combined built-in and dictionary completions
            return dictionary;
        }
    }, ' ', '"', '('); // Trigger completion on space, quotes, and parentheses
    context.subscriptions.push(provider);

    // Load default dictionary if available
    const defaultSdef = path.join(context.extensionPath, 'applescript-support', 'StandardAdditions.sdef');
    loadSdefDictionary(defaultSdef).catch(_err => {
        console.log('Default SDEF not found, continuing with built-in completions only');
    });
    
    // Clean up temp files when extension deactivates
    context.subscriptions.push({ dispose: cleanupTempFiles });
}

export function deactivate() {
    // Clean up any remaining temporary files
    cleanupTempFiles();
}

