const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const handleUpdate = require("./extension/handleUpdate");

function activate(context) {
    const getPath = p => path.join(context.extensionPath, '/pane/dist/build/', p);
    
    let subscriptions = [];

    context.subscriptions.push(vscode.commands.registerCommand('morphPlayground.start', function () {
        let pane = vscode.window.createWebviewPanel(
            'morphPlayground',
            "Morph Playground",
            vscode.ViewColumn.Two, {
                enableScripts: true
            });

        fs.readFile(getPath('index.html'), 'utf8', (err, html) => pane.webview.html = html);

        vscode.window.onDidChangeTextEditorSelection(() => handleUpdate(vscode.window, pane, htmlString), this, subscriptions);
        vscode.window.onDidChangeActiveTextEditor(() => handleUpdate(vscode.window, pane, htmlString), this, subscriptions);
    }));

    // create a combined disposable from both event subscriptions
    this._disposable = vscode.Disposable.from(...subscriptions);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;