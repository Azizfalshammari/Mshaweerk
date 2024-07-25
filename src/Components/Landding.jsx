import React from 'react';
import img1 from '../assets/landingggg.png';
import { Link } from 'react-router-dom';
import Cards from './Cards';

function Landding() {
  return (
<<<<<<< HEAD
    <div className="w-full flex bg-[#9685CF] h-auto justify-center items-center md:h-full py-10 md:py-0">
=======
    <div className="w-full flex bg-[#9685CF] h-auto justify-center items-center md:h-full py-10 md:py-0 max-sm:w-full">
>>>>>>> origin/fatimah
      <div className="w-full max-w-7xl md:h-full px-4 md:px-0">
        <div className="flex flex-col md:h-full md:flex-row-reverse">
          <div className="mr-14 md:w-1/2 flex justify-center md:h-full md:mb-0 max-sm:items-center max-sm:ml-10 ">
            <img src={img1} className="h-auto pb-4 w-full md:w-auto md:h-full" />
          </div>
<<<<<<< HEAD
          <div className="md:w-1/2 flex flex-col justify-center text-center md:text-right">
            <h1 className="text-3xl lIN mt-1 md:text-5xl font-bold text-white">
              نظم مشاويرك بفعالية مع<strong className="text-3xl gd mt-9 md:text-5xl text-[#FFA842]"> جّدولها</strong>
            </h1>
            <p className="mt-5 text-white font-bold Par text-lg md:text-xl">
              هل تعاني من صعوبة تنظيم مشاويرك؟ هل تجد نفسك تهدر الكثير من الوقت في التنقل بين الأماكن المختلفة؟ لدينا الحل الأمثل لك.
            </p>
            <Link to="/scheduler">
              <button className="mt-5 btn text-3xl bg-[#FFA842] text-white font-bold px-4 py-2 md:px-6 md:py-2 hover:bg-b transition duration-300 md:text-base max-sm:self-center">
=======
          <div className="md:w-1/2 flex flex-col justify-center max-sm:text-center md:text-right">
            <h1 className="text-3xl lIN mt-1 md:text-5xl font-bold text-white">
              نظم مشاويرك بفعالية مع<strong className="text-3xl gd mt-9 md:text-5xl text-[#FFA842]"> جّدولها</strong>
            </h1>
            <p className="mt-4 text-white font-bold Par text-lg md:text-xl">
              هل تعاني من صعوبة تنظيم مشاويرك؟ هل تجد نفسك تهدر الكثير من الوقت في التنقل بين الأماكن المختلفة؟ لدينا الحل الأمثل لك.
            </p>
            <Link to="/scheduler">
              <button className="mt-5 btn bg-[#FFA842] text-white font-bold px-4 py-2 md:px-6 md:py-2 hover:bg-[#E6D7FA] transition duration-300 md:text-base max-sm:self-center">
>>>>>>> origin/fatimah
                ابدأ الان
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landding;



// import img1 from '../assets/landingggg.png'; 
//  import { Link } from 'react-router-dom';
// function Landding() {
//    return (
//      <div className="w-full flex bg-[#9685CF] justify-center items-center md:h-full py-10 md:py-0"> <div className="w-full max-w-7xl md:h-full px-4 md:px-0">
//    <div className=" wavy-landing flex flex-col md:h-full md:flex-row-reverse"> 
//     <div className="mr-14 md:w-1/2 flex justify-center md:h-full mb-6 md:mb-0"> 
//     <img src ={img1} className="h-auto w-full md:w-auto md:h-full " /> 
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
//             <path fill="#9685CF" fill-opacity="1" d="M0,96L30,101.3C60,107,120,117,180,133.3C240,149,300,171,360,181.3C420,192,480,192,540,170.7C600,149,660,107,720,85.3C780,64,840,64,900,64C960,64,1020,64,1080,80C1140,96,1200,128,1260,149.3C1320,171,1380,181,1410,186.7L1440,192L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path>
//           </svg>
//     </div> <div className="md:w-1/2 flex flex-col justify-center text-center md:text-right"> <h1 className="text-3xl lIN mt-1 md:text-5xl font-bold text-white"> نظم مشاويرك بفعالية مع<strong className="text-3xl gd mt-9 md:text-5xl text-[#FFA842]"> جّدولها</strong> 
//     </h1> <p className="mt-5 text-white font-bold Par text-lg md:text-xl"> هل تعاني من صعوبة تنظيم مشاويرك؟ هل تجد نفسك تهدر الكثير من الوقت في التنقل بين الأماكن المختلفة؟ لدينا الحل الأمثل لك. </p>
//      <Link to="/scheduler"> <button className="mt-5 btn text-3xl bg-[#FFA842] text-white font-bold px-4 py-2 md:px-6 md:py-2 hover:bg-b transition duration-300 md:text-base max-sm:self-center"> ابدأ الان </button> 
//      </Link>
//      </div> 
//      </div>
//       </div>
//       </div> ); } 
//     export default Landding;