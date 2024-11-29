import { useContext, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { getApiRandomTask, saveApiTaskSolution } from "@/api/api";
import { Button } from "../ui/button";
import { RenderTask } from "../blocks/RenderTask";
import { Card, CardContent } from "../ui/card";
import { SandboxContext } from "../blocks/Sandbox";

interface ITaskProps {
    projectId: string;
}

export const Task = ({ projectId }: ITaskProps) => {
    const [error, setError] = useState<string>();
    const [taskID, setTaskID] = useState<string>();

    const { input, setInput, setTemplate, template, output } = useContext(SandboxContext);

    useEffect(() => {
        if (projectId) {
            setup();
        }
    }, []);

    const setup = async () => {
        try {
            const result = await getApiRandomTask(projectId);
            if (result.ok) {
                setInput(JSON.parse(result.input?.input?.replace(/'/g, '"')));
                setTemplate(JSON.parse(result.template));
                setTaskID(result.input?.id);
            } else {
                setError(String(result.error));
            }
        } catch (error) {
            setError(String(error).slice(0, 33) + "...");
            console.error("@Task ", error);
        }
    };

    const handleSolution = async () => {
        if (!taskID) return;
        const solutionJSON = JSON.stringify(output).replace(/"/g, "'");
        try {
            const response = await saveApiTaskSolution(taskID, solutionJSON);
            if (response.ok) {
                await setup();
            } else {
                new Error("Fail to submit solution");
            }
        } catch (error) {
            setError(String(error).slice(0, 33) + "...");
            console.error("@Task ", error);
        }
    };

    if (error) {
        return (
            <div className="w-full h-1/4 flex align-middle text-brick-600">
                <div>
                    <h1>An error occured</h1>
                    <Badge variant="destructive">{error}</Badge>
                </div>
            </div>
        );
    }
    if (!input || !template) {
        return <div>...Loading</div>;
    }
    return (
        <>
            <div className="w-full h-24 flex justify-end items-center">
                <Button className="block" variant="action" onClick={handleSolution} disabled={!output}>
                    Send solution
                </Button>
            </div>
            <Card className="w-full mt-2">
                <CardContent>
                    <RenderTask template={template} />
                </CardContent>
            </Card>
        </>
    );
};
