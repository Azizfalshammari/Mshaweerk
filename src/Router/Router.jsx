import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
