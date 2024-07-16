import React from 'react'
import img from '../assets/logo-jadw.png'
import { Link } from 'react-router-dom';

function SignUpPage() {
  return (    
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5 bg-black-100">
        <div className="bg-white text-black-500  overflow-hidden w-[50vw]">
            <div className="md:flex w-full rounded-lg border-2 border-[#9685CF] ">
                <div className=" md:block w-[50vw] bg-[#9685CF] py-10 px-10">
                    <Link to="/">
                    <img src={img} className='mt-24'/>
                    </Link>
                </div>
                <div className="w-full py-10 px-5 md:px-10">
                    <div className="text-center mb-10">
                        <h1 className="font-bold text-3xl text-[#9685CF]">قم بإدخال معلوماتك للتسجيل</h1>
                    </div>
                    <div>
                        <div className="flex -mx-3">
                            <div className="w-1/2 px-3 mb-5">
                                <label htmlFor="" className="text-xs font-semibold px-1">الأسم الأول</label>
                                <div className="flex">
                                    <input type="text" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]" placeholder="Ali"/>
                                </div>
                            </div>
                            <div className="w-1/2 px-3 mb-5">
                                <label htmlFor="" className="text-xs font-semibold px-1">الأسم الاخير</label>
                                <div className="flex">
                                    <input type="text" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]" placeholder="Hakami"/>
                                </div>
                            </div>
                        </div>
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
                                <label htmlFor="" className="text-xs font-semibold px-1">رقم الهاتف</label>
                                <div className="flex">
                                    
                                    <input type="tel" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]" placeholder="123-456-7890"/>
                                </div>
                            </div>
                        </div>
                       
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label htmlFor="" className="text-xs font-semibold px-1">العنوان</label>
                                <div className="flex">
                                    
                                    <input type="text" className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]" placeholder="123 Main St, City, Country"/>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <button className="block w-full max-w-xs mx-auto bg-[#9685CF] hover:bg-[#FFA842] focus:bg-[#FFA842] text-white rounded-lg px-3 py-3 font-semibold">تسجيل</button>
                                <p className='text-center p-3 text-black'> لديك حساب ؟ <Link to="/login">قم بتسجيل الدخول</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default SignUpPage;

