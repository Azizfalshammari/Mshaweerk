// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import Nav from '../Components/Nav';


//  function ProfilePage() {
//     const id = localStorage.getItem('userId');
//     const [userInfo , setUserInfo] = useState({});
//     const [fName , setFName] = useState('');
//     const [lName , setLName] = useState('');
//     const [email , setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [event , setEvent] = useState(false)
//     const [showPreviousOrders, setShowPreviousOrders] = useState(false);



//     useEffect(()=> {
//         axios.get(`https://6657370d9f970b3b36c86882.mockapi.io/login/${id}`).then((res)=> {
//             setFName(res.data.fristName);
//             setLName(res.data.lastName);
//             setEmail(res.data.email);
//             setPhone(res.data.phone);
//         })
//     },[])

//     const update =()=> {
//         axios.put(`https://6657370d9f970b3b36c86882.mockapi.io/login/${id}`, {
//             fristName: fName,
//             lastName: lName,
//             email: email,
//             phone: phone,
//         }).then((res)=> {
//             setEvent(true)
//         })
//     }

//   return (
//     <div className='profile text-right'>
      
//       <Nav></Nav>
//         {/* section personal information  */}
//         <div className='h-[200px] w-full bg-[#3e5cb2] pt-[10px]'>
//         <h1 className='p-2 text-[18px] font-semibold pr-4  border-solid border-[2px] rounded-[15px] w-fit text-[#fff] border-[#fe6a00] ml-auto mr-[20px]'>إعدادات الحساب</h1>
//         </div>
//         <div className='flex p-4 bg-[] m-[auto] justify-center'>

//             <div className="form w-[60%] mt-[-10vh]">
//             <div className="bg-white p-4  shadow-xl mb-6">
//                     <div className="flex justify-between items-center mb-4">
//                       <h3 className="text-lg font-semibold ml-auto mb">
//                         المعلومات الشخصيه </h3>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label  htmlFor=""  className="block text-gray-600">
//                           الاسم الاول </label>
//                         <input type="text" name="FirstName"
//                           className="w-full p-2 border border-gray-300 rounded-[3px]"
//                           value={fName} onChange={(e)=> setFName(e.target.value)}/>
//                       </div>
//                       <div>
//                         <label  htmlFor="" className="block text-gray-600">الاسم الأخير</label>
//                         <input
//                           type="text"
//                           name="lastName"
//                           className="w-full p-2 border border-gray-300 rounded-[3px]"
//                           value={lName} onChange={(e)=> setLName(e.target.value)}
//                         />
//                       </div>
//                       <div>
//                         <label  htmlFor="" className="block text-gray-600">الإيميل</label>
//                         <input type="email" name="email"
//                           className="w-full p-2 border border-gray-300 rounded-[3px]"
//                           value={email} onChange={(e)=> setEmail(e.target.value)}/>
//                       </div>

//                       <div>
//                         <label className="block text-gray-600">رقم الهاتف</label>
//                         <input type="text" name="phone"
//                           className="w-full p-2 border border-gray-300 rounded-[3px]"
//                           value={phone} onChange={(e)=> setPhone(e.target.value)}/>
//                       </div>


//                       </div>
//                       {/* <div className="grid grid-cols-2 gap-4 w-full">
//                         <div className=''>
//                         <div>مشاويرك السابقة</div>
//                         {/* <label htmlFor="" className='block text-gray-600'>مشاويرك السابقة</label> */}
//                         {/* <input type="text" className='w-full p-2 border border-gray-300 rounded-[3px]' /> */}
//                         </div>  
//                       {/* </div> */} 
//                                   {/* Collapse Section for Previous Orders */}
//                     <div className='bg-white p-4 shadow-xl'>
//                         <div className='collapse'>
//                             <input
//                                 type='checkbox'
//                                 checked={showPreviousOrders}
//                                 onChange={() => setShowPreviousOrders(!showPreviousOrders)}
//                                 className='hidden'
//                                 id='collapse-toggle'
//                             />
//                             <label
//                                 htmlFor='collapse-toggle'
//                                 className='block cursor-pointer bg-[#ddd] p-2 rounded-md'
//                             >
//                                 مشاويرك السابقة
//                             </label>
//                             <div
//                                 className={`collapse-content ${showPreviousOrders ? 'block' : 'hidden'} p-4`}
//                             >
//                                 {/* Add your content here */}
//                                 <p>هذه قائمة المشاوير السابقة. سيتم إضافتها لاحقًا.</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                         <button  className='ml-auto pb-4 bg-[#3e5cb2] text-[#fff] rounded-lg grid col-end-7 col-span-2 mt-5 w-[12em] p-2' 
//                         onClick={update} >حفظ</button>
//                       </div>
                     
