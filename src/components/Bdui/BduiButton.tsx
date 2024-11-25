import { IBduiButton } from "../types/BDUITypes";
import { Button } from "../ui/button";

interface IBduiButtonProps {
    element: IBduiButton;
}

export const BduiButton = ({ element }: IBduiButtonProps) => {
    return <Button className="mx-1 my-2 block">{element.label}</Button>;
};
