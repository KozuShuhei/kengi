import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const ROUTES = import.meta.glob(
  '/src/pages/**/[A-Z]*.tsx',
   { import: 'default', eager: true }
)

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|Index|\.tsx$/g, '')
    .replace(/\[\.{3}.+\]/, '*')
    .replace(/\[(.+)\]/, ':$1')
    .toLowerCase()

  const Component = ROUTES[route] as React.ComponentType;

  return { path, element: <Component />}
})
const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);