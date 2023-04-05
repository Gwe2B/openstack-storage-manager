export interface OpenstackIdentifier {
    id: string;
    name: string;
    username: string;
    project: string;
    password: string;
}

export type OpenstackIdentifierCollection = OpenstackIdentifier[];