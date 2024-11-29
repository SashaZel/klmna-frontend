import { useContext } from "react";
import { IBduiText } from "../types/BduiTypes";
import * as lodash from "lodash";
import { SandboxContext } from "../blocks/Sandbox";

interface IBduiTextProps {
    element: IBduiText;
}

export const BduiText = ({ element }: IBduiTextProps) => {
    const { input } = useContext(SandboxContext);
    const header = element.headerPath ? lodash.get(input, element.headerPath) : null;
    const content = element.contentPath ? lodash.get(input, element.contentPath) : null;
    return (
        <div className="mx-1 my-2 flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{header}</p>
                <p className="text-sm text-muted-foreground">{content}</p>
            </div>
        </div>
    );
};
