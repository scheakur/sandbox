'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
    window,
    commands,
    Disposable,
    ExtensionContext,
    StatusBarItem,
    StatusBarAlignment,
    TextDocument,
} from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "hello-vscode-extension" is now active!');

    const counter = new Counter();
    const controller = new CounterController(counter);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        window.showInformationMessage('Hello World!');

        counter.updateCount();
    });

    context.subscriptions.push(counter);
    context.subscriptions.push(controller);
    context.subscriptions.push(disposable);
}


class Counter {
    private statusBarItem: StatusBarItem;

    public updateCount() {
        if (!this.statusBarItem) {
            this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        }

        const editor = window.activeTextEditor;

        if (!editor) {
            this.statusBarItem.hide();
            return;
        }

        const doc = editor.document;
        const count = this.countChars(doc);
        this.statusBarItem.text = count !== 1 ? `$(octoface) ${count} chars` : '$(octoface) 1 char';
        this.statusBarItem.show();
    }

    public countChars(doc: TextDocument): number {
        return doc.getText().length;
    }

    dispose() {
        this.statusBarItem.dispose();
    }
}

class CounterController {
    private counter: Counter;
    private disposable: Disposable;

    constructor(counter: Counter) {
        this.counter = counter;
        this.counter.updateCount();

        const subscriptions: Disposable[] = [];
        window.onDidChangeTextEditorSelection(this.onEvent, this, subscriptions);
        window.onDidChangeActiveTextEditor(this.onEvent, this, subscriptions);

        this.counter.updateCount();

        this.disposable = Disposable.from(...subscriptions);
    }

    dispose() {
        this.disposable.dispose();
    }

    private onEvent() {
        this.counter.updateCount();
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}