import { Docs } from '@/components/pages/Docs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Docs />
}
