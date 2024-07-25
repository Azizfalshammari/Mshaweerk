import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, datastore } from "../config/firbase";

function ProfilePage() {
  const [userFir, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const users = auth.currentUser;
        console.log("Current User:", users);
        if (users) {
          const userDoc = await getDoc(doc(datastore, "users", users.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(userData);
            localStorage.setItem("userData", JSON.stringify(userData)); 
            console.log("User Data:", userData);
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("No user is signed in.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData)); 
      setLoading(false);
    } else {
      fetchUserData();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userFir) {
    return <div>لا يوجد بيانات للمستخدم</div>;
  }

  const getInitials = (firstName, lastName) => { if (!firstName || !lastName) return ''; 
    return firstName.charAt(0) + lastName.charAt(lastName.length - 1); };

  return (
    <div className="profile text-right">
      <div className="contentProfile">
        <div className="flex justify-center mt-[20vh]">
          <div className="sidebar">
            <ul className="sidebar-menu">
              <li className="sidebar-item active">
                البيانات الشخصية{" "}
                <span className="ml-[10px]">
                  <i className="fa-regular fa-user"></i>
                </span>
              </li>
              <li className="sidebar-item">
                المشاوير السابقة{" "}
                <span className="ml-[10px]">
                  <i className="fa-solid fa-car-on"></i>
                </span>
              </li>
              <li className="sidebar-item">
                تسجيل خروج{" "}
                <span className="ml-[10px]">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </span>
              </li>
            </ul>
          </div>
          <div className="form w-[60%] mt-[-10vh] ml-4">
            <div className="bg-white p-8 shadow-xl rounded-[4px]">
              <div className="grid grid-cols-2 gap-4">
                <div className="box">
                  <label htmlFor="firstName" className="block text-gray-600">
                    الاسم الأول
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="field w-full p-2 border border-gray-300 rounded-[3px]"
                    value={userFir.firstName || ""}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-gray-600">
                    الاسم الأخير
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="field w-full p-2 border border-gray-300 rounded-[3px]"
                    value={userFir.lastName || ""}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-600">
                    الإيميل
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="field w-full p-2 border border-gray-300 rounded-[3px]"
                    value={userFir.email || ""}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-600">
                    الهاتف
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="field w-full p-2 border border-gray-300 rounded-[3px]"
                    value={userFir.phone || ""}
                    readOnly
                  />
                </div>
              </div>
              {/* <button
                className='save ml-auto pb-4 bg-[#9685CF] text-[#fff] rounded-lg grid col-end-7 col-span-2 mt-5 w-[12em] p-2'
                onClick={update}
              >
                حفظ
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;