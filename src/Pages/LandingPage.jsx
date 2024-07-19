import React from 'react';
import img1 from './landing-phot.png';

function LandingPage() {
  return (
    <div className="w-full flex bg-[#9685CF] h-auto justify-center items-center md:h-full py-10 md:py-0">
      <div className="w-full max-w-7xl md:h-full px-4 md:px-0">
        <div className="flex flex-col md:h-full md:flex-row-reverse">
          <div className="mr-14 md:w-1/2 flex justify-center md:h-full mb-6 md:mb-0">
            <img src={img1} alt="Landing" className="h-auto w-full md:w-auto md:h-full" />
{/*             add wavy */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#9685CF" fill-opacity="1" d="M0,64L48,80C96,96,192,128,288,149.3C384,171,480,181,576,170.7C672,160,768,128,864,122.7C960,117,1056,139,1152,165.3C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
              </svg>
{/*             end */}
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
