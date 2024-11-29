import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/admin/project/create")({
    component: () => "dude create something",
});
