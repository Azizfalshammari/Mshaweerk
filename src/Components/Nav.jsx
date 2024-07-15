import React from 'react'

 function Nav() {
  return (
    <div className='pl-[10px] pr-[10px] p-4 flex justify-between'>
        {/* <div className="logo text-left"><span className=''>علينا</span><span className='text-[#fff] font-semibold absolute inset-0 bg-blue-500 clip-path-mangled'>جدولها</span></div> */}
        {/* <div className="logo text-left"><span className=''>علينا</span><span className='text-[#fff] font-semibold bg-[blue]'>جدولها</span></div> */}
        <div className="logo text-left flex">
            <span>علينا</span>
            <span className='relative inline-block'>
                <span className='span2 bg-blue-500 text-white font-semibold px-2 py-1 '>
                    جدولها
                </span>
            </span>
        </div>
        {/* end logo */}
        <div className='flex w-[30%] justify-between'>
        <div className="schedule bg-[#fe6a00] text-[#fff] p-[5px] pl-[15px] pr-[15px] rounded-[15px]"> <i className="fa-regular fa-calendar-days mr-[10px]"></i>Schedule</div>
        <div className=" p-[5px]">
            <ul className='sign flex'>
                <li>تسجيل الدخول</li>/
                <li>تسجيل جديد</li>
            </ul>

        </div>
        </div>
  
   
    </div>
  )
}


export default Nav