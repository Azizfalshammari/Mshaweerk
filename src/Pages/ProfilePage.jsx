

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from '../Components/Nav';

function ProfilePage() {
    const id = localStorage.getItem('userId');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address , setAdress] = useState('')
    const [event, setEvent] = useState(false);
    const [showPreviousTrips, setShowPreviousTrips] = useState(false);

    useEffect(() => {
        axios.get(`https://6657370d9f970b3b36c86882.mockapi.io/login/${id}`).then((res) => {
            setFName(res.data.firstName); 
            setLName(res.data.lastName);  
            setEmail(res.data.email);
            setPhone(res.data.phone);
        });
    }, [id]);

    const update = () => {
        axios.put(`https://6657370d9f970b3b36c86882.mockapi.io/login/${id}`, {
            firstName: fName, 
            lastName: lName,  
            email: email,
            phone: phone,
        }).then(() => {
            setEvent(true);
        });
    };

    return (
        <div className='profile text-right'>
            {/* <Nav /> */}
            {/* section personal information */}
            {/* <div className='h-[200px] w-full bg-[#7055be] pt-[10px]  rounded-[12px]'> */}
            <div className='bg-[#ececec] pb-[10vh] w-[90%] m-[auto] pt-[20px] '>
            <h1 className='p-2 text-[18px] font-semibold pr-4 border-solid border-[2px]  rounded-[15px] w-fit  border-[#f9a950] text-[#f9a950] ml-auto mr-[10vw]'>
                    إعدادات الحساب
                </h1>
            {/* </div> */}
            <div className='flex p-4 justify-center mt-[20vh]'>
                <div className="form w-[60%] mt-[-10vh] ">
                    <div className="bg-white p-4 shadow-xl   rounded-[4px]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="data text-lg font-semibold ml-auto mb">
                                المعلومات الشخصيه
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="" className="block text-gray-600">
                                    الاسم الأخير
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="w-full p-2 border border-gray-300 rounded-[3px]"
                                    value={lName}
                                    onChange={(e) => setLName(e.target.value)}
                                />
                            </div>
                            <div>
                            <label htmlFor="" className="block text-gray-600">
                                    الاسم الاول
                                </label>
                                <input
                                    type="text"
                                    name="fristName"
                                    className="w-full p-2 border border-gray-300 rounded-[3px]"
                                    value={fName}
                                    onChange={(e) => setFName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-gray-600">
                                    الإيميل
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full p-2 border border-gray-300 rounded-[3px]"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">
                                     الهاتف
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder=''
                                    className="w-full p-2 border border-gray-300 rounded-[3px] "
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    
                                />
                            </div>
                            <div className=''>
                                <label className="block text-gray-600">
                                     العنوان
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    className="w-full p-2 border border-gray-300 rounded-[3px]"
                                    value={address}
                                    onChange={(e) => setAdress(e.target.value)}
                                />
               
                        </div>
                        <div className=''>
                                <label className="block text-gray-600">
                                    الشارع
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    className="w-full p-2 border border-gray-300 rounded-[3px]"
                                    value={address}
                                    onChange={(e) => setAdress(e.target.value)}
                                />
                            </div>
                        </div>
                

                        {/* Collapse Section for Previous Orders */}
                        <div className='bg-white pt-4 pb-4 '>
                            <div className='flex-col justify-between'>
                                {/* <button
                                    onClick={() => setShowPreviousTrips(!showPreviousTrips)}
                                    className='w-full bg-[#fff]  pt-2 pb-2 rounded-md text-right mb-4 mr-auto'
                                >
                                         <i className="fa-solid fa-angles-left mr-[20px]"></i>
                                    مشاويرك السابقة
                                    
                                </button> */}
                                <div></div>
                           
                                <div
                                    className={`collapse-content ${showPreviousTrips? 'block' : 'hidden'} p-4`}
                                >
                                    {/* Add your content here */}
                                    <p className='text-[red]'>ااااا</p>
                                </div>
                            </div>
                        </div>

                        <button
                            className='save ml-auto pb-4 bg-[#7055be] text-[#fff] rounded-lg grid col-end-7 col-span-2 mt-5 w-[12em] p-2'
                            onClick={update}
                        >
                            حفظ
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className='sidebar  rounded-[4px] w-[20%] p-[10px] pb-[1px] bg-[#7055be] text-[#fff] shadow-xl mt-[-10vh] ml-[10px]'>
                    <ul>
                        <li className='rounded-[6px] bg-[#9685cf6b] p-[8px] mb-[8px]'>حسابي <span className='ml-[10px]'><i className="fa-regular fa-user"></i></span></li>
                        <li className='rounded-[6px] hover:bg-[#9685cf6b] p-[8px] mb-[8px]'>مشاويرك <span className='ml-[10px]'><i class="fa-solid fa-car-on"></i></span></li>
                        <li className='rounded-[6px] hover:bg-[#9685cf6b] p-[8px] mb-[8px]'>تسجيل الخروج <span className='ml-[10px]'><i class="fa-solid fa-right-from-bracket"></i></span></li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
    );
}

export default ProfilePage;
