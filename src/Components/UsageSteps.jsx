import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../App.css";

gsap.registerPlugin(ScrollTrigger);

function UsageSteps() {
  const lineRef = useRef(null);

  useEffect(() => {
    const pathLength = lineRef.current.getTotalLength();

    gsap.fromTo(
      lineRef.current,
      {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      },
      {
        strokeDashoffset: 0,
        duration: 20,
        scrollTrigger: {
          trigger: lineRef.current,
        },
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white py-10">
      <h1 className="text-4xl font-bold mb-10">How does it work?</h1>
      <div className="relative w-full flex justify-center items-center">
        <svg
          className="absolute w-full h-full z-0 max-lg:hidden"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gradient1" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="#ff7f50" />
              <stop offset="100%" stopColor="#6C63FF" />
            </linearGradient>
          </defs>

          <path
            ref={lineRef}
            d="M1320,-10 
           Q1080,100 750,180 
           l -200 -170,
             l -600 400
         
          "
            stroke="url(#gradient1)"
            strokeWidth="5"
            strokeDasharray="1000, 1000"
            strokeDashoffset="1000"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <div className="relative w-[90%] bg--500 z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="step z-50 bg-white border-4 border-purple-400 card p-4 rounded-badge flex flex-col items-center w-96 h-40">
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex justify-center rounded-full w-[30px] mb-4">
              <p className="text-white text-2xl">1</p>
            </div>
            <p className="text-center">test </p>
          </div>

          <div className="step z-50 bg-white border-4 border-purple-400 mt-32 card p-4 rounded-badge flex flex-col items-center w-96 h-40">
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex justify-center rounded-full w-[30px] mb-4">
              <p className="text-white text-2xl">2</p>
            </div>
            <p className="text-center">tet </p>
          </div>

          <div className="step z-50 bg-white border-4 border-purple-400 card p-4 rounded-badge flex flex-col items-center w-96 h-40">
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex justify-center rounded-full w-[30px] mb-4">
              <p className="text-white text-2xl">3</p>
            </div>
            <p className="text-center">test </p>
          </div>

          <div className="step z-50 bg-white  border-4 border-purple-400 mt-52 card p-4 rounded-badge flex flex-col items-center w-96 h-40">
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex justify-center rounded-full w-[30px] mb-4">
              <p className="text-white text-2xl">4</p>
            </div>
            <p className="text-center text-xl">test tsts </p>
            <p>loredkdkjdjddjdj</p>
            <p></p>
          </div>
        </div>
      </div>
      <button className="mt-10 px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-500 text-white text-lg rounded-full">
        Get Started
      </button>
    </div>
  );
}

export default UsageSteps;
