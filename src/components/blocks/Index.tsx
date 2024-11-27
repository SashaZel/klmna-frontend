import { createApiProject, getProjects } from "@/api/api";
import { IProject } from "@/api/types";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Outlet,
    RouterProvider,
    Link,
    createRouter,
    createRoute,
    createRootRoute,
    useNavigate,
} from "@tanstack/react-router";

export const Index = () => {
    const [projects, setProjects] = useState<IProject[]>();
    const navigate = useNavigate();

    useEffect(() => {
        const setup = async () => {
            const fetchedProjects = await getProjects();
            if (fetchedProjects.ok && fetchedProjects.data) {
                setProjects(fetchedProjects.data);
            }
        };
        setup();
    }, []);

    const handleGetTask = async () => {
        alert("not implemented");
    };

    const handleCreateProject = async () => {
        try {
            const result = await createApiProject();
            if (result.data && result.data.ID) {
                navigate({
                    to: "/admin/project/$projectId/edit",
                    params: { projectId: result.data.ID },
                });
            } else {
                new Error("No ID at result.data");
            }
        } catch (err) {
            console.error("@handleCreateProject ", err);
        }
    };

    if (!projects) {
        return <div>Loading...</div>;
    }
    return (
        <section className="min-h-[80vh]">
            <div className="h-56 flex justify-between items-center">
                <div>
                    <h1 className="mb-1 text-4xl text-stone-100 font-semibold tracking-tighter">
                        Place
                        <br />
                        where AI get their lessons
                    </h1>
                    <div className="mt-2 text-stone-300 text-sm">
                        Welcome to <b>KLMNA</b> platform. The place where you
                        can learn data for your AI project or just earn
                        something for accomplish tasks.
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={handleGetTask}
                        className="bg-stone-900 text-stone-50"
                        variant="outline"
                    >
                        Get Task
                    </Button>
                    <Button
                        className="bg-yellow-500 text-stone-900 block"
                        variant="destructive"
                        onClick={handleCreateProject}
                    >
                        Create project
                    </Button>
                </div>
            </div>
            <div className="p-2">
                {projects.length ? (
                    projects.map((project) => (
                        <Card id={project.ID} className="mt-4">
                            <CardHeader>
                                <CardTitle>{project.Name}</CardTitle>
                                <CardDescription>{project.ID}</CardDescription>
                                <CardContent>
                                    <div>Here is some project</div>
                                    <Link
                                        to={"/admin/project/$projectId"}
                                        params={{ projectId: project.ID }}
                                    >
                                        ProjectPage
                                    </Link>
                                </CardContent>
                            </CardHeader>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>You have no project yet</CardTitle>
                            <CardDescription>
                                Create a new one and explore features
                            </CardDescription>
                        </CardHeader>
                    </Card>
                )}
            </div>
        </section>
    );
};
