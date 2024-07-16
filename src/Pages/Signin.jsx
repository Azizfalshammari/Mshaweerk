

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
    </div>
  )
}



export default Signin