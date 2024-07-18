

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Nav from '../Components/Nav';

// function ProfilePage() {
//     const id = localStorage.getItem('userId');
//     const [fName, setFName] = useState('');
//     const [lName, setLName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [address , setAdress] = useState('')
//     const [event, setEvent] = useState(false);
//     const [showPreviousTrips, setShowPreviousTrips] = useState(false);

//     useEffect(() => {
//         axios.get(`https://6657370d9f970b3b36c86882.mockapi.io/login/${id}`).then((res) => {
//             setFName(res.data.firstName); 
//             setLName(res.data.lastName);  
//             setEmail(res.data.email);
//             setPhone(res.data.phone);
//         });
//     }, [id]);

//     const update = () => {
//         axios.put(`https://6657370d9f970b3b36c86882.mockapi.io/login/${id}`, {
//             firstName: fName, 
//             lastName: lName,  
//             email: email,
//             phone: phone,
//         }).then(() => {
//             setEvent(true);
//         });
//     };

//     return (
//         <div className='profile text-right'>
//             {/* <Nav /> */}
//             {/* section personal information */}
//             {/* <div className='h-[200px] w-full bg-[#7055be] pt-[10px]  rounded-[12px]'> */}
//             <div className='contentProfile bg-[#ececec] pb-[10vh] w-[90%] m-[auto] pt-[20px] '>
//             {/* <h1 className='p-2 text-[18px] font-semibold pr-4 border-solid border-[2px]  rounded-[15px] w-fit  border-[#f9a950] text-[#f9a950] ml-auto mr-[10vw]'>
//                     إعدادات الحساب
//                 </h1> */}
//             {/* </div> */}
//             <div className='flex p-4 justify-center mt-[20vh]'>
//                 <div className="form w-[60%] mt-[-10vh] ">
//                     <div className="bg-white p-4 shadow-xl   rounded-[4px]">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="data text-lg font-semibold ml-auto mb">
//                                 المعلومات الشخصيه
//                             </h3>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className='box'>
//                                 <label htmlFor="" className="block text-gray-600">
//                                     الاسم الأخير
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     className="feild w-full p-2 border border-gray-300 rounded-[3px]"
//                                     value={lName}
//                                     onChange={(e) => setLName(e.target.value)}
//                                 />
//                               {/* <i className="fa-solid fa-user icon"></i> */}
//                             </div>
//                             <div>
//                             <label htmlFor="" className="block text-gray-600">
//                                     الاسم الاول
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="fristName"
//                                     className="feild w-full p-2 border border-gray-300 rounded-[3px]"
//                                     value={fName}
//                                     onChange={(e) => setFName(e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="" className="block text-gray-600">
//                                     الإيميل
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     className="feild w-full p-2 border border-gray-300 rounded-[3px]"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-600">
//                                      الهاتف
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="phone"
//                                     placeholder=''
//                                     className="feild w-full p-2 border border-gray-300 rounded-[3px] "
//                                     value={phone}
//                                     onChange={(e) => setPhone(e.target.value)}
                                    
//                                 />
//                             </div>
//                             <div className=''>
//                                 <label className="block text-gray-600">
//                                      العنوان
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="address"
//                                     className="feild w-full p-2 border border-gray-300 rounded-[3px]"
//                                     value={address}
//                                     onChange={(e) => setAdress(e.target.value)}
//                                 />
               
//                         </div>
//                         <div className=''>
//                                 <label className="block text-gray-600">
//                                     الشارع
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="address"
//                                     className="feild w-full p-2 border border-gray-300 rounded-[3px]"
//                                     value={address}
//                                     onChange={(e) => setAdress(e.target.value)}
//                                 />
//                             </div>
//                         </div>
                

//                         {/* Collapse Section for Previous Orders */}
//                         <div className='bg-white pt-2 pb-2 '>
//                             <div className='flex-col justify-between'>
//                                 {/* <button
//                                     onClick={() => setShowPreviousTrips(!showPreviousTrips)}
//                                     className='w-full bg-[#fff]  pt-2 pb-2 rounded-md text-right mb-4 mr-auto'
//                                 >
//                                          <i className="fa-solid fa-angles-left mr-[20px]"></i>
//                                     مشاويرك السابقة
                                    
//                                 </button> */}
//                                 <div></div>
                           
//                                 <div
//                                     className={`collapse-content ${showPreviousTrips? 'block' : 'hidden'} p-4`}
//                                 >
//                                     {/* Add your content here */}
//                                     <p className='text-[red]'>ااااا</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <button
//                             className='save ml-auto pb-4 bg-[#7055be] text-[#fff] rounded-lg grid col-end-7 col-span-2 mt-5 w-[12em] p-2'
//                             onClick={update}
//                         >
//                             حفظ
//                         </button>
//                     </div>
//                 </div>

//                 {/* Sidebar */}
//                 <div className='sidebar  rounded-[4px] w-[20%] p-[10px] pb-[1px] bg-[#fff] text-gray-600 shadow-xl mt-[-10vh] ml-[2px]'>
//                     <img src="https://i.pinimg.com/564x/73/00/6a/73006affa136bd303293d973c8c0df3d.jpg" alt="" />
//                     <ul>
//                         <li className='rounded-[6px] bg-[#9685cf6b] p-[8px] mb-[8px]'>حسابي <span className='ml-[10px]'><i className="fa-regular fa-user"></i></span></li>
//                         <li className='rounded-[6px] hover:bg-[#9685cf6b] p-[8px] mb-[8px]'>مشاويرك <span className='ml-[10px]'><i class="fa-solid fa-car-on"></i></span></li>
//                         <li className='rounded-[6px] hover:bg-[#9685cf6b] p-[8px] mb-[8px]'>تسجيل الخروج <span className='ml-[10px]'><i class="fa-solid fa-right-from-bracket"></i></span></li>
//                     </ul>
//                 </div>
//             </div>
//             </div>
//         </div>
//     );
// }

