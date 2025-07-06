import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

let dictionary: vscode.CompletionItem[] = [];

function loadSdefDictionary(sdefPath: string) {
    try {
        const xml = fs.readFileSync(sdefPath, 'utf8');
        const match = [...xml.matchAll(/<command name="([^"]+)"/g)];
        dictionary = match.map(m => new vscode.CompletionItem(m[1], vscode.CompletionItemKind.Function));
    } catch (err) {
        console.error(`Failed to load dictionary from ${sdefPath}:`, err);
    }
}

export function activate(context: vscode.ExtensionContext) {
    const runScript = vscode.commands.registerCommand('applescript.runScript', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active editor');
            return;
        }
        const doc = editor.document;
        if (doc.isUntitled) {
            await doc.save();
        }
        await doc.save();
        const command = `osascript "${doc.fileName}"`;
        const terminal = vscode.window.createTerminal('AppleScript');
        terminal.show(true);
        terminal.sendText(command);
    });
    context.subscriptions.push(runScript);

    const runSelection = vscode.commands.registerCommand('applescript.runSelection', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active editor');
            return;
        }
        const selection = editor.document.getText(editor.selection);
        if (!selection.trim()) {
            vscode.window.showInformationMessage('No selection to run');
            return;
        }
        const tmpFile = path.join(os.tmpdir(), `vscode_applescript_${Date.now()}.applescript`);
        fs.writeFileSync(tmpFile, selection);
        const terminal = vscode.window.createTerminal('AppleScript');
        terminal.show(true);
        terminal.sendText(`osascript "${tmpFile}"`);
    });
    context.subscriptions.push(runSelection);

    const loadDictionaryCmd = vscode.commands.registerCommand('applescript.loadDictionary', async () => {
        const [uri] = await vscode.window.showOpenDialog({
            canSelectMany: false,
            filters: { 'SDEF files': ['sdef'] }
        }) || [];
        if (uri) {
            loadSdefDictionary(uri.fsPath);
            vscode.window.showInformationMessage(`Loaded dictionary from ${uri.fsPath}`);
        }
    });
    context.subscriptions.push(loadDictionaryCmd);

    const provider = vscode.languages.registerCompletionItemProvider('applescript', {
        provideCompletionItems() {
            return dictionary;
        }
    });
    context.subscriptions.push(provider);

    const defaultSdef = path.join(context.extensionPath, 'applescript-support', 'StandardAdditions.sdef');
    if (fs.existsSync(defaultSdef)) {
        loadSdefDictionary(defaultSdef);
    }
}

export function deactivate() {}

