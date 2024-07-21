// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ModalComponent = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleModal = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleOptionClick = (option) => {
//         toast.success(`تم حفظ اختيارك بنجاح`);
//     };

//     return (
//         <div>
//             <button
//                 className="bg-[#9685cf] text-white py-2 px-4 rounded"
//                 onClick={toggleModal}
//             >
//                 Open Modal
//             </button>
//             {isOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white rounded-lg p-6">
//                         <h2 className="text-xl font-semibold mb-4">اكد الجدول </h2>
//                         <div className="flex space-x-4">
//                             <button
//                                 className="bg-[#9685cf] text-white py-2 px-4 rounded"
//                                 onClick={() =>
//                                     handleOptionClick("                صدره كملف Pdf ")
//                                 }
//                             >
//                                 صدره كملف Pdf
//                             </button>
//                             <button
//                                 className="bg-[#9685cf] text-white py-2 px-4 rounded"
//                                 onClick={() =>
//                                     handleOptionClick("                لحفظ الجدول فقط")
//                                 }
//                             >
//                                 احفظ الجدول فقط
//                             </button>
//                         </div>
//                         <button
//                             className="mt-4 text-[#9685cf] underline"
//                             onClick={toggleModal}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//             <ToastContainer />
//         </div>
//     );
// };

// export default ModalComponent;