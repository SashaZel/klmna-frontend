import { getProjects } from "@/api/api";
import { IProject } from "@/api/types";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Outlet,
    RouterProvider,
    Link,
    createRouter,
    createRoute,
    createRootRoute,
  } from '@tanstack/react-router'

export const Index = () => {
  const [projects, setProjects] = useState<IProject[]>();

  useEffect(() => {
    const setup = async () => {
      const fetchedProjects = await getProjects();
      if (fetchedProjects.ok && fetchedProjects.data) {
        setProjects(fetchedProjects.data);
      }
    };
    setup();
  }, []);

  if (!projects) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-2">
      {projects.map((project) => <Card>
        <CardHeader>
        <CardTitle>{project.Name}</CardTitle>
        <CardDescription>{project.ID}</CardDescription>
        <CardContent>
            <div>Here is some project</div>
            <Link to={'/admin/project/$projectId'} params={{ projectId: project.ID}}>ProjectPage</Link>
        </CardContent>
      </CardHeader>
      </Card>)}
    </div>
  );
};
