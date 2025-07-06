import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';

suite('AppleScript Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Language mode is applescript', async () => {
        const docUri = vscode.Uri.file(
            path.join(__dirname, '../../../test/examples/test.applescript')
        );
        const document = await vscode.workspace.openTextDocument(docUri);
        await vscode.window.showTextDocument(document);

        assert.strictEqual(document.languageId, 'applescript');
    });
});
