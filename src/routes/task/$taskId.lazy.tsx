import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/task/$taskId')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /task/$taskId!'
}
