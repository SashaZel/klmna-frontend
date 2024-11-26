import * as React from "react";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";
import { EditProject } from "@/components/pages/EditProject";

export const Route = createLazyFileRoute("/admin/project/$projectId/edit")({
    component: RouteComponent,
});

function RouteComponent() {
    const { projectId } = useParams({ strict: false });
    if (!projectId) {
        return <div>{"Ooops... doesn't exist"}</div>;
    }
    return <EditProject projectId={projectId} />;
}
