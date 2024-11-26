import { useEffect, useState } from "react";
import { IProject } from "@/api/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Outlet,
    RouterProvider,
    Link,
    createRouter,
    createRoute,
    createRootRoute,
} from "@tanstack/react-router";
import { getProject } from "@/api/api";
import { Button } from "../ui/button";

interface IProjectProps {
    projectId: string;
}

export const Project = ({ projectId }: IProjectProps) => {
    const [project, setProject] = useState<IProject>();

    useEffect(() => {
        const setup = async () => {
            const response = await getProject(projectId);
            if (response.ok && response.data) {
                setProject(response.data);
            }
        };
        setup();
    }, [projectId]);

    if (!project) {
        return <div>Loading Project...</div>;
    }

    return (
        <>
            <div className="flex justify-between">
                <Card className="w-[640px]">
                    <CardHeader>
                        <CardTitle>{project.Name}</CardTitle>
                        <CardDescription>{project.ID}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>Created at {project.CreatedAt}</div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Link
                            to="/admin/project/$projectId/pool/create"
                            params={{ projectId: projectId }}
                        >
                            Create new pool
                        </Link>
                    </CardFooter>
                </Card>
                <Button
                    className="bg-yellow-500 text-stone-900 block"
                    variant="destructive"
                >
                    <Link
                        to="/admin/project/$projectId/edit"
                        params={{ projectId }}
                        className="no-underline text-stone-900"
                    >
                        Edit
                    </Link>
                </Button>
            </div>
            {project.Pools
                ? project.Pools.map((pool) => (
                      <Card key={pool.id} className="mt-4">
                          <CardHeader>
                              <CardTitle>{pool.name}</CardTitle>
                              <CardDescription>
                                  {pool.description}
                              </CardDescription>
                          </CardHeader>
                          <CardContent>
                              <div>Created at {pool.created_at}</div>
                          </CardContent>
                      </Card>
                  ))
                : null}
        </>
    );
};