//             </div>
//             {/* end form  */}

//             <div className='sidebar w-[20%] p-[10px] pb-[1px] bg-[#fff] shadow-xl mt-[-10vh] ml-[10px]'>
//                 <ul>
//                     <li className=' rounded-[6px]   bg-[#ddd] p-[8px] mb-[8px]'>حسابي</li>
//                     {/* <li className='rounded-[6px] hover:bg-[#ddd] p-[8px] mb-[8px]'>المشاوير السابقة</li> */}
//                     {/* <Link to='../' onClick={()=> localStorage.clear()}> */}
//                     <li className=' rounded-[6px] hover:bg-[#ddd]  p-[8px] mb-[8px] '>تسجيل الخروج</li>
//                     {/* </Link> */}
//                 </ul>

//             </div>

//         </div>
//     </div>
//   )
// }


// export default ProfilePage

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from '../Components/Nav';

function ProfilePage() {
    const id = localStorage.getItem('userId');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
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
            <Nav />
            {/* section personal information */}
            <div className='h-[200px] w-full bg-[#3e5cb2] pt-[10px]  rounded-[12px]'>
                <h1 className='p-2 text-[18px] font-semibold pr-4 border-solid border-[2px] rounded-[15px] w-fit text-[#fff] border-[#fe6a00] ml-auto mr-[20px]'>
                    إعدادات الحساب
                </h1>
            </div>
            <div className='flex p-4 justify-center'>
                <div className="form w-[60%] mt-[-10vh] ">
                    <div className="bg-white p-4 shadow-xl mb-6  rounded-[4px]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold ml-auto mb">
                                المعلومات الشخصيه
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="" className="block text-gray-600">
                                    الاسم الاول
                                </label>
                                <input
                                    type="text"
                                    name="FirstName"
                                    className="w-full p-2 border border-gray-300 rounded-[3px]"
                                    value={fName}
                                    onChange={(e) => setFName(e.target.value)}
                                />
                            </div>
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
                                    رقم الهاتف
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="w-full p-2 border border-gray-300 rounded-[3px]"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Collapse Section for Previous Orders */}
                        <div className='bg-white pt-4 pb-4 '>
                            <div className='flex-col justify-between'>
                                <button
                                    onClick={() => setShowPreviousTrips(!showPreviousTrips)}
                                    className='w-full bg-[#fff]  pt-2 pb-2 rounded-md text-right mb-4 mr-auto'
                                >
                                         <i className="fa-solid fa-angles-left mr-[20px]"></i>
                                    مشاويرك السابقة
                                    
                                </button>
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
                            className='ml-auto pb-4 bg-[#3e5cb2] text-[#fff] rounded-lg grid col-end-7 col-span-2 mt-5 w-[12em] p-2'
                            onClick={update}
                        >
                            حفظ
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className='sidebar  rounded-[4px] w-[20%] p-[10px] pb-[1px] bg-[#fff] shadow-xl mt-[-10vh] ml-[10px]'>
                    <ul>
                        <li className='rounded-[6px] bg-[#ddd] p-[8px] mb-[8px]'>حسابي</li>
                        <li className='rounded-[6px] bg-[#ddd] p-[8px] mb-[8px]'>مشاويرك</li>
                        <li className='rounded-[6px] hover:bg-[#ddd] p-[8px] mb-[8px]'>تسجيل الخروج</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
