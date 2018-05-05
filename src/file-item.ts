import { Command, TreeItem, TreeItemCollapsibleState, Uri } from 'vscode';

export default class FileItem extends TreeItem {
  constructor(
		public readonly resourceUri: Uri,
    public readonly collapsibleState: TreeItemCollapsibleState,
		public readonly command?: Command
	) {
		super(resourceUri, collapsibleState);
  }
  
	get tooltip(): string {
		return this.resourceUri.toString();
	}
}
