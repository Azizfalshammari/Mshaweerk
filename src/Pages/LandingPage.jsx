import React from 'react';
import img1 from './landing-phot.png';

function LandingPage() {
  return (
    <div className="w-full flex bg-[#9685CF] h-auto justify-center items-center md:h-full py-10 md:py-0">
      <div className="w-full max-w-7xl md:h-full px-4 md:px-0">
        <div className="flex flex-col md:h-full md:flex-row-reverse">
          <div className="mr-14 md:w-1/2 flex justify-center md:h-full mb-6 md:mb-0">
            <img src={img1} alt="Landing" className="h-auto w-full md:w-auto md:h-full" />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center text-center md:text-right">
            <h1 className="text-3xl lIN mt-1 md:text-5xl text-white">
              نظم مشاويرك بفعالية مع<strong className="text-3xl gd mt-9 md:text-5xl text-[#FFA842]"> جّدولها</strong>
            </h1>
            <p className="mt-5 text-white Par text-lg md:text-xl">
              هل تعاني من صعوبة تنظيم مشاويرك؟ هل تجد نفسك تهدر الكثير من الوقت في التنقل بين الأماكن المختلفة؟ لدينا الحل الأمثل لك.
            </p>
            <button className="mt-5 btn text-3xl bg-[#FFA842] text-white font-bold px-4 py-2 md:px-6 md:py-2 hover:bg-b transition duration-300 md:text-base">
              ابدأ الان
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
