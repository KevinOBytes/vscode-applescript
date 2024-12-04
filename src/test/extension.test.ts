import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';

suite('AppleScript Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Syntax Highlighting Test', async () => {
        const docUri = vscode.Uri.file(
            path.join(__dirname, '../../test/examples/test.applescript')
        );
        const document = await vscode.workspace.openTextDocument(docUri);
        const editor = await vscode.window.showTextDocument(document);
        
        // Wait for tokenization to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // You'll need to implement custom logic to verify tokenization
    });

    test('Snippet Test', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            assert.fail('No active editor');
            return;
        }

        // Test 'tell' snippet
        await editor.insertSnippet(new vscode.SnippetString('tell'));
        // Verify the result
    });
}); 