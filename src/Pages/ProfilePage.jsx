import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, datastore } from "../config/firbase";
import { onAuthStateChanged } from "firebase/auth";
import logo from '../assets/logo-jadw.png'
import { Link } from "react-router-dom";
function ProfilePage() {
  const [currentUser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchUserData(currentUser);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (currentUser) => {
    setLoading(true);
    try {
      const userDoc = await getDoc(doc(datastore, "users", currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>لا يوجد بيانات للمستخدم</div>;
  }

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return '';
    return firstName.charAt(0).toUpperCase() + lastName.charAt(lastName.length - 1).toUpperCase();
  };

  return (
    <div className='profile text-right'>
      <div className='contentProfile'>
        <div className='flex justify-center mt-[17vh]'>
          <div className='sidebar w-[20%] h-[54vh]'>
            <Link to="/">
            <img src={logo} className="h-52 mr-[5vw] mb-6"/>
            </Link>
            <ul className='sidebar-menu'>
              {/* Sidebar items */}
             <div className='box sidebar-item active text-[16px] flex mb-[10px]'>
                <li className='mb-[10px] font-bold text-center m-[auto] flex justify-between text-gray-800'>
                  البيانات الشخصية
                </li>
                <span className='ml-[10px] mt-[-5px] text-gray-800'>
                  <i className="fa-regular fa-user"></i>
                </span>
              </div>
              <div className='box sidebar-item text-[16px] flex mb-[10px]'>
                <li className='mb-[0px] font-bold text-center m-[auto] flex justify-between text-gray-800'>
                  المشاوير السابقة
                </li>
                <span className='ml-[10px] mt-[-5px] text-gray-800'>
                  <i className="fa-solid fa-table-list"></i>
                </span>
              </div>
              <Link to ="/scheduler">
              <div className='box sidebar-item text-[16px] flex mb-[10px]'>
                <li className='mb-[10px] font-bold text-center m-[auto] flex justify-between text-gray-800'>
                  الخريطة
                </li>
                <span className='ml-[10px] mt-[-5px] text-gray-800'>
                  <i className="fa-solid fa-location-dot"></i>
                </span>
              </div>
              </Link>
              <div className='box sidebar-item text-[16px] flex mb-[10px]'>
                <li className='mb-[10px] font-bold text-center m-[auto] flex justify-between text-gray-800' onClick={() => localStorage.clear()}>
                  تسجيل خروج
                </li>
                <span className='ml-[10px] mt-[-5px] text-gray-800'>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </span>
              </div>
            </ul>
          </div>
          <div className="form w-[60%] ml-4">
            <div className="inputs bg-white p-8 shadow-xl rounded-[4px]">
              <div className="flex flex-col items-center mb-6">
                <div className="profile-pic bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center text-3xl text-white">
                  {getInitials(currentUser.firstName, currentUser.lastName)}
                </div>
                <h3 className="mt-4 text-xl font-semibold">
                  {currentUser.firstName} {currentUser.lastName}
                </h3>
                <p className="text-gray-600">{currentUser.address}</p>
              </div>
              <div className="inputs grid grid-cols-2 gap-4">
                <div className='box'>
                  <label htmlFor="firstName" className="block text-gray-600 mb-[5px]">الاسم الأول</label>
                  <input
                    type="text"
                    name="firstName"
                    className="field w-full p-2 border border-gray-300 rounded-[3px]"
                    value={currentUser.firstName}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-gray-600 mb-[5px]">الاسم الأخير</label>
                  <input
                    type="text"
                    name="lastName"
                    className="field w-full p-2 border border-gray-300 rounded-[3px]"
                    value={currentUser.lastName}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-600 mb-[5px]">الإيميل</label>
                  <input
                    type="email"
                    name="email"
                    className="field w-full p-2 border border-gray-300 rounded-[3px]"
                    value={currentUser.email}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-600 mb-[5px]">الهاتف</label>
                  <input
                    type="text"
                    name="phone"
                    className="field w-full p-2 border border-gray-300 rounded-[3px]"
                    value={currentUser.phone}
                    readOnly
                  />
                </div>
                
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#9685CF" fillOpacity="1" d="M0,96L40,117.3C80,139,160,181,240,202.7C320,224,400,224,480,224C560,224,640,224,720,213.3C800,203,880,181,960,186.7C1040,192,1120,224,1200,229.3C1280,235,1360,213,1400,202.7L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
