

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
            <div className='h-full w-full bg-[#9685cf]'>
                <h1 className='text-[#ffa842] font-extrabold text-[20px] mt-[10vh] mb-[20px]'>مرحبا بك مرة اخرى</h1>
                <p className='text-[#ffa842] mb-[20px]'>  قم بادخال بيانتك لتسجيل الدخول</p>
                <button className='border-[#ffa842] border-solid border-[1px] text-[14px] rounded-[12px] text-[#ffa842] p-1'>تسجيل جديد</button>
            </div>

            <div className='Signin-input'>
            <input type="email" className='text-right' value={theEmail} onChange={(e)=> {setTheEmail(e.target.value)}} placeholder='الايميل'/>
            <input type="password" className='text-right' value={thePassword} onChange={(e)=> {setThePassword(e.target.value)}} placeholder='كلمة المرور'/>
            <button  onClick={handleClick}  className='btnSign bg-[#9685cf] text-[black]'>تسجيل الدخول</button>

            <ul className=' reg flex mt-[0] text-center ml-[auto] p-[8px]'>
                <p className='mr-[10px]'>ليس لديك حساب</p>
             
                {/* <li><Link to='/' className='register'>Register</Link></li> */}
            </ul>
            </div>
          
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#9685CF" fill-opacity="1" d="M0,96L40,117.3C80,139,160,181,240,202.7C320,224,400,224,480,224C560,224,640,224,720,213.3C800,203,880,181,960,186.7C1040,192,1120,224,1200,229.3C1280,235,1360,213,1400,202.7L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
                    </svg>
    </div>
  )
}



export default Signin