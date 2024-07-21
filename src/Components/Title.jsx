import React from 'react'

 function Title() {
  return (
    <div>
        <div className=" box-title flex bg-[#c9c0e5] w-[200px] rounded-[6px] m-auto">
            <div className='flex p-2 text-center items-center  w-[50%] justify-center rounded-[6px] text-gray-800 hover:bg-[#ffa84280]'>
            <i className="fa-solid fa-house text-[15px] mr-[5px]"></i>
                <p className=' '>المنزل</p>
               
            </div>
            <div className='flex p-2 text-center items-center justify-center rounded-[6px] text-gray-800 w-[50%] hover:bg-[#ffa84280]'>
            <i className="fa-solid fa-house-laptop mr-[5px]"></i>
                <p className=''>العمل</p>

            </div>

        </div>
    </div>
  )
}

export default Title 