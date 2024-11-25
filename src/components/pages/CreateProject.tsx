import { useState } from "react";
import { Task } from "../blocks/RenderTask";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

export const CreateProject = () => {
    const [template, setTemplate] = useState<Record<string, any>[]>([]);
    const [textValue, setTextValue] = useState("");
    const [error, setError] = useState<string>();

    const handleChangeTemplate = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const raw = e.currentTarget.value;
        try {
            const templateUpdate = JSON.parse(raw);
            setTemplate(templateUpdate);
            setTextValue(raw);
            setError(undefined);
        } catch (err) {
            setError(String(err).slice(0, 22));
            setTextValue(raw);
        }
    };

    const handleFormat = () => {
        try {
            const formatted = JSON.stringify(template, null, 4);
            setTextValue(formatted);
        } catch (err) {
            setError(String(err).slice(0, 22));
        }
    };

    return (
        <div>
            <div className="w-full min-h-[500px] flex gap-4 justify-between">
                <Card className="px-4 py-2 w-1/2">
                    <CardHeader>
                        <CardTitle>Create project Template</CardTitle>
                        <CardDescription>
                            Template in JSON format
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full flex flex-row-reverse justify-between">
                            <Button onClick={handleFormat}>Format text</Button>
                            {error ? (
                                <Badge variant="destructive">{error}</Badge>
                            ) : null}
                        </div>
                        <Textarea
                            className="mt-2"
                            value={textValue}
                            onChange={(e) => handleChangeTemplate(e)}
                            rows={17}
                        />
                    </CardContent>
                    <CardFooter className="w-full flex flex-row-reverse">
                        <Button>Save Template</Button>
                    </CardFooter>
                </Card>
                <Card className="px-4 py-2 w-1/2">
                    <CardHeader>
                        <CardTitle>Template preview</CardTitle>
                        <CardDescription>
                            See how it will looks like for employee
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="border rounded-sm h-5/6">
                        <Task template={template} />
                    </CardContent>
                </Card>
            </div>
            <div className="w-full mt-4 min-h-[320px] flex gap-4 justify-between">
                <Card className="px-4 py-2 w-1/2">
                    <CardHeader>
                        <CardTitle>Input Example</CardTitle>
                        <CardDescription>
                            Pase some input example
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className="px-4 py-2 w-1/2">
                    <CardHeader>
                        <CardTitle>Output Example</CardTitle>
                        <CardDescription>
                            See output which task solution produce
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
};
