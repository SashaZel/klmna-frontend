import { template } from "lodash";
import { ICreateProject, IProject, IProjectResponse, IProjectsResponse, ITask } from "./types";

const API_BASE_URL = "http://localhost";

export const getProjects = async (): Promise<IProjectsResponse> => {
    return fetch(`${API_BASE_URL}/projects`).then((res) => res.json());
};

export const createApiProject = async (): Promise<IProjectResponse> =>
    fetch(`${API_BASE_URL}/project`, {
        method: "POST",
        body: JSON.stringify({
            name: "[ New Project ]",
            template: "{}",
        }),
    }).then((res) => res.json());

export const getProject = async (projectId: string): Promise<IProjectResponse> => {
    return fetch(`${API_BASE_URL}/project/${projectId}`).then((res) => res.json());
};

export const updateApiProject = async (project: ICreateProject, projectId: string): Promise<IProjectResponse> => {
    return fetch(`${API_BASE_URL}/project/${projectId}/update`, {
        method: "PUT",
        body: JSON.stringify(project),
    }).then((res) => res.json());
};

export const createApiPool = async (
    projectID: string,
    poolName: string,
    poolDescription: string,
    poolInputTasks: string,
) =>
    fetch(`${API_BASE_URL}/project/${projectID}/pool`, {
        method: "POST",
        body: JSON.stringify({
            name: poolName,
            description: poolDescription,
            input: poolInputTasks,
        }),
    }).then((res) => res.json());

export const getApiRandomTask = async (projectId: string): Promise<ITask> =>
    fetch(`${API_BASE_URL}/project/${projectId}/random_task`).then((res) => res.json());

export const saveApiTaskSolution = async (taskID: string, solution: string) =>
    fetch(`${API_BASE_URL}/task/solution`, {
        method: "PUT",
        body: JSON.stringify({
            task_id: taskID,
            solution,
        }),
    });
