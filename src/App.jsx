import React from "react";
import ProfilePage  from "./Pages/ProfilePage";
import Photos from "./Components/Photos";
import './App.css';
// import LandingPage from "./Pages/LandingPage";
import SignUpPage from "./Pages/SignUpPage";
import Signin from "./Pages/Signin";
import LandingPage from "./Pages/LandingPage";


function App() {
  return (
    <>
      {/* {" "} */}
      <div className="w-full">
        <LandingPage></LandingPage>
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
