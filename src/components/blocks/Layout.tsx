import { PropsWithChildren } from "react";
import { Link } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import reactLogo from "@/assets/abstract-background.svg";
import { Sandbox } from "./Sandbox";

export const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="w-full bg-choco-100">
            <div className="w-full h-96 absolute bg-plum-950 overflow-hidden">
                <img className="w-full overflow-hidden opacity-10" src={reactLogo} />
            </div>
            <section className="w-full min-h-screen flex flex-col items-center justify-between  relative">
                <header className="w-full fixed top-0 h-18 flex items-center justify-center bg-plum-950 box-border border-b border-b-neutral-500 z-50">
                    <div className="mx-auto min-w-[640px] max-w-[640px] md:min-w-[756px] md:max-w-[756px] lg:min-w-[980px] lg:max-w-[980px] xl:min-w-[1140px] xl:max-w-[1140px] flex items-center justify-between  bg-plum-950 z-50">
                        <Link to="/">
                            <h1 className="text-neutral-50 font-extrabold tracking-tighter text-2xl">KLMNA</h1>
                        </Link>
                        <Navbar />
                    </div>
                </header>
                <article className="mx-auto pt-24  min-w-[640px] max-w-[640px] md:min-w-[756px] md:max-w-[756px] lg:min-w-[980px] lg:max-w-[980px] xl:min-w-[1140px] xl:max-w-[1140px]  min-h-[90vh] h-full flex flex-col justify-start z-10">
                    <Sandbox>{children}</Sandbox>
                </article>
                <footer className="mt-6 w-full border-t border-t-neutral-300">
                    <div className="mt-4 mx-auto  min-w-[640px] max-w-[640px] md:min-w-[756px] md:max-w-[756px] lg:min-w-[980px] lg:max-w-[980px] xl:min-w-[1140px] xl:max-w-[1140px] h-12 flex justify-between">
                        <div>
                            <span className="font-bold">Klmna</span>{" "}
                            <span className="text-neutral-500">Powerhouse for AI data</span>
                        </div>
                        <div>
                            <a
                                className="text-plum-950 hover:text-neutral-500"
                                href="https://github.com/SashaZel"
                                target="_blank"
                            >
                                Contact us
                            </a>
                        </div>
                    </div>
                </footer>
            </section>
        </div>
    );
};
