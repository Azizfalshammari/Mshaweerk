import React from 'react'
import Navbar from '../Components/NavBar'
import Landding from '../Components/Landding'
import Team from '../Components/Team'
import Footer from '../Components/Footer'
import Animation from '../Components/Animation'
import Cards from '../Components/Cards'
function Home() {
  return (
    <>
   <Navbar/> 
   <Landding/> 
   {/* <Cards/> */}
   <Animation/>
   <Team/>
   <Footer/>
  
    </>
  )
}

export default Home