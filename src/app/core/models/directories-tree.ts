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
  getChildrens(): TreeElement[] {
      return this.content;
  }
  content: TreeElement[] = [];

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
