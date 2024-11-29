import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Button } from "@/components/ui/button";
import { Layout } from '@/components/blocks/Layout';

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </Layout>
  ),
});