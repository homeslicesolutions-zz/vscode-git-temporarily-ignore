import { TreeDataProvider, TreeItemCollapsibleState, EventEmitter, Event, Uri } from 'vscode';
import FileItem from './file-item';
import runConsoleCommand from './run-console-command';
import { LIST_COMMAND, LIST_ITEM_FILTER } from './console-helpers';
import Logger from './logger';

const _log = Logger('ChangeListNodeProvider');

export default class ChangeListNodeProvider implements TreeDataProvider<FileItem> {
  private _onDidChangeTreeData: EventEmitter<FileItem | undefined> = new EventEmitter<FileItem | undefined>();
  readonly onDidChangeTreeData: Event<FileItem | undefined> = this._onDidChangeTreeData.event;

  constructor(
    private readonly rootPath :string
  ) {}

  refresh(): void {
    _log('Refresh...');
		this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: FileItem): FileItem {
    return element;
  }

  getChildren(element?: any): Promise<FileItem[]> {
    return this.fetchFiles();
  }

  private async fetchFiles(): Promise<FileItem[]> {
    const consoleCommand = LIST_COMMAND();
    const commandResult:string[] = await runConsoleCommand(this.rootPath, consoleCommand);

    const fileItems:FileItem[] = commandResult.reduce((arr:FileItem[], resultString:string) => {
      const fileName = LIST_ITEM_FILTER(resultString);
      
      _log('Line Match? ', !!fileName, resultString);

      if (fileName) {
        const fileItem = new FileItem(
          Uri.parse(fileName),
          TreeItemCollapsibleState.None,
          {
            command: 'file.open',
            title: '',
            arguments: [fileName],
          }
        );

        return [...arr, fileItem];
      }

      return arr;
    }, new Array<FileItem>());

    return Promise.resolve(fileItems);
  }
}
