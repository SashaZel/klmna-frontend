import { Link, LinkProps } from "@tanstack/react-router";

interface NavbarButtonProps {
    to: LinkProps["to"];
    label: string;
}

export const NavbarButton = ({ to, label }: NavbarButtonProps) => {
    return (
        <Link
            to={to}
            activeOptions={{ exact: true }}
            className="inline-flex items-center px-1 h-9 py-9 text-sm text-center bg-transparent border-b sm:text-base focus:outline-none whitespace-nowrap text-neutral-300 [&.active]:text-neutral-100 border-transparent [&.active]:border-neutral-100 [&.active]:hover:border-neutral-300 [&.active]:font-bold [&.active]:font-bold"
        >
            {label}
        </Link>
    );
};

export const Navbar = () => {
    return (
        <div className="flex gap-8 overflow-x-auto overflow-y-hidden whitespace-nowrap dark:border-neutral-700 box-border">
            <NavbarButton to={"/"} label="Home" />
            <NavbarButton to={"/admin/projects"} label="Projects" />
            <NavbarButton to={"/admin"} label="Admin" />
            <NavbarButton to={"/docs"} label="Docs" />
            <NavbarButton to={"/about"} label="About" />
        </div>
    );
};
