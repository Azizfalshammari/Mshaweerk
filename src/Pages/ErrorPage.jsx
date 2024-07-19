import React from 'react';


 function ErrorPage() {
  return (
    <div className='h-[100vh] bg-[#ffa84287] '>
        <div class="max-w-[50rem] flex flex-col mx-auto size-full">
  <header class="mb-auto flex justify-center z-50 w-full py-4">
    <nav class="px-4 sm:px-6 lg:px-8" aria-label="Global">
      {/* <a class="flex-none text-xl font-semibold sm:text-3xl dark:text-white" href="#" aria-label="Brand">Brand</a> */}
    </nav>
  </header>
 


  <main id="content">
    <div className='flex flex-row-reverse justify-center justify-items-center'>
        <div>        
            <img className='mt-[]' src="https://i.pinimg.com/564x/08/22/e2/0822e2bcba0e2c8d89d4573a7ac5e5b8.jpg" alt="" /></div>
        <div className=' text-[#9685CF] w-[100%]'> 
            <div class="h-full text-center py-10 px-4 sm:px-6 lg:px-8 ">
      {/* <h1 class="block text-7xl font-bold text-[#9685CF] mb-[20px] sm:text-4xl dark:text-white"><span>ااوه </span></h1> */}
      {/* <h1 class="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">404</h1> */}
      <p class="mt-3 text-[#777] dark:text-neutral-400">حدث خطأ</p>
      <p class="text-[#777] dark:text-neutral-400">مع الأسف الصفحة غير موجودة</p>
      <div class="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
        <a class="w-full sm:w-auto py-3 px-4  justify-center  bg-gradient-to-r from-[#9685CF] to-[#fac282] inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-[#9685CF] disabled:opacity-50 disabled:pointer-events-none" href="../examples.html">
          <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          عودة الى الصفحة الرئيسة
        </a>
      </div>
    </div>
    </div></div>
   
  </main>
  


  <footer class="mt-auto text-center py-5">
    <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-sm text-gray-500 dark:text-neutral-500">© All Rights Reserved. 2022.</p>
    </div>
  </footer>
 
</div>
    </div>
  )
}
export default  ErrorPage
