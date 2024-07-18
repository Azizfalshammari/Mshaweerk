import React from "react";
import ProfilePage  from "./Pages/ProfilePage";
import Photos from "./Components/Photos";
import './App.css';
// import LandingPage from "./Pages/LandingPage";
import SignUpPage from "./Pages/SignUpPage";
import Signin from "./Pages/Signin";
import LandingPage from "./Pages/LandingPage";
import Animation from "./Components/Animation";
import Card from "./Components/Card";
import SchedulerPage from "./Pages/SchedulerPage";
import Popup from "./Components/Popup";


function App() {
  return (
    <>
      {/* {" "} */}
      <div className="w-full">
        <Popup></Popup>
        {/* <SchedulerPage></SchedulerPage> */}
        <Card></Card>
        <LandingPage></LandingPage>
        <Animation></Animation>
        <ProfilePage></ProfilePage>
        {/* <LandingPage></LandingPage> */}
        <SignUpPage></SignUpPage>
        <Signin></Signin>
        {/* <Photos/> */}
      </div>
    </>
  );
}



export default App;
