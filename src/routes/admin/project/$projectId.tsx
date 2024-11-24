import * as React from 'react'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/project/$projectId')({
  component: RouteComponent,
  pendingComponent: () => <div>Loading....</div>,
  loader: async ({ params }) => {
    // return fetchPost(params.postId)
    return new Promise((res, rej) => {
      setTimeout(() => {
        console.log("fetched", params.projectId)
        res(params.projectId)
      }, 2000)
    })
  },
})

function RouteComponent() {
  const { projectId } = useParams({ strict: false })
  return <div>
    <h2>{'Hello /admin/project/$projectId!'}</h2>
    <div>Here is project = {projectId}</div>
  </div>
}
