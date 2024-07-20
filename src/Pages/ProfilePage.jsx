
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

  </ul> </div> 
  <div className="form w-[60%] mt-[] ml-4 shadow-xl ">
     <div className="inputs bg-white p-8 shadow-xl rounded-[4px]"  style={{ boxShadow: '0 0 10px rgba(0,0,0,0.2)', boxShadow: '0 0 10px rgba(0,0,0,0.2), inset -5px 0 8px rgba(0,0,0,0)' }}> 
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
                    </div> </div> 
                    {/* <div className='bg-white pt-2 pb-2'> <div className='flex-col justify-between'> <button onClick={() => setShowPreviousTrips(!showPreviousTrips)} className='w-full bg-[#fff] pt-2 pb-2 rounded-md text-right mb-4 mr-auto' > <i className="fa-solid fa-angles-left mr-[20px]"></i> مشاويرك السابقة </button> <div className={`collapse-content ${showPreviousTrips ? 'block' : 'hidden'} p-4`}> <p className='text-[red]'>ااااا</p> </div> </div> </div> */}
                    <div className='btns flex w-[100%] justify-center mb-[20px] '>
                    <button className='relative  save ml-auto pb-2 bg-gradient-to-r from-[#9685CF] to-[#fac282]  text-[#fff] rounded-lg grid col-end-7 col-span-2  p-2  pl-[10px] w-[20%] m-[auto] mb-[20px] mt-[20px]' onClick={update} > حفظ </button> 
                 
                    {/* <button className='save ml-auto pb-4  text-gray-600 rounded-lg grid col-end-7 col-span-2 mt-5 w-full bg-[#ddd] p-2 text-[14px] mr-[10px] '  > عوده للرئيسية</button>  */}
               
                    </div>
                   
              </div>
              <div className='mt-[40px]'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
                <path fill="#9685CF" fill-opacity="1" d="M0,320L30,314.7C60,309,120,299,180,266.7C240,235,300,181,360,160C420,139,480,149,540,165.3C600,181,660,203,720,192C780,181,840,139,900,144C960,149,1020,203,1080,218.7C1140,235,1200,213,1260,176C1320,139,1380,85,1410,58.7L1440,32L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
              </svg>
              </div>
            
                  </div>
                  </div>
                  </div>
                  </div> ); } 
    export default ProfilePage;
