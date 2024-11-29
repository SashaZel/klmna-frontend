import React, { createContext, PropsWithChildren, useState } from "react";
import * as lodash from "lodash";

interface ISandboxContext {
    input: object;
    setInput: (updatedInput: object) => void;
    getInput: (path: string) => object | null;
    output: object;
    setOutput: (_updated: object) => void;
    template: Record<string, any>[];
    error?: string;
    setError: (updated: string | undefined) => void;
    setTemplate: (updated: Record<string, any>[]) => void;
    setSolution: (path: string, value: any) => void;
}

const defaultSandboxContextValue: ISandboxContext = {
    input: {},
    setInput: ({}) => {},
    getInput: (_path: string) => null,
    output: {},
    setOutput: ({}) => {},
    template: [],
    setError: () => {},
    setTemplate: (_updated: {}) => {},
    setSolution: (_path: string, _value: any) => {},
};

export const SandboxContext = createContext(defaultSandboxContextValue);

export const Sandbox = ({ children }: PropsWithChildren) => {
    const [template, setTemplate] = useState<Record<string, any>[]>([]);
    const [input, setInput] = useState<object>({});
    const [error, setError] = useState<string>();
    const [output, setOutput] = useState<object>({});

    const getInput = (path: string) => lodash.get(input, path);

    const setSolution = (path: string, value: any) => {
        const updatedOutput = lodash.set({ ...output }, path, value);
        setOutput(updatedOutput);
    };

    return (
        <SandboxContext.Provider
            value={{
                input,
                output,
                setOutput,
                template,
                error,
                setError,
                setTemplate,
                getInput,
                setInput,
                setSolution,
            }}
        >
            {children}
        </SandboxContext.Provider>
    );
};
