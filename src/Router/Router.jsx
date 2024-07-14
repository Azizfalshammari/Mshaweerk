import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import LogInPage from "../Pages/LogInPage";
import SignUpPage from "../Pages/SignUpPage";
import SchedulerPage from "../Pages/SchedulerPage";
import ProfilePage from "../Pages/ProfilePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/schedule",
    element: <SchedulerPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
