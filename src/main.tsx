import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";
// import { rootRoute } from "./routes/__root.tsx";
// import { indexRoute } from "./routes/index.lazy.tsx";
// import { aboutRoute } from "./routes/about.tsx";

import "./index.css";

import { routeTree } from './routeTree.gen'
// const routeTree = rootRoute

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
