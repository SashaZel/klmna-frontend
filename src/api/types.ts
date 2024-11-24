export interface IProject {
  Name: string;
  Template: string;
  ID: string;
  Pools: null | IPool[];
  CreatedAt: string;
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
