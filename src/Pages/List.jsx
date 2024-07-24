

import React, { useState } from 'react';
import img from './note.png'

function List() {
//     const [open, setOpen] = useState(false);

//     return (
//         <div className='list h-[100vh]  m-[auto] flex justify-center max-sm:flex-col bg-[#c9c0e5]'>
//             <img className='w-[40%] m-[auto] max-sm:w-full max-sm:text-center max-sm:m-[auto]' src={img} alt="" />
//             <div className=" mx-auto max-w-xl p-5  pr-[1px] rounded-md mt-10 w-[90%] " x-data="{ open: false }">
//                 <h1 className="text-2xl  font-semibold ">title</h1>

//                 <div className="arow mt-10 max-w-md mx-auto shadow p-4 rounded-md relative w-[100%] bg-[#9685CF] ">
//                     <div className="flex items-center justify-between cursor-pointer " onClick={() => setOpen(!open)}>
//                         <div className=''>Select </div>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
//                         </svg>
//                     </div>

//                     <div className={`absolute top-16  px-2 rounded-md bg-[#c9c0e5] w-full left-0 ${open ? 'block' : 'hidden'}`}>
//                         {/* Content of the dropdown here */}
                      
//                         <div className="relative  flex justify-center bg-[#c9c0e5] overflow-hidden">
//                             <div className="w-full max-w-6xl mx-auto px-4 md:px-6 ">
//                                 <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">

//                                     <div className="w-full max-w-3xl mx-auto">
//                                         <div className="-my-6">
//                                             {/* item 1 */}
//                                             <div className="relative pl-8 sm:pl-32 py-6 group">
//                                                 <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-[#ffa842] after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
//                                                     <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-[#ffa842] bg-[#9685cf2b] rounded-full">May, 2020</time>
//                                                     <div className="text-[18px] font-bold text-gray-700">العنوان</div>
//                                                 </div>
//                                                 {/* <!-- Content --> */}
//                                                 <div className="text-[#777] text-[14px]"> Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus.</div>
//                                             </div>

//                                             {/* <!-- Item #2 --> */}
//                                             <div className="relative pl-8 sm:pl-32 py-2 group">
//                                                 <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-[#ffa842] after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
//                                                     <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-[#ffa842] bg-[#9685cf2b] rounded-full">May, 2021</time>
//                                                     <div className="text-[18px] font-bold text-gray-700">تاريخ الانتهاء</div>
//                                                 </div>
//                                                 {/* <!-- Content --> */}
//                                                 <div className="text-[#777] text-[14px]">Pipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus.</div>
//                                             </div>

//                                             {/* <!-- Item #3 --> */}
//                                             <div className="relative pl-8 sm:pl-32 py-2 group">
//                                                 <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-[#ffa842] after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
//                                                     <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-1 sm:mb-0 text-[#ffa842] bg-[#9685cf2b] rounded-full">May, 2022</time>
//                                                     <div className="text-[18px] font-bold text-gray-700">ملاحظات</div>
//                                                 </div>
//                                                 {/* <!-- Content --> */}
//                                                 <div className="text-[#777] text-[14px]"> Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus.</div>
//                                             </div>
//                                             {/* end element */}
//                                         </div>
//                                         {/* end All Element*/}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
}

export default List;

