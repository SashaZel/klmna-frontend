import {
    ICreateProject,
    IProject,
    IProjectResponse,
    IProjectsResponse,
} from "./types";

const API_BASE_URL = "http://localhost";

export const getProjects = async (): Promise<IProjectsResponse> => {
    return fetch(`${API_BASE_URL}/projects`).then((res) => res.json());
};

export const getProject = async (
    projectId: string,
): Promise<IProjectResponse> => {
    return fetch(`${API_BASE_URL}/project/${projectId}`).then((res) =>
        res.json(),
    );
};

export const updateApiProject = async (
    project: ICreateProject,
    projectId: string,
): Promise<IProjectResponse> => {
    return fetch(`${API_BASE_URL}/project/${projectId}/update`, {
        method: "PUT",
        body: JSON.stringify(project),
    }).then((res) => res.json());
};
