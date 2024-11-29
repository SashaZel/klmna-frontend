import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { createApiPool } from "@/api/api";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

interface ICreatePoolProps {
    projectId: string;
}

export const CreatePool = ({ projectId }: ICreatePoolProps) => {
    const [poolName, setPoolName] = useState("[ New pool ]");
    const [description, setDescription] = useState("[ pool description ]");
    const [poolInputTasks, setPoolInputTasks] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            let stringWithEscape = "";
            stringWithEscape = JSON.stringify(poolInputTasks.map((el) => JSON.stringify(el).replace(/"/g, "'")));
            console.log("@handleCreate ... with escape ", stringWithEscape);
            const result = await createApiPool(projectId, poolName, description, stringWithEscape);
            if (result.ok) {
                navigate({
                    to: "/admin/project/$projectId",
                    params: { projectId },
                });
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError(String(error).slice(0, 22));
        }
    };

    function onReaderLoad(event: ProgressEvent<FileReader>) {
        const result = event?.target?.result as string;
        if (result) {
            console.log("loaded ", result);
            try {
                const obj = JSON.parse(result);
                setPoolInputTasks(obj);
                setError("");
            } catch (error) {
                setError(String(error).slice(0, 22));
            }
        } else {
            setError("No onReaderLoad result");
        }
    }

    const handleFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = onReaderLoad;
            reader.readAsText(file);
        }
    };

    return (
        <article className="min-h-[80vh] w-full">
            <div className="mt-8 py-6 px-2 w-full min-h-36 rounded-md flex justify-between text-neutral-50">
                <div>
                    <Input
                        className="block text-neutral-50 bg-plum-950 border-none text-2xl md:text-2xl font-bold"
                        value={poolName}
                        onChange={(e) => setPoolName(e.currentTarget.value)}
                    />
                    <Input
                        className="mt-2 block text-neutral-200 bg-plum-950 border-none"
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                    />
                </div>
                <Button variant="action" onClick={handleCreate} disabled={!poolInputTasks.length}>
                    <Plus />
                    Create Pool
                </Button>
            </div>
            <div className="mt-8 flex justify-between gap-4">
                <div className="mt-2 w-2/3">
                    <Card>
                        <CardHeader>
                            <CardTitle></CardTitle>
                            <CardDescription>Tasks in JSON format</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Label htmlFor="tasks">Array of tasks</Label>
                            <Input id="tasks" accept=".json" onChange={handleFileLoad} type="file" />
                        </CardContent>
                    </Card>
                </div>
                <div className="mt-2 w-1/3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload some tasks for a project</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {error ? (
                                <div>
                                    <Label className="block">Uh-uh... there is some errors in your tasks</Label>
                                    <Badge className="mt-2 block" variant="destructive">
                                        {error}
                                    </Badge>
                                </div>
                            ) : null}
                            {poolInputTasks?.length ? (
                                <div>
                                    <Label className="block">Success!</Label>
                                    <Badge className="mt-2 block">Tasks loaded</Badge>
                                </div>
                            ) : null}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </article>
    );
};
