import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/project/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /admin/project/create!'
}
