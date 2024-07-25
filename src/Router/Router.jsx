import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '../pages/Login'
import Home from '../pages/Home'
import Signup from "../pages/Signup";
import SchedulerPage from '../pages/SchedulerPage'
import ProfilePage from "../pages/ProfilePage";
function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
   
    {
      path: "/login",
      element: <Login />,
    },
    {
        path: "/scheduler",
        element: <SchedulerPage/>,
      },
    {
        path: "/profile",
        element: <ProfilePage/>,
      },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
