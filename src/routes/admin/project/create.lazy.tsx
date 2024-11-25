import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { CreateProject } from '@/components/pages/CreateProject'

export const Route = createLazyFileRoute('/admin/project/create')({
  component: CreateProject,
})
