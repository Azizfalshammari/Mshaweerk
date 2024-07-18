
 import { useState } from "react";
 import Map from './Map';
export default function Popup() {
  const [openModal, setOpenModal] = useState(null);

  const handleOpenModal = (modalNumber) => {
    setOpenModal(modalNumber);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <div>
      {/* زر فتح النافذة الأولى */}
      <button 
        type="button" 
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#c9c0e5]  text-white hover:bg[#ddd] mr-[50%]"
        onClick={() => handleOpenModal(1)}
      >
        open
      </button>

      {/* Modal 1 */}
      {openModal === 1 && (
        <div className="model fixed top-0 left-0 w-full h-full bg-gray-900/50 flex items-center justify-center z-50">
          <div className="bg-[#c9c0e5] border shadow-sm rounded-xl w-full max-w-lg mx-3 sm:mx-auto slide-down-enter">
            <div className="flex justify-between items-center py-3 px-4 border-b ">
              <h3 className="font-bold text-gray-600">ساعدنا في العثور عليك
              <i class="fa-regular fa-pen-to-square mr-[10px] text-gray-800"></i>
              </h3>
              <button
                type="button"
                className="text-gray-800 hover:bg-gray-100 p-1 rounded-full"
                onClick={handleCloseModal}
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18" />
                  <path d="M6 6L18 18" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              

<div class="max-w-md mx-auto ">
  <div class="relative z-0 w-full mb-5 group ">
    
  {/* <i class="fa-solid fa-house"></i> */}
      <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#ffa842] focus:outline-none focus:ring-0 focus:border-[#ffa842] peer" placeholder=" " required />
            <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#9685CF] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> 
            <i className="fa-solid fa-house ml-[5px] text-[#9685CF]"></i>
            عنوان المنزل
            </label>
    

  </div>
  <div class="relative z-0 w-full mb-5 group ">
      <input type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#ffa842] peer" placeholder=" " required />
      <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-right text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#9685CF]  peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
      <i className="fa-solid fa-person-walking ml-[5px] text-[#9685CF]"></i>
      عنوان العمل </label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input type="text" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#ffa842] peer" placeholder=" " required />
      <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#9685CF] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
      <i className="fa-regular fa-clock ml-[5px] text-[#9685CF]"></i>
        الساعات غير المتاحه
      </label>
  </div>
  {/* <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
    </div>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
    </div>
  </div> */}
  {/* <button type="submit" className="text-white bg-[#9685CF] hover:bg-[#9685CF] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button> */}
</div>
{/* end form */}
              {/* <p className="text-gray-800">
                Stacked Overlays modals are a user interface design concept where multiple overlay windows, or modals, are displayed on top of each other...
              </p> */}
              <button 
                type="button" 
                className="py-2 px-4 mt-[20px] bg-gradient-to-r from-[#9685CF] to-[#fac282] inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-[#9685CF]"
                onClick={() => handleOpenModal(2)}
              >
                  موقعك  </button>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button 
                type="button" 
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gradient-to-r from-[#9685CF] to-[#fac282]"
                onClick={handleCloseModal}
              >
                إلغاء
              </button>
              <button 
                type="button" 
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gradient-to-r from-[#9685CF] to-[#fac282] text-white hover:bg-blue-700"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2 */}
      {openModal === 2 && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900/40 flex items-center justify-center z-50">
          <div className="bg-[#c9c0e5] border shadow-sm rounded-xl w-full   max-w-lg mx-3 sm:mx-auto h-full">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <button
                type="button"
                className="text-gray-800 hover:bg-gray-100 p-1 rounded-full"
                onClick={handleCloseModal}
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18" />
                  <path d="M6 6L18 18" />
                </svg>
              </button>
            </div>
            <div className="p-4 flex flex-col items-center justify-center h-full">
              <Map className="w-full h-full" /> {/* تأكد من إضافة الخصائص المطلوبة لتناسب الـ Map */}
              <button 
                type="button" 
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 mt-4"
                onClick={() => handleOpenModal(3)}
              >
                Open modal
              </button>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button 
                type="button" 
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button 
                type="button" 
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3 */}
      {/* {openModal === 3 && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900/70 flex items-center justify-center z-50">
          <div className="bg-white border shadow-sm rounded-xl w-full max-w-lg mx-3 sm:mx-auto slide-down-enter">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 className="font-bold text-gray-800">Modal title (level 3)</h3>
              <button
                type="button"
                className="text-gray-800 hover:bg-gray-100 p-1 rounded-full"
                onClick={handleCloseModal}
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18" />
                  <path d="M6 6L18 18" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-800">
                Stacked Overlays: UI design with layered modals, often in web/apps, where each window overlays the previous one...
              </p>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button 
                type="button" 
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button 
                type="button" 
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

