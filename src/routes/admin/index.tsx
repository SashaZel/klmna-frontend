import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Link to="/admin/projects">
      Link to projects
    </Link>
  </div>
}
