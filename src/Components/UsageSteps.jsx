import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../App.css";

gsap.registerPlugin(ScrollTrigger);

function UsageSteps() {
  const lineRef1 = useRef(null);
  const lineRef2 = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      lineRef1.current,
      { strokeDasharray: "0, 900" },
      {
        strokeDasharray: "900, 0",
        duration: 20,
        scrollTrigger: {
          trigger: lineRef1.current,
        },
      }
    );

    gsap.fromTo(
      lineRef2.current,
      { strokeDasharray: "0, 900" },
      {
        strokeDasharray: "900, 0",
        duration: 20,
        scrollTrigger: {
          trigger: lineRef2.current,
        },
      }
    );
  }, []);

  return (
    <div className="text-center z-1 w-[100%] text-xl p-[20px]">
      <h1>كيف نستخدم جدولها ؟</h1>
      <div className="flex gap-10 justify-center">
        <div className="step  flex flex-col items-center">
          <div className="bg-[#9685CF] flex justify-center rounded-full w-[30px]">
            <p>1</p>
          </div>
          <p className="flex items-center justify-center">
            ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.
          </p>
        </div>
        <svg
          className="line absolute"
          width="100%"
          height="400"
          viewBox="0 0 200 400"
        >
          <path
            className="background-line"
            d="M340 50 Q 250 100, 200 100 T 130 130"
            stroke="#ddd"
            strokeWidth="15"
            fill="none"
          />
          <path
            ref={lineRef1}
            d="M340 50 Q 250 100, 200 100 T 130 130"
            stroke="#9685CF"
            strokeWidth="15"
            fill="none"
            strokeDasharray="900, 900"
          />
          <path
            className="background-line"
            d="M30 190   Q 0 200, 30 210 T -70 240, l-230 10"
            stroke="#ddd"
            strokeWidth="15"
            fill="none"
          />
          <path
            ref={lineRef2}
            d="M30 190   Q 0 200, 30 210 T -70 240, l-230 10"
            stroke="#9685CF"
            strokeWidth="15"
            fill="none"
            strokeDasharray="900, 900"
          />
        </svg>
        <div className="step  z-50 flex flex-col items-center justify-center">
          <div className="bg-[#9685CF] mt-1 flex justify-center rounded-full w-[30px]">
            <p>2</p>
          </div>
          <p>ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p>
        </div>
        <div className="step  z-[99] flex flex-col mr-10 items-center justify-end">
          <div className="bg-[#9685CF] mt-60  flex justify-center  rounded-full w-[30px]">
            3
          </div>
          <p>ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p>
        </div>
      </div>
    </div>
  );
}

export default UsageSteps;
