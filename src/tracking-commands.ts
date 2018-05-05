import { Uri } from 'vscode';
import ChangeListNodeProvider from './change-list-node-provider';
import runConsoleCommand from './run-console-command';
import { STOP_TRACKING_COMMAND, RESTORE_TRACKING_COMMAND } from './console-helpers';
import Logger from './logger';

const _log = Logger('TrackingCommands');

export default class TrackingCommands {
  constructor(
    private readonly rootPath:string,
    private readonly nodeProvider:ChangeListNodeProvider,
  ) {}

  stop(file:Uri) {
    _log('STOP TRACKING...');
    return this.run(STOP_TRACKING_COMMAND(file.path));
  }

  restore(file:Uri) {
    _log('RESTORE TRACKING...');
    return this.run(RESTORE_TRACKING_COMMAND(file.path));
  }

  private async run(consoleCommand:string) {
    await runConsoleCommand(this.rootPath, consoleCommand);
    _log('Done! Will attempt to refresh...');
    this.nodeProvider.refresh();
  }
}
