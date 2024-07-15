

import axios from 'axios';
import React, { useState , useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

 function Signin() {
    const [theEmail , setTheEmail] = useState([]);
    const [thePassword , setThePassword] = useState([]);
    const [event , setEvent] = useState(false);
    // const navegate = useNavigate()

    const handleClick =()=> {
    //   setEvent(true)
    //   navegate('/')
    if(localStorage.getItem("Email") == theEmail && localStorage.getItem('pass') == thePassword){
        console.log(localStorage.getItem("theName"))
        // navegate('/')
    }
    }
    
  return (
    <div>
        <div className='Signin-content text-center w-[80%] shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden'>
            {/* <img src="https://im.rediff.com/news/2023/jul/24twitter.jpg?w=670&h=900" alt="" /> */}
            <div className='h-full w-full bg-[#7055be]'>
                <h1 className='text-[#f9a950] font-extrabold text-[20px] mt-[10vh]'>Wellcome Back!</h1>
            </div>

            <div className='Signin-input'>
            <input type="email" value={theEmail} onChange={(e)=> {setTheEmail(e.target.value)}} placeholder='Enter Your Email'/>
            <input type="password" value={thePassword} onChange={(e)=> {setThePassword(e.target.value)}} placeholder='Enter Your Password'/>
            <button  onClick={handleClick}  className='btnSign bg-[#7055be] text-[black]'>Login</button>

            <ul className=' reg flex mt-[0] text-center ml-[auto] p-[8px]'>
                <p className='mr-[10px]'>Don't have an account? </p>
                {/* <li><Link to='/' className='register'>Register</Link></li> */}
            </ul>
            </div>

    </div>
    </div>
  )
}



export default Signin