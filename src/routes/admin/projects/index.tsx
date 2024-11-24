import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Link to="/admin/project/$projectId" params={{ projectId: '123' }}>
      Project 123
    </Link>
  </div>
}
