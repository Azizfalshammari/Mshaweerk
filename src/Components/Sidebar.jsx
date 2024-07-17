import React, { useState } from "react";
import logo from "../assets/lan-fp-removebg-preview.png";
const Sidebar = () => {
  const [IsOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="absolute bottom-32 right-2"
    >
      <div className="relative flex h-auto w-auto flex-col rounded-lg bg-white pt-1 bg-clip-border p-1  text-[#9685cf] shadow-xl shadow-blue-gray-900/5 transition-all duration-300">
        <div className="flex items-center justify-center gap-4 ">
          <img src={logo} alt="brand" className="w-20 h-20" />
        </div>
        {/* <hr className="my-2 border-[#9685cf]" /> */}

        <nav className="flex flex-col gap-2 p-2 font-sans text-base font-normal text-blue-gray-700">
          <div className="relative block w-full">
            <div
              role="button"
              className="flex flex-col justify-center text-center items-center  w-full p-2 leading-tight transition-all rounded-lg outline-none text-start hover:bg-[#9685cf] hover:bg-opacity-80 hover:text-white focus:bg-[#9685cf] focus:bg-opacity-80 focus:text-white active:bg-[#9685cf] active:bg-opacity-80 active:text-white"
            >
              <svg
                width="48px"
                height="48px"
                viewBox="0 0 1024 1024"
                class="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M224.3 251.4h556.2c14.3 0 25.9 11.6 25.9 25.9v501.8c0 14.3-11.6 25.9-25.9 25.9H224.3c-14.3 0-25.9-11.6-25.9-25.9V277.3c0-14.3 11.6-25.9 25.9-25.9z"
                    fill="#FFFFFF"
                  />

                  <path
                    d="M780.5 830.8H224.3c-28.5 0-51.7-23.2-51.7-51.7V277.3c0-28.5 23.2-51.7 51.7-51.7h556.2c28.5 0 51.7 23.2 51.7 51.7v501.8c0 28.5-23.2 51.7-51.7 51.7zM224.3 277.3v501.8h556.2V277.3H224.3z"
                    fill="#333333"
                  />

                  <path d="M224.3 277h568.5v152.1H224.3z" fill="#9685CF" />

                  <path
                    d="M198.4 399.5h633.8v51.8H198.4zM495.6 638.8l101-101c11.8-11.8 30.9-11.8 42.7 0l0.1 0.1c11.8 11.8 11.8 30.9 0 42.7L518.7 701.2c-6.3 6.3-14.8 9.3-23.1 8.8-8.3 0.5-16.7-2.5-23.1-8.8l-76-76c-11.8-11.8-11.8-30.9 0-42.7l0.1-0.1c11.8-11.8 30.9-11.8 42.7 0l56.3 56.4z"
                    fill="#333333"
                  />

                  <path
                    d="M327.7 166.8c14.3 0 25.9 11.6 25.9 25.9v38.8h-51.7v-38.8c0-14.4 11.6-25.9 25.8-25.9zM664.1 166.8c14.3 0 25.9 11.6 25.9 25.9v38.8h-51.7v-38.8c-0.1-14.4 11.5-25.9 25.8-25.9z"
                    fill="#333333"
                  />
                </g>
              </svg>

              <p className="font-sans text-sm antialiased font-normal leading-relaxed text-blue-gray-900">
                انشىء جدولك
              </p>
            </div>
          </div>


          <div
            role="button"
            className="flex flex-col justify-center items-center w-full p-2 leading-tight transition-all rounded-lg outline-none hover:bg-[#9685cf] hover:bg-opacity-80 hover:text-white focus:bg-[#9685cf] focus:bg-opacity-80 focus:text-white active:bg-[#9685cf] active:bg-opacity-80 active:text-white"
          >
            <div className="grid place-items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-12 h-12"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>

            <p className="font-sans text-sm text-center antialiased font-normal leading-relaxed text-blue-gray-900">
              الملف الشخصي
            </p>
          </div>

          {/* <div
            role="button"
            className="flex flex-col items-center w-full p-2 leading-tight transition-all rounded-lg outline-none text-start hover:bg-[#9685cf] hover:bg-opacity-80 hover:text-white focus:bg-[#9685cf] focus:bg-opacity-80 focus:text-white active:bg-[#9685cf] active:bg-opacity-80 active:text-white"
          >
            <div className="grid place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>

            <p className=" font-sans text-sm antialiased font-normal leading-relaxed text-blue-gray-900">
              تسجيل الخروج
            </p>
          </div> */}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
