// import React from 'react';
// import time from '../assets/time.png'
// import car from '../assets/ccar.png'
// import accessibility from '../assets/accessibility-.png'
// function Cards() {
//   return (
//     <section classNameName="bg-white rounded-t-lg py-12">
//       <div classNameName="container mx-auto px-4 md:px-12">
//         <div classNameName="grid grid-cols-1 gap-8 lg:grid-cols-3 text-center">
//           <div classNameName="flex rounded-lg bg-[#9685CF] flex-col items-center justify-center px-1 md:px-6 border shadow p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
//           <img src={time} classNameName="h-10 dark:text-gray-200"/>
//             <h1 classNameName="mt-4 text-xl font-semibold text-white dark:text-gray-300">توفير الوقت</h1>
//           </div>
//           <div classNameName="flex bg-[#9685CF] flex-col items-center justify-center px-6 border rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
//           <img src={car} classNameName="h-10 dark:text-gray-200"/>
//             <h1 classNameName="mt-4 text-xl font-semibold text-white dark:text-gray-300">تجنب الإزدحام</h1>
//           </div>
//           <div classNameName="flex bg-[#9685CF] flex-col items-center justify-center px-6 border rounded-lg shadow p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
//           <img src={accessibility} classNameName="h-9 dark:text-gray-200"/>
//             <h1 classNameName="mt-4 text-xl font-semibold text-white dark:text-gray-300">سهولة الوصول</h1>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Cards;

import React from 'react';
import time from '../assets/time.png'
import car from '../assets/ccar.png'
import accessibility from '../assets/accessibility-.png'
function Cards() {
  return (
   <div className='w-full h-[45vh]'>
     <div className="mx-auto mt-14 mb-20 max-w-6xl text-center p-6">
    <h2 className="mb-20 text-center text-4xl font-extrabold text-gray-900 dark:text-gray-200 sm:text-5xl">ليش <strong className='text-[#FFA842]'>جّدولها</strong> ؟
    </h2>
    <div className="mx-auto gap-28 max-w-3xl items-stretch space-y-4 text-left sm:flex sm:space-y-0 sm:space-x-8 sm:text-center">
        <div className="flex bg-white w-[80vw] items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10 sm:flex-col sm:hover:shadow-2xl">
            <img className="mr-4 w-12 sm:mr-0 sm:h-32 sm:w-32" src={time}/>
            <div>
                <div className="font-bold text-black dark:text-white sm:mt-4 sm:mb-2">توفير الوقت</div>
            </div>
        </div>
        <div className="flex bg-white w-[80vw] items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10 sm:flex-col sm:hover:shadow-2xl"
            >
            <img className="mr-4 w-12 sm:mr-0 sm:h-32 sm:w-32" src={car}/>
            <div>
                <div className="font-bold text-black dark:text-white sm:mt-4 sm:mb-2">تجنب الازدحام</div>
            </div>
        </div>
        <div className="flex bg-white w-[80vw] items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10 sm:flex-col sm:hover:shadow-2xl"
           >
            <img className="mr-4 w-12 sm:mr-0 sm:h-32 sm:w-32" src={accessibility} />
            <div>
                <div className="font-bold text-black dark:text-white sm:mt-4 sm:mb-2">سهولة الوصول</div>
            </div>
        </div>
    </div>
</div>
   </div>
  );
}

export default Cards;
