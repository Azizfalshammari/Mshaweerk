import React from "react";
import Navbar from "../components/Navbar";
import Landding from "../components/Landding";
import Team from "../components/Team";
import Footer from "../components/Footer";
import Animation from "../components/Animation";
import Cards from "../components/Cards";
function Home() {
  return (
    <>
      <Navbar />
      <Landding />
      <Cards />
      <Animation />
      <Team />
      <Footer />
    </>
  );
}

export default Home;
