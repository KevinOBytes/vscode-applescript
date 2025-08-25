import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';

suite('AppleScript Extension Test Suite', () => {
    vscode.window.showInformationMessage('Starting AppleScript Extension Tests');

    test('Language mode is applescript', async () => {
        const docUri = vscode.Uri.file(
            path.join(__dirname, '../../../test/examples/test.applescript')
        );
        const document = await vscode.workspace.openTextDocument(docUri);
        await vscode.window.showTextDocument(document);

        assert.strictEqual(document.languageId, 'applescript');
    });

    test('Extension commands are registered', async () => {
        // Test that our commands are properly registered
        const commands = await vscode.commands.getCommands(true);
        
        assert.ok(commands.includes('applescript.runScript'), 'runScript command should be registered');
        assert.ok(commands.includes('applescript.runSelection'), 'runSelection command should be registered'); 
        assert.ok(commands.includes('applescript.loadDictionary'), 'loadDictionary command should be registered');
    });

    test('Completion provider provides built-in completions', async () => {
        const docUri = vscode.Uri.file(
            path.join(__dirname, '../../../test/examples/test.applescript')
        );
        const document = await vscode.workspace.openTextDocument(docUri);
        await vscode.window.showTextDocument(document);

        // Get completions at the beginning of the file
        const position = new vscode.Position(0, 0);
        const completionList = await vscode.commands.executeCommand<vscode.CompletionList>(
            'vscode.executeCompletionItemProvider',
            docUri,
            position
        );

        assert.ok(completionList, 'Completion list should be provided');
        assert.ok(completionList.items.length > 0, 'Should have completion items');

        // Check for some specific built-in completions
        const completionLabels = completionList.items.map(item => item.label);
        assert.ok(completionLabels.includes('tell'), 'Should include "tell" completion');
        assert.ok(completionLabels.includes('if'), 'Should include "if" completion');
        assert.ok(completionLabels.includes('display dialog'), 'Should include "display dialog" completion');
    });

    test('File associations are correct', async () => {
        // Test .applescript file
        const appScriptUri = vscode.Uri.file(path.join(__dirname, '../../../test/examples/test.applescript'));
        const appScriptDoc = await vscode.workspace.openTextDocument(appScriptUri);
        assert.strictEqual(appScriptDoc.languageId, 'applescript');

        // We can't easily test .scpt files in this environment, but the configuration should handle them
    });
});
