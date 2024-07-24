import React from 'react'

 function Search() {
  return (
    <div>
        
<form class="max-w-md mx-auto ">   
    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">بحث</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 rounded-[20px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="#ffa842" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-[20px] bg-gray-[red] focus:ring-[red] focus:border-[#ffa842] dark:bg-[red] dark:border-[gray-600] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#ffa842] dark:focus:border-[#ffa842]" placeholder="ماهي وجهتك ؟" required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#c9c0e5] hover:bg-[#9685CF] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#ffa842] dark:hover:bg-[#ffa842] dark:focus:ring-[#ffa842]">بحث</button>
    </div>
</form>

    </div>
  )
}

export default Search