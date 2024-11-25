import { IBduiText } from "../types/BDUITypes";

interface IBduiTextProps {
    element: IBduiText;
}

export const BduiText = ({ element }: IBduiTextProps) => {
    return (
        <div className="mx-1 my-2 flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                    {element.header}
                </p>
                <p className="text-sm text-muted-foreground">
                    {element.content}
                </p>
            </div>
        </div>
    );
};
