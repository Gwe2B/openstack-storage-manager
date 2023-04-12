import { FileDescriptor, FolderDescriptor } from './descriptors.model';

export abstract class TreeElement {
  constructor(public name: string, public parent: TreeFolder | null = null) {}

  getPath(): string {
    let result = '';
    if (this.parent) {
      result = this.parent.getPath();
    }

    return result + '/' + this.name;
  }

  abstract find(name: string): TreeElement | null;
  abstract isLeaf(): boolean;
  abstract getChildrens(): TreeElement[];
}

export class TreeFolder extends TreeElement {
  private _bytes?: number;
  private _last_modified?: string;
  private _count?: number;

  content: TreeElement[] = [];

  public static createFromDescriptor(
    descriptor: FolderDescriptor,
    parent: TreeFolder | null = null
  ): TreeFolder {
    let result = new TreeFolder(descriptor.name, parent);

    result._bytes = descriptor.bytes;
    result._last_modified = descriptor.last_modified;
    result._count = descriptor.count;

    return result;
  }

  public get bytes(): number | undefined {
    return this._bytes;
  }

  public get last_modified(): string | undefined {
    return this._last_modified;
  }

  public get count(): number | undefined {
    return this._count;
  }

  getChildrens(): TreeElement[] {
    return this.content;
  }

  find(name: string): TreeElement | null {
    let result = null;

    if (name === this.name) {
      result = this;
    } else {
      for (const child of this.content) {
        result = child.find(name);
        if (result != null) {
          break;
        }
      }
    }

    return result;
  }

  add(element: TreeElement): void {
    this.content.push(element);
  }

  isLeaf(): boolean {
    return false;
  }
}

export class TreeFile extends TreeElement {
  private _bytes?: number;
  private _last_modified?: string;
  private _hash?: string;
  private _content_type?: string;

  static createFromDescriptor(
    descriptor: FileDescriptor,
    parent: TreeFolder | null = null
  ): TreeFile {
    let result = new TreeFile(descriptor.name, parent);

    result._bytes = descriptor.bytes;
    result._last_modified = descriptor.last_modified;
    result._hash = descriptor.hash;
    result._content_type = descriptor.content_type;

    return result;
  }

  public get bytes(): number | undefined {
    return this._bytes;
  }

  public get last_modified(): string | undefined {
    return this._last_modified;
  }

  public get hash(): string | undefined {
    return this._hash;
  }

  public get content_type(): string | undefined {
    return this._content_type;
  }

  getChildrens(): TreeElement[] {
    return [];
  }

  find(name: string): TreeElement | null {
    let result = null;

    if (this.name === name) {
      result = this;
    }

    return result;
  }

  isLeaf(): boolean {
    return true;
  }
}
