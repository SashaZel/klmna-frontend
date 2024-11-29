import * as React from 'react'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { Project } from '@/components/pages/Project'

export const Route = createFileRoute('/admin/project/$projectId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { projectId } = useParams({ strict: false })
  if (!projectId) {
    return <div>{"Ooops... doesn't exist"}</div>
  }
  return <Project projectId={projectId} />
}
