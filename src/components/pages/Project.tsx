import { useEffect, useState } from "react";
import { IProject } from "@/api/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
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
            <div className="flex justify-between items-center">
                <Card className="w-[640px]">
                    <CardHeader>
                        <CardTitle>{project.Name}</CardTitle>
                        <CardDescription>{project.ID}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>Created at {project.CreatedAt}</div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Link to="/admin/project/$projectId/pool/create" params={{ projectId: projectId }}>
                            Create new pool
                        </Link>
                    </CardFooter>
                </Card>
                <Button variant="action" size="lg">
                    <Link
                        to="/admin/project/$projectId/edit"
                        params={{ projectId }}
                        className="no-underline text-stone-900"
                    >
                        Edit
                    </Link>
                </Button>
            </div>
            <article className="mt-4 flex justify-between gap-4">
                <div className="w-2/3">
                    {project.Pools?.length ? (
                        project.Pools.map((pool) => (
                            <Card key={pool.id} className="mt-4 h-full">
                                <CardHeader>
                                    <CardTitle>{pool.name}</CardTitle>
                                    <CardDescription>{pool.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div>Created at {pool.created_at}</div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card className="h-full">
                            <CardHeader>No pools yet</CardHeader>
                        </Card>
                    )}
                </div>
                <Card className="w-1/3">
                    <CardHeader>
                        <CardTitle>Your projects has {project?.Pools?.length || 0} pools</CardTitle>
                        <CardDescription>
                            <Button>
                                <Link
                                    to="/admin/project/$projectId/pool/create"
                                    params={{ projectId }}
                                    className="no-underline text-stone-50"
                                >
                                    Create new one
                                </Link>
                            </Button>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>Create pool and upload tasks</CardContent>
                </Card>
            </article>
        </>
    );
};
