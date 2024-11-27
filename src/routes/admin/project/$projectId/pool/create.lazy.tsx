import * as React from "react";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";
import { CreatePool } from "@/components/pages/CreatePool";

export const Route = createLazyFileRoute(
    "/admin/project/$projectId/pool/create",
)({
    component: RouteComponent,
});

function RouteComponent() {
    const { projectId } = useParams({ strict: false });
    if (!projectId) {
        return <div>{"Ooops... doesn't exist"}</div>;
    }
    return <CreatePool projectId={projectId} />;
}
