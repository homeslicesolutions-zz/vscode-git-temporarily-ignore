import * as vscode from 'vscode';
import ChangeListNodeProvider from './change-list-node-provider';
import TrackingCommands from './tracking-commands';
import Logger from './logger';

const _log = Logger('activate');
const NAMESPACE = 'gitTempIgnore';

export function activate(context: vscode.ExtensionContext) {
  const rootPath:string = `${vscode.workspace.rootPath || '.'}/`; 

  _log('Starting...');

  const nodeProvider = new ChangeListNodeProvider(rootPath);
  const trackingCommands = new TrackingCommands(rootPath, nodeProvider);

  vscode.window.registerTreeDataProvider(NAMESPACE, nodeProvider);

  vscode.commands.registerCommand(`${NAMESPACE}.stopTracking`, (uri:vscode.Uri) => (
    trackingCommands.stop(uri)
  ));

  vscode.commands.registerCommand(`${NAMESPACE}.restoreTracking`, (uri:vscode.Uri) => (
    trackingCommands.restore(uri)
  ));
}


export function deactivate() {}