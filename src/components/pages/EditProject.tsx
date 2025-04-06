import { useContext, useEffect, useState } from "react";
import { RenderTask } from "../blocks/RenderTask";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { getProject, updateApiProject } from "@/api/api";
import { Input } from "../ui/input";
import { IProjectResponse } from "@/api/types";
import { SandboxContext } from "../blocks/Sandbox";

interface IEditProjectProps {
    projectId: string;
}

export const EditProject = ({ projectId }: IEditProjectProps) => {
    const [projectName, setProjectName] = useState("");
    const [projectCreated, setProjectCreated] = useState("");
    const [templateText, setTemplateText] = useState("");
    const [templateError, setTemplateError] = useState<string>();

    const [inputText, setInputText] = useState("");
    const [inputError, setInputError] = useState<string>();

    const { input, setInput, output, setOutput, template, setTemplate } = useContext(SandboxContext);

    useEffect(() => {
        const setup = async () => {
            const response = await getProject(projectId);
            handleResponse(response);
        };
        setup();
    }, [projectId]);

    const handleResponse = (response: IProjectResponse) => {
        if (response.ok && response.data) {
            try {
                const parsedTemplate = JSON.parse(response.data.Template);
                const formattedTemplate = JSON.stringify(parsedTemplate, null, 4);
                setTemplate(parsedTemplate);
                setTemplateText(formattedTemplate);
            } catch (_error) {
                console.error("@EditProject fetched invalid template");
            }
            response.data.Name && setProjectName(response.data.Name);
            response.data.CreatedAt && setProjectCreated(response.data.CreatedAt);
        }
    };

    const handleSave = async () => {
        let templateString = "";
        try {
            templateString = JSON.stringify(template);
        } catch (_err) {
            return;
        }
        const response = await updateApiProject({ name: projectName, template: templateString }, projectId);
        handleResponse(response);
    };

    const handleTemplateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const raw = e.currentTarget.value;
        try {
            const templateUpdate = JSON.parse(raw);
            setTemplate(templateUpdate);
            setTemplateText(raw);
            setTemplateError(undefined);
        } catch (err) {
            setTemplateError(String(err).slice(0, 22));
            setTemplateText(raw);
        }
        setOutput({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const raw = e.currentTarget.value;
        try {
            const inputUpdate = JSON.parse(raw);
            setInput(inputUpdate);
            setInputText(raw);
            setInputError(undefined);
        } catch (err) {
            setInputError(String(err).slice(0, 22));
            setInputText(raw);
        }
    };

    const handleTemplateFormat = () => {
        try {
            const formatted = JSON.stringify(template, null, 4);
            setTemplateText(formatted);
        } catch (err) {
            setTemplateError(String(err).slice(0, 22));
        }
    };

    const handleInputFormat = () => {
        try {
            const formatted = JSON.stringify(input, null, 4);
            setInputText(formatted);
        } catch (err) {
            setInputError(String(err).slice(0, 22));
        }
    };

    let displayOutput = "";
    try {
        displayOutput = JSON.stringify(output, null, "\t");
    } catch (_err) {
        displayOutput = "< Error stringify output >";
    }

    return (
        <div>
            <div className="mt-8 py-6 px-2 w-full rounded-md flex justify-between text-neutral-50">
                <div>
                    <Input
                        className="text-neutral-50 bg-plum-950 border-none text-2xl md:text-2xl font-bold"
                        value={projectName}
                        onChange={(e) => setProjectName(e.currentTarget.value)}
                    />
                    <div className="px-2">Created at: {projectCreated}</div>
                </div>
                <Button className="block" variant="action" onClick={handleSave}>
                    Save project
                </Button>
            </div>
            <div className="w-full mt-4 min-h-[500px] flex gap-4 justify-between">
                <Card className="px-4 py-2 w-1/2">
                    <CardHeader>
                        <CardTitle>Create project Template</CardTitle>
                        <CardDescription>Template in JSON format</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full flex flex-row-reverse justify-between">
                            <Button onClick={handleTemplateFormat}>Format template</Button>
                            {templateError ? <Badge variant="destructive">{templateError}</Badge> : null}
                        </div>
                        <Textarea className="mt-2" value={templateText} onChange={handleTemplateChange} rows={17} />
                    </CardContent>
                    <CardFooter className="w-full flex flex-row-reverse">
                        <Button>Save Template</Button>
                    </CardFooter>
                </Card>
                <Card className="px-4 py-2 w-1/2">
                    <CardHeader>
                        <CardTitle>Template preview</CardTitle>
                        <CardDescription>See how it will looks like for employee</CardDescription>
                    </CardHeader>
                    <CardContent className="border rounded-sm h-5/6">
                        <RenderTask template={template} />
                    </CardContent>
                </Card>
            </div>
            <div className="w-full mt-4 min-h-[320px] flex gap-4 justify-between">
                <Card className="px-4 py-2 w-1/2">
                    <CardHeader>
                        <CardTitle>Input Example</CardTitle>
                        <CardDescription>Pase some input example</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full flex flex-row-reverse justify-between">
                            <Button onClick={handleInputFormat}>Format input</Button>
                            {inputError ? <Badge variant="destructive">{inputError}</Badge> : null}
                        </div>
                        <Textarea className="mt-2" value={inputText} onChange={handleInputChange} rows={17} />
                    </CardContent>
                </Card>
                <Card className="px-4 py-2 w-1/2">
                    <CardHeader>
                        <CardTitle>Output Example</CardTitle>
                        <CardDescription>See output which task solution produce</CardDescription>
                        <CardContent>
                            <pre>{displayOutput}</pre>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
};
