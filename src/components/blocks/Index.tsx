import { createApiProject, useProjects } from "@/api/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { CirclePlay, Plus } from "lucide-react";
import { LabelTitle } from "./LabelTitle";
import { SkeletonCard } from "./SkeletonCard";

export const Index = () => {
    const navigate = useNavigate();

    const { data, error, isFetching } = useProjects();

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

    if (isFetching) {
        return <SkeletonCard />
    }

    if (!!error || !data) {
        return <div>An error occur...</div>
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
                    <div className="mt-6 text-stone-400 text-sm">
                        Welcome to <span className="text-stone-200 font-bold">KLMNA</span> platform. <br /> The place
                        where you can learn data for your AI project or just earn something for accomplish tasks.
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleGetTask} className="w-1/2" variant="ghostDark">
                        Get Random Task
                    </Button>
                    <Button className="w-1/2" variant="action" onClick={handleCreateProject}>
                        <Plus />
                        Create project
                    </Button>
                </div>
            </div>
            <div className="p-2">
                {data.length ? (
                    data.map((project) => (
                        <div key={project.ID} className="mt-4 w-full flex gap-4">
                            <Card id={project.ID} className="w-2/3">
                                <CardHeader>
                                    <CardTitle className="flex justify-between">
                                        {project.Name}
                                        <LabelTitle />
                                    </CardTitle>
                                    <CardDescription>Project for separate cats from Dogs</CardDescription>
                                    <CardDescription>{project.ID}</CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="w-1/3">
                                <CardHeader>
                                    <CardTitle>Project action</CardTitle>
                                    <CardDescription>Task takes about 2 minutes</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full flex justify-between items-center gap-2">
                                        <Button className="w-1/2" variant="outline">
                                            <Link
                                                to={"/admin/project/$projectId"}
                                                params={{
                                                    projectId: project.ID,
                                                }}
                                            >
                                                ProjectPage
                                            </Link>
                                        </Button>
                                        <Button className="w-1/2">
                                            <Link
                                                to={"/$projectId/task"}
                                                params={{
                                                    projectId: project.ID,
                                                }}
                                                className="flex items-center gap-2"
                                            >
                                                <CirclePlay className="hidden lg:block" /> Take a task
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>You have no project yet</CardTitle>
                            <CardDescription>Create a new one and explore features</CardDescription>
                        </CardHeader>
                    </Card>
                )}
            </div>
        </section>
    );
};
