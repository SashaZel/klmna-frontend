import { createContext, useEffect, useState } from "react";
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
import * as lodash from "lodash";
import { getProject, updateApiProject } from "@/api/api";
import { Input } from "../ui/input";
import { IProjectResponse } from "@/api/types";

interface IEditProjectProps {
    projectId: string;
}

interface ISandboxContext {
    input: object;
    output: object;
    getInput: (path: string) => any;
    setSolution: (path: string, value: any) => void;
}

const defaultSandboxContextValue: ISandboxContext = {
    input: {},
    output: {},
    getInput: (_path: string) => null,
    setSolution: (_path: string, _value: any) => {},
};

export const SandboxContext = createContext(defaultSandboxContextValue);

export const EditProject = ({ projectId }: IEditProjectProps) => {
    const [projectName, setProjectName] = useState("");
    const [projectCreated, setProjectCreated] = useState("");
    const [template, setTemplate] = useState<Record<string, any>[]>([]);
    const [templateText, setTemplateText] = useState("");
    const [templateError, setTemplateError] = useState<string>();

    const [input, setInput] = useState<object>({});
    const [inputText, setInputText] = useState("");
    const [inputError, setInputError] = useState<string>();

    const [output, setOutput] = useState<object>({});

    useEffect(() => {
        const setup = async () => {
            const response = await getProject(projectId);
            handleResponse(response);
        };
        setup();
    }, [projectId]);

    const handleResponse = (response: IProjectResponse) => {
        if (response.ok && response.data) {
            // setProject(response.data);
            try {
                const parsedTemplate = JSON.parse(response.data.Template);
                const formattedTemplate = JSON.stringify(
                    parsedTemplate,
                    null,
                    4,
                );
                setTemplate(parsedTemplate);
                setTemplateText(formattedTemplate);
            } catch (error) {
                console.error("@EditProject fetched invalid template");
            }
            response.data.Name && setProjectName(response.data.Name);
            response.data.CreatedAt &&
                setProjectCreated(response.data.CreatedAt);
        }
    };

    const handleSave = async () => {
        let templateString = "";
        try {
            templateString = JSON.stringify(template);
        } catch (_err) {
            return;
        }
        const response = await updateApiProject(
            { name: projectName, template: templateString },
            projectId,
        );
        handleResponse(response);
    };

    const handleTemplateChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
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

    const getInput = (path: string) => lodash.get(input, path);

    const setSolution = (path: string, value: any) => {
        const updatedOutput = lodash.set({ ...output }, path, value);
        setOutput(updatedOutput);
    };

    let displayOutput = "";
    try {
        displayOutput = JSON.stringify(output, null, "\t");
    } catch (_err) {
        displayOutput = "< Error stringify output >";
    }

    return (
        <SandboxContext.Provider
            value={{ input, output, getInput, setSolution }}
        >
            <div>
                <div className="mt-8 py-6 px-2 w-full rounded-md bg-stone-900 flex justify-between text-stone-50">
                    <div>
                        <Input
                            className="text-stone-50 border-none text-2xl md:text-2xl font-bold"
                            value={projectName}
                            onChange={(e) =>
                                setProjectName(e.currentTarget.value)
                            }
                        />
                        <div className="px-2">Created at: {projectCreated}</div>
                    </div>
                    <Button
                        className="bg-yellow-500 text-stone-900 block"
                        variant="destructive"
                        onClick={handleSave}
                    >
                        Save project
                    </Button>
                </div>
                <div className="w-full mt-4 min-h-[500px] flex gap-4 justify-between">
                    <Card className="px-4 py-2 w-1/2">
                        <CardHeader>
                            <CardTitle>Create project Template</CardTitle>
                            <CardDescription>
                                Template in JSON format
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full flex flex-row-reverse justify-between">
                                <Button onClick={handleTemplateFormat}>
                                    Format template
                                </Button>
                                {templateError ? (
                                    <Badge variant="destructive">
                                        {templateError}
                                    </Badge>
                                ) : null}
                            </div>
                            <Textarea
                                className="mt-2"
                                value={templateText}
                                onChange={handleTemplateChange}
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
                        <CardContent>
                            <div className="w-full flex flex-row-reverse justify-between">
                                <Button onClick={handleInputFormat}>
                                    Format input
                                </Button>
                                {inputError ? (
                                    <Badge variant="destructive">
                                        {inputError}
                                    </Badge>
                                ) : null}
                            </div>
                            <Textarea
                                className="mt-2"
                                value={inputText}
                                onChange={handleInputChange}
                                rows={17}
                            />
                        </CardContent>
                    </Card>
                    <Card className="px-4 py-2 w-1/2">
                        <CardHeader>
                            <CardTitle>Output Example</CardTitle>
                            <CardDescription>
                                See output which task solution produce
                            </CardDescription>
                            <CardContent>
                                <pre>{displayOutput}</pre>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </SandboxContext.Provider>
    );
};
