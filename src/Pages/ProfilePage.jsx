
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
     setEmail(res.data.email);
      setPhone(res.data.phone); }); }, [id]);
      const update = () => { 
        axios.put(`https://6657370d9f970b3b36c86882.mockapi.io/login/${id}`, { firstName: fName, lastName: lName, email: email, phone: phone, address: address, }).then(() => { }); };
         const getInitials = (firstName, lastName) => { if (!firstName || !lastName) return ''; 
            return firstName.charAt(0) + lastName.charAt(lastName.length - 1); };
  return ( <div className='profile text-right'>
     <div className='contentProfile'> 
  <div className='flex justify-center mt-[20vh]'> 
  <div className='sidebar  w-[20%] pt-[5vh]'> 
    <ul className='sidebar-menu'> 
      {/* start box sidebar */}
      <div className='box sidebar-item active text-[16px] flex mb-[10px]'>
      <li className=' mb-[10px] text-center m-[auto] flex justify-between text-gray-800 '>البيانات الشخصية 
    </li>
    <span className='ml-[10px] mt-[-5px] text-gray-800 '>
    <i className="fa-regular fa-user "></i>
    </span>
      </div>
      {/* end  */}
      <div className='box sidebar-item text-[16px] flex mb-[10px]'>
      <li className=' mb-[0px] text-center m-[auto] flex justify-between text-gray-800 '>  المشاوير السابقة</li>
      <span className='ml-[10px] mt-[-5px] text-gray-800 '>
      <i class="fa-solid fa-table-list"></i>
    </span>
      </div>
      {/* end  */}
      <div className='box sidebar-item text-[16px] flex mb-[10px]'>
      <li className=' mb-[10px] text-center m-[auto] flex justify-between text-gray-800 '>الخريطة
    </li>
    <span className='ml-[10px] mt-[-5px] text-gray-800 '>
    <i class="fa-solid fa-location-dot"></i>
    </span>
      </div>
      {/* end  */}
      <div className='box sidebar-item text-[16px] flex mb-[10px]'>
      <li className=' mb-[10px] text-center m-[auto] flex justify-between text-gray-800 ' onClick={()=> localStorage.clear()}> تسجيل الخروج 
    </li>
    <span className='ml-[10px] mt-[-5px] text-gray-800  '>
    <i className="fa-solid fa-right-from-bracket"></i>
    </span>
      </div>
      {/* end  */}

  {/* <li className='sidebar-item text-center  flex justify-between mb-[10px]'
  >المشاوير السابقة 
    </li> */}
    {/* <span className='ml-[10px]'><i class="fa-solid fa-table-list"></i></span> */}
    {/* end  */}
  {/* <li className='sidebar-item text-center  flex justify-between  mb-[10px]'>
  الخريطة  */}
    {/* <span className='ml-[10px]'><i class="fa-solid fa-location-dot"></i></span></li> */}
    {/* end  */}
  {/* <li className='sidebar-item text-center  flex justify-between  mb-[10px]' onClick={()=> localStorage.clear()}>تسجيل خروج <span className='ml-[10px]'><i className="fa-solid fa-right-from-bracket"></i></span></li>  */}
  </ul> </div> 
  <div className="form w-[60%] mt-[] ml-4">
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
                    <input type="text" name="address" className="field w-full p-2 mb-[20px] border border-gray-300 rounded-[3px]" value={address} onChange={(e) => setAddress(e.target.value)} /> </div> </div> 
                    {/* <div className='bg-white pt-2 pb-2'> <div className='flex-col justify-between'> <button onClick={() => setShowPreviousTrips(!showPreviousTrips)} className='w-full bg-[#fff] pt-2 pb-2 rounded-md text-right mb-4 mr-auto' > <i className="fa-solid fa-angles-left mr-[20px]"></i> مشاويرك السابقة </button> <div className={`collapse-content ${showPreviousTrips ? 'block' : 'hidden'} p-4`}> <p className='text-[red]'>ااااا</p> </div> </div> </div> */}
                    <div className='btns flex w-[100%] justify-center mb-[20px] '>
                    <button className='save ml-auto pb-4 bg-[#9685CF] mb-[20px] text-[#fff] rounded-lg grid col-end-7 col-span-2 mt-[20px]  p-2  pl-[10px] w-[20%] m-[auto]' onClick={update} > حفظ </button> 
                 
                    {/* <button className='save ml-auto pb-4  text-gray-600 rounded-lg grid col-end-7 col-span-2 mt-5 w-full bg-[#ddd] p-2 text-[14px] mr-[10px] '  > عوده للرئيسية</button>  */}
               
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#9685CF" fill-opacity="1" d="M0,96L40,117.3C80,139,160,181,240,202.7C320,224,400,224,480,224C560,224,640,224,720,213.3C800,203,880,181,960,186.7C1040,192,1120,224,1200,229.3C1280,235,1360,213,1400,202.7L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
                    </svg>
                  </div>
                
                  </div>
                  </div>
                  </div>
                  </div> ); } 
    export default ProfilePage;
