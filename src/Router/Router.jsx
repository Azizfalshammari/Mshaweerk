import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import LogInPage from "../Pages/LogInPage";
import SignUpPage from "../Pages/SignUpPage";
import SchedulerPage from "../Pages/SchedulerPage";
import ProfilePage from "../Pages/ProfilePage";
import Test from "../Components/Test";
import Popup from "../Components/Popup";
import Card from "../Components/Card";

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
    path: "/scheduler",
    element: <SchedulerPage/>,
  },
{
    path: "/profile",
    element: <ProfilePage/>,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/Popup",
    element: <Popup/>,
  },
  {
    path: "/Card",
    element: <Card/>,
  },
]);
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
