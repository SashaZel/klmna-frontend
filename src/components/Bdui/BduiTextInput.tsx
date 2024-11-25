import { IBduiTextInput } from "../types/BDUITypes";
import { Input } from "@/components/ui/input";

interface IBduiTextInputProps {
    element: IBduiTextInput;
}

export const BduiTextInput = ({ element }: IBduiTextInputProps) => {
    return (
        <Input className="mx-1 my-2 block" placeholder={element.placeholder} />
    );
};
