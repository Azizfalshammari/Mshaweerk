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
        <div className='flex justify-center w-[80vw] mr-56 mt-[17vh] max-sm:mr-2'>
          <div className='sidebar w-[20%] h-[54vh] flex-shrink-0 max-sm:mt-28'>
            <Link to="/">
              <img src={logo} className="h-48 mr-[4.6vw] max-sm:hidden"/>
            </Link>
            <ul className='sidebar-menu'>
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
                  جدولك
                </li>
                <span className='ml-[10px] mt-[-5px] text-gray-800'>
                <i className="fa-solid fa-table"></i>
                </span>
              </div>
              <Link to="/login">
              <div className='box sidebar-item text-[16px] flex mb-[10px]'>
                <li className='mb-[10px] font-bold text-center m-[auto] flex justify-between text-gray-800' onClick={() => localStorage.clear()}>
                  تسجيل خروج
                </li>
                <span className='ml-[10px] mt-[-5px] text-gray-800'>
                 <i className="fa-solid fa-right-from-bracket"></i>
                </span>
              </div>
              </Link>
            </ul>
          </div>
          <div className="form w-[60%] ml-4 flex-grow">
            <div className="inputs bg-white p-8 shadow-xl rounded-[4px] h-full max-sm:mr-6">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;


