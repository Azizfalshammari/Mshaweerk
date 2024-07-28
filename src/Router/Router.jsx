import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '../Pages/Login'
import Home from '../Pages/Home'
import Signup from "../Pages/Signup";
import SchedulerPage from '../Pages/SchedulerPage'
import ProfilePage from "../Pages/ProfilePage";
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
