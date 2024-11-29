import * as React from "react";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Task } from "@/components/pages/Task";

export const Route = createFileRoute("/$projectId/task")({
    component: RouteComponent,
});

function RouteComponent() {
    const { projectId } = useParams({ strict: false });
    if (!projectId) {
        return <div>{"Ooops... doesn't exist"}</div>;
    }
    return <Task projectId={projectId} />;
}
