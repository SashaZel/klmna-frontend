import { BduiButton } from "../Bdui/BduiButton";
import { BduiText } from "../Bdui/BduiText";
import { BduiTextInput } from "../Bdui/BduiTextInput";
import { IBduiButton, IBduiElements, IBduiTextInput } from "../types/BDUITypes";
import { Badge } from "@/components/ui/badge";

interface IRenderElementProps {
    element: Record<string, any>;
}

export const RenderElement = ({ element }: IRenderElementProps) => {
    if (element.type === "text") {
        return <BduiText element={element as IBduiElements["text"]} />;
    }
    if (element.type === "button") {
        return <BduiButton element={element as IBduiButton} />;
    }
    if (element.type === "textInput") {
        return <BduiTextInput element={element as IBduiTextInput} />;
    }
    console.error("@RenderElement unknown element");
    return <Badge variant="destructive">Invalid element</Badge>;
};
