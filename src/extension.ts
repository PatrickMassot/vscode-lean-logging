// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "helloworld-sample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const setRecordingContext = async (isRecording: boolean) => {
      await vscode.commands.executeCommand('setContext', 'lean-logging:isRecording', isRecording);
    };

	const disposable = vscode.commands.registerCommand('lean-logging.startLogging', async () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Démarrage de l’enregistrement.');
    await setRecordingContext(true);
    await vscode.workspace.getConfiguration('lean4.logging').update('enabled', true, vscode.ConfigurationTarget.Global);
    await vscode.commands.executeCommand('lean4.restartServer');
	});

	context.subscriptions.push(disposable);

	const disposable2 = vscode.commands.registerCommand('lean-logging.stopLogging', async () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Arrêt de l’enregistrement.');
    await setRecordingContext(false);
    await vscode.workspace.getConfiguration('lean4.logging').update('enabled', false, vscode.ConfigurationTarget.Global);
    await vscode.commands.executeCommand('lean4.restartServer');
	});

	context.subscriptions.push(disposable2);
}
