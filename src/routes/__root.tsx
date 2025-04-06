import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Layout } from '@/components/blocks/Layout';

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </Layout>
  ),
});