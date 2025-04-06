import { useContext } from "react";
import { IBduiTextInput } from "../types/BduiTypes";
import { Input } from "@/components/ui/input";
import * as lodash from "lodash";
import { SandboxContext } from "../blocks/Sandbox";

interface IBduiTextInputProps {
    element: IBduiTextInput;
}

export const BduiTextInput = ({ element }: IBduiTextInputProps) => {
    const { output, setSolution } = useContext(SandboxContext);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.currentTarget.value;
        if (element.outputPath) {
            setSolution(element.outputPath, raw);
        }
    };

    const value = element.outputPath ? lodash.get(output, element.outputPath) : "";

    return <Input className="mx-1 my-2 block" placeholder={element.placeholder} onChange={handleInput} value={value} />;
};
