// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    vscode.chat.createChatParticipant("vscode-chat-experiment", async (request, context, response, token) => {
        const userQuery = request.prompt;

        const chatModels = await vscode.lm.selectChatModels({ family: "gpt-4" });
        const messages = [
            vscode.LanguageModelChatMessage.User("You are experimental potato bot. For each query you should answer 'Potato'"),
            vscode.LanguageModelChatMessage.User(userQuery),
        ];
        const chatRequest = await chatModels[0].sendRequest(messages, undefined, token);
        for await (const token of chatRequest.text) {
            response.markdown(token);
        }
    });


}

// This method is called when your extension is deactivated
export function deactivate() {}
