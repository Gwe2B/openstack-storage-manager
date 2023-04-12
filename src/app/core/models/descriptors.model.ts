interface Descriptor {
    bytes: number;
    last_modified: string;
    name: string;
}

export interface FileDescriptor extends Descriptor {
  hash: string;
  content_type: string;
}

export interface FolderDescriptor extends Descriptor {
  count: number;
}
