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
        duration: 8,
        scrollTrigger: {
          trigger: lineRef1.current,
        },
      }
    );

    gsap.fromTo(
      lineRef2.current,
      { strokeDasharray: "0, 500" },
      {
        strokeDasharray: "0, 500",
        duration: 8,
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
        <div className="step border flex flex-col items-center">
          <div className="bg-fuchsia-400 flex justify-center rounded-full w-[30px]">
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
            className="  "
            d="M300 50 Q 210 150, 150 100 T 75 150 T 0 200 T -75 220 T -110 240 T -130 260"
            stroke="#ddd"
            strokeWidth="25"
            fill="none"
          />
          <path
            ref={lineRef1}
            d="M300 50 Q 210 150, 150 100 T 75 150 T 0 200 T -75 220 T -110 240 T -130 260"
            stroke="#6C63FF"
            strokeWidth="25"
            fill="none"
            strokeDasharray="900, 900"
          />
        </svg>
        <div className="step flex flex-col items-center justify-center">
          <div className="bg-fuchsia-400 mt-1 flex justify-center rounded-full w-[30px]">
            <p>2</p>
          </div>
          <p>ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p>
        </div>
        <div className="step flex flex-col items-center justify-end">
          <div className="bg-fuchsia-400 mt-60 rounded-full w-[30px]">3</div>
          <p>ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p>
        </div>
      </div>
    </div>
  );
}

export default UsageSteps;
