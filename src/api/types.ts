export interface IProject {
    Name: string;
    Template: string;
    ID: string;
    Pools: null | IPool[];
    CreatedAt: string;
}

export interface ICreateProject {
    name: string;
    template: string;
}

export interface IProjectsResponse {
    ok: boolean;
    error: string;
    data: IProject[];
}

export interface IProjectResponse {
    ok: boolean;
    error: string;
    data: IProject;
}

export interface IPool {
    id: string;
    name: string;
    description: string;
    project_id: string;
    created_at: string;
    tasks: null;
}

export interface ITask {
    ok: boolean;
    error: string;
    input: {
        id: string;
        input: string;
    };
    template: string;
}
