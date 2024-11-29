import { useContext } from "react";
import { IBduiButton } from "../types/BduiTypes";
import { Button } from "../ui/button";
import { SandboxContext } from "../blocks/Sandbox";

interface IBduiButtonProps {
    element: IBduiButton;
}

export const BduiButton = ({ element }: IBduiButtonProps) => {
    const { setSolution } = useContext(SandboxContext);
    const handleClick = () => {
        if (element.outputPath) {
            setSolution(element.outputPath, element.value);
        }
    };

    return (
        <Button className="mx-1 my-2 block" onClick={handleClick}>
            {element.label}
        </Button>
    );
};
