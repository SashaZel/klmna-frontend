import { ICreateProject, IProject, IProjectResponse, IProjectsResponse, ITask } from "./types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost";

/*

const getPostById = async (id: number): Promise<Post> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  )
  return await response.json()
}

function usePost(postId: number) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  })
}

*/

const getProjects = async (): Promise<IProject[]> => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    const result: IProjectsResponse = await response.json();
    return result.data;
};

export const useProjects = () => {
    return useQuery({
        queryKey: ["allProjects"],
        queryFn: getProjects,
    });
};

const getProject = async (projectId: string): Promise<IProject> => {
    const response = await fetch(`${API_BASE_URL}/project/${projectId}`);
    const result: IProjectResponse = await response.json();
    return result.data;
};

export const useProject = (projectId: string) =>
    useQuery({
        queryKey: ["project", "projectId"],
        queryFn: () => getProject(projectId),
        enabled: !!projectId,
    });

export const createApiProject = async (): Promise<IProjectResponse> =>
    fetch(`${API_BASE_URL}/project`, {
        method: "POST",
        body: JSON.stringify({
            name: "[ New Project ]",
            template: "{}",
        }),
    }).then((res) => res.json());

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
