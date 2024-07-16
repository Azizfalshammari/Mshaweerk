
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUpPage() {
    const [name , setName] = useState('');
    const [username , setUserName] = useState('')
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    // const navegate = useNavigate()

    const validatEmail = (email)=> {
       return  /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
    }

    const handleClick = ()=> {
        if(name == '' || name.length < 6){
            alert('Enter Your Name')
            return 
        }
        if(email == '' || !validatEmail){
            alert('Enter Your Email')
            return 
        }
        if(password == '' || password.length < 6){
            alert('Enter Your Password')
            return 
        }
    
          localStorage.setItem('Name' , name)
          localStorage.setItem('username', username)
          localStorage.setItem('Email' , email)
          localStorage.setItem('pass' , password)
        //   navegate('/Signin')
        }
        // axios.post('https://6657370d9f970b3b36c86882.mockapi.io/login', {
        //     Name: name,
        //     Email: email,
        //     username: username,
        //     passWord: password
        // }).then((res)=> {
        //     navegate('/Signin')
        // })
    // }
  


  return (
    <div>
   <div>
     <div className='Signin-content text-center w-[80%] shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl h-[60%]'>
       {/* <img src="https://im.rediff.com/news/2023/jul/24twitter.jpg?w=670&h=900" alt="" /> */}
       <div className='h-[500px] w-full bg-[#9685cf]'>
       <h1 className='text-[#ffa842] font-extrabold text-[20px] mt-[15vh] mb-[20px]'>مرحبا بك</h1>
       <p className='text-[#ffa842] mb-[20px] '>قم بإدخال  معلوماتك للتسجيل</p>
       <button className='border-[#ffa842] border-solid border-[1px] text-[14px] rounded-[12px] text-[#ffa842] p-1'>تسجيل دخول</button>
       </div>
      <div className='Signin-input '>
        <h1 className='mb-[10px] text-[#f9a950] font-semibold'>إنشاء حساب</h1>
            {/* <div className='flex justify-center text-[14px]  mb-[10px]'><i className="fa-brands fa-google-plus-g bg-[#eee] p-2 rounded-[50%] mr-[10px]"></i><i className="fa-brands fa-twitter bg-[#eee] p-2 rounded-[50%] mr-[10px]"></i></div> */}
         <input type="text" className='text-right' value={name} placeholder='الإسم' onChange={(e)=>{setName(e.target.value)}}/>
         <input type="text" className='text-right' value={username} placeholder='الاسم الاخير' onChange={(e)=>{setUserName(e.target.value)}}/>
      <input type="email" className='text-right' value={email} onChange={(e)=>{setEmail(e.target.value)}}  placeholder='الإيميل'/>
       <input type="password" className='text-right' value={password} onChange={(e)=>{setPassword(e.target.value)}}  placeholder='كلمة المرور'/>
       <button  onClick={handleClick} className='btnSign bg-[#7055be] text-[black]'>تسجيل</button>
      
       <ul className=' reg flex mt-[0] text-center ml-[auto] p-[8px]'>
              <p className='mr-[10px]'>لديك حساب؟ </p>
               <li>
                {/* <Link to='/' className='register text-[#87898a]'> */}
               Login here
               
               {/* </Link> */}
               </li>
        
           </ul>
           {/* <p><Link to='/' className='register text-[#2c4755] bold'>Back Home</Link></p> */}
      </div>
  </div>
     </div>
    </div>
  )
}
export default SignUpPage


