// export default ProfilePage;
 import axios from 'axios'; 
 import React, { useEffect, useState } from 'react'; 
 function ProfilePage()
  { const id = localStorage.getItem('userId'); 
 const [fName, setFName] = useState(''); 
 const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');
const [showPreviousTrips, setShowPreviousTrips] = useState(false);

// const logout =()=> {
//     localStorage.clear()
// }
 useEffect(() => { axios.get(`https://6657370d9f970b3b36c86882.mockapi.io/login/${id}`).then((res) => { setFName(res.data.firstName); setLName(res.data.lastName);
     setEmail(res.data.email); setPhone(res.data.phone); }); }, [id]);
      const update = () => { 
        axios.put(`https://6657370d9f970b3b36c86882.mockapi.io/login/${id}`, { firstName: fName, lastName: lName, email: email, phone: phone, address: address, }).then(() => { }); };
         const getInitials = (firstName, lastName) => { if (!firstName || !lastName) return ''; 
            return firstName.charAt(0) + lastName.charAt(lastName.length - 1); };
  return ( <div className='profile text-right'>
     <div className='contentProfile'> 
  <div className='flex justify-center mt-[20vh]'> 
  <div className='sidebar w-[20%] pt-[5vh]'> <ul className='sidebar-menu'> 
    <li className='sidebar-item active mb-[10px] text-center m-[auto] flex justify-between '>البيانات الشخصية <span className='ml-[10px]'><i className="fa-regular fa-user"></i></span></li>
  <li className='sidebar-item text-center  flex justify-between mb-[10px]'
  >المشاوير السابقة 
    <span className='ml-[10px]'><i class="fa-solid fa-table-list"></i></span></li>
    {/* end  */}
  <li className='sidebar-item text-center  flex justify-between  mb-[10px]'>
  الخريطة 
    <span className='ml-[10px]'><i class="fa-solid fa-location-dot"></i></span></li>
    {/* end  */}
  <li className='sidebar-item text-center  flex justify-between  mb-[10px]' onClick={()=> localStorage.clear()}>تسجيل خروج <span className='ml-[10px]'><i className="fa-solid fa-right-from-bracket"></i></span></li> </ul> </div> <div className="form w-[60%] mt-[] ml-4">
     <div className="inputs bg-white p-8 shadow-xl rounded-[4px]"> 
        <div className="flex flex-col items-center mb-6"> 
            <div className="profile-pic bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center text-3xl text-white"> {getInitials(fName, lName)} 
                </div> <h3 className="mt-4 text-xl font-semibold"> {fName} {lName} </h3>
                 <p className="text-gray-600"> {address} </p> </div>
                  <div className=" inputs grid grid-cols-2 gap-4"> 
                <div className='box'>
                     <label htmlFor="lastName" className="block text-gray-600 mb-[5px]"> الاسم الأول </label>
                    <input type="text" name="lastName" className="field w-full p-2 border border-gray-300 rounded-[3px]" value={fName} onChange={(e) => setLName(e.target.value)} />
                     </div> <div> 
                        <label htmlFor="firstName" className="block text-gray-600 mb-[5px]"> الاسم الاخير </label>
                    <input type="text" name="firstName" className="field w-full p-2 border border-gray-300 rounded-[3px]" value={lName}onChange={(e) => setFName(e.target.value)}/> 
                    </div> <div>
                         <label htmlFor="email" className="block text-gray-600 mb-[5px]"> الإيميل </label>
                    <input type="email" name="email" className="field w-full p-2 border border-gray-300 rounded-[3px]" value={email} onChange={(e) => setEmail(e.target.value)} />
                     </div> <div>
                         <label htmlFor="phone" className="block text-gray-600 mb-[5px]"> الهاتف </label>
                    <input type="text" name="phone" className="field w-full p-2 border border-gray-300 rounded-[3px]" value={phone} onChange={(e) => setPhone(e.target.value)} /> </div> <div>
                         <label htmlFor="address" className="block text-gray-600 mb-[5px]"> العنوان </label> 
                    <input type="text" name="address" className="field w-full p-2 mb-[20px] border border-gray-300 rounded-[3px]" value={address} onChange={(e) => setAddress(e.target.value)} /> </div> </div> {/* <div className='bg-white pt-2 pb-2'> <div className='flex-col justify-between'> <button onClick={() => setShowPreviousTrips(!showPreviousTrips)} className='w-full bg-[#fff] pt-2 pb-2 rounded-md text-right mb-4 mr-auto' > <i className="fa-solid fa-angles-left mr-[20px]"></i> مشاويرك السابقة </button> <div className={`collapse-content ${showPreviousTrips ? 'block' : 'hidden'} p-4`}> <p className='text-[red]'>ااااا</p> </div> </div> </div> */}
                    <div className='btns flex w-[100%] justify-center mb-[20px] '>
                    <button className='save ml-auto pb-4 bg-[#9685CF] mb-[20px] text-[#fff] rounded-lg grid col-end-7 col-span-2 mt-[20px]  p-2  pl-[10px] w-[20%] m-[auto]' onClick={update} > حفظ </button> 
                    {/* <button className='save ml-auto pb-4  text-gray-600 rounded-lg grid col-end-7 col-span-2 mt-5 w-full bg-[#ddd] p-2 text-[14px] mr-[10px] '  > عوده للرئيسية</button>  */}
                    </div>
                         </div>
                          </div>
                          </div>
                          </div>
                          </div> ); } 
    export default ProfilePage;
