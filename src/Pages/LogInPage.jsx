import React from 'react'
import img from '../assets/logo-jadw.png'
import { Link } from 'react-router-dom';

function LogInPage() {
  return (    
    <div className="w-full min-h-screen flex items-center justify-center px-5 py-5 bg-black-100">
        <div className="bg-white text-black-500 max-sm:w-[100%]  overflow-hidden w-[50vw]">
            <div className="md:flex w-full rounded-lg border-2 border-[#9685CF] ">
                <div className=" md:block w-[50vw] max-sm:w-[100%] bg-[#9685CF] py-10 px-10">
                    <Link to="/">
                    <img src={img} className='mt-25'/>
                    </Link>
                </div>
                <div className="w-full py-10 px-5 md:px-10">
                    <div className="text-center mb-10">
                        <h1 className="font-bold text-3xl text-[#9685CF]">مرحبًا بك مرة أخرى  ,<br/>قم بإدخال بياناتك لتسجييل الدخول</h1>
                    </div>
                    <div>
                        
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label htmlFor="" className="text-xs font-semibold px-1">الإيميل</label>
                                <div className="flex">
                                    <input type="email" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]" placeholder="ali@gmail.com"/>
                                </div>
                            </div>
                        </div>
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label htmlFor="" className="text-xs font-semibold px-1">كلمة المرور</label>
                                <div className="flex">
                                    <input type="password" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]" placeholder="************"/>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <button className="block w-full max-w-xs mx-auto bg-[#9685CF] hover:bg-[#FFA842] focus:bg-[#FFA842] text-white rounded-lg px-3 py-3 font-semibold">تسجيل دخول</button>
                                <p className='text-center p-3 text-black'> لا تملك حساب ؟ <Link to="/signup">قم بإنشاء حساب الان!</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default LogInPage;