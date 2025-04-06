import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/project/$projectId/pool/$poolId/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return 'Hello /admin/project/$projectId/pool/$poolId/!'
}
