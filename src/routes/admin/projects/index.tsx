import { createFileRoute } from '@tanstack/react-router'
import { Index } from '@/components/blocks/Index'

export const Route = createFileRoute('/admin/projects/')({
  component: Index,
})

