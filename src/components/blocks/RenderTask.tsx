import { Badge } from "@/components/ui/badge";
import { RenderElement } from "./RenderElement";

interface IRenderTaskProps {
    template: Record<string, any>[];
}

export const Task = ({ template }: IRenderTaskProps) => {
    if (!Array.isArray(template)) {
        return <Badge variant="destructive">Invalid template</Badge>;
    }
    return (
        <>
            {template.map((element, index) => (
                <RenderElement
                    key={String(element.type) + index}
                    element={element}
                />
            ))}
        </>
    );
};
