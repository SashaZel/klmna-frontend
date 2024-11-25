import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import {
    Outlet,
    RouterProvider,
    Link,
    createRouter,
    createRoute,
    createRootRoute,
  } from '@tanstack/react-router'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-between bg-stone-200 relative">
      <header className="w-full h-12 flex items-center justify-center bg-stone-900 z-50">
        <div className="mx-auto h-12 min-w-[1140px] max-w-[1140px] fixed top-0 flex justify-between  bg-stone-900 z-50">
          <h1 className="text-stone-50">KLMNA</h1>
          <nav className="flex gap-1">
          <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/admin" className="[&.active]:font-bold">
          Admin
        </Link>
            <Button>nav1</Button>
            <Button>nav2</Button>
            <Button>nav3</Button>
          </nav>
        </div>
      </header>
        <div className="w-full h-96 absolute bg-stone-900"></div>
      <article className="mx-auto pt-12 min-w-[1140px] max-w-[1140px] min-h-full z-10">
        {children}
      </article>
      <footer className="mt-4 mx-auto min-w-[1140px] max-w-[1140px] h-12 flex justify-between">
        {"Copyrigth (c) Klmna"}
        <div>
          <Button variant="ghost">Contact me</Button>
        </div>
      </footer>
    </section>
  );
};
