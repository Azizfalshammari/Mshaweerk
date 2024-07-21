import React, { useState } from "react";
import { auth, datastore } from "../config/firbase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import img from "./logo-jadw.png";
import { motion } from "framer-motion";

function SignUpPage() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return re.test(password);
  };

  const handleSignup = async () => {
    setError("");
    if (phone.length !== 10) {
      setError("يجب أن يكون رقم الهاتف مكون من 10 أرقام");
      setShowModal(true);
      return;
    }
    if (!validateEmail(email)) {
      setError("يجب أن يكون الإيميل صحيحًا");
      setShowModal(true);
      return;
    }
    if (!validatePassword(password)) {
      setError("يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير");
      setShowModal(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(datastore, "users", user.uid), {
        firstName: fName,
        lastName: lName,
        email: email,
        phone: phone,
      });
      setShowModal(true);
    } catch (error) {
      setError("حدث خطأ أثناء إنشاء الحساب");
      setShowModal(true);
      console.error(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (!error) navigate("/login");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5 bg-black-100">
      <div className="bg-white text-black-500 overflow-hidden w-[60vw] max-sm:w-full">
        <div className="md:flex w-full">
          <div className="md:block w-[50vw] max-sm:hidden bg-[#9685CF] py-10 px-10">
            <Link to="/">
              <img src={img} alt="Logo" className="mt-12" />
            </Link>
          </div>
          <div className="w-full py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-[#9685CF]">
                قم بإدخال معلوماتك للتسجيل
              </h1>
            </div>
            <div>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-5">
                  <label htmlFor="firstName" className="text-xs font-semibold px-1">
                    الأسم الأول
                  </label>
                  <input
                    type="text"
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]"
                    placeholder="Ali"
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                  />
                </div>
                <div className="w-1/2 px-3 mb-5">
                  <label htmlFor="lastName" className="text-xs font-semibold px-1">
                    الأسم الاخير
                  </label>
                  <input
                    type="text"
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]"
                    placeholder="Hakami"
                    value={lName}
                    onChange={(e) => setLName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="email" className="text-xs font-semibold px-1">
                    الإيميل
                  </label>
                  <input
                    type="email"
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]"
                    placeholder="ali@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="password" className="text-xs font-semibold px-1">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]"
                    placeholder="************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="phone" className="text-xs font-semibold px-1">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    className="w-full pl-4 pr-3 py-2 rounded-lg border-2 border-black-200 outline-none focus:border-[#FFA842]"
                    placeholder="123-456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
                    className="block w-full max-w-xs mx-auto bg-[#9685CF] hover:bg-[#FFA842] focus:bg-[#FFA842] text-white rounded-lg px-3 py-3 font-semibold"
                    onClick={handleSignup}
                  >
                    تسجيل
                  </button>
                  <p className="text-center p-3 text-black">
                    لديك حساب؟ <Link to="/login">قم بتسجيل الدخول</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-16 h-16 mx-auto ${error ? 'text-red-500' : 'text-green-500'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {error ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01m-6.936-6.2a9.951 9.951 0 010-5.6A9.951 9.951 0 0112 2a9.951 9.951 0 015.9 2.2 9.951 9.951 0 010 5.6A9.951 9.951 0 0112 22a9.951 9.951 0 01-5.9-2.2z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                )}
              </svg>
            </motion.div>
            <p className="mb-4 text-red-500">{error || "تم إنشاء الحساب بنجاح"}</p>
            <button
              className="bg-[#9685CF] hover:bg-[#FFA842] text-white font-semibold px-4 py-2 rounded"
              onClick={closeModal}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;