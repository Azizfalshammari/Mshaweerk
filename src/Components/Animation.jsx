import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../App.css";

gsap.registerPlugin(ScrollTrigger);

function Animation() {
  const lineRef = useRef(null);
  const lineRef1 = useRef(null);

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
    <div className="Appp">
      <h1 className="text-black font-bold mt-6 text-4xl">كيف نستخدم <strong className="text-[#FFA842]">جّدولها</strong>؟</h1>
      <div className="steps-container">
        <div className="step right" ref={el => textRefs.current[0] = el}>
          <div className="number">1</div>
          <p className="text-black font-bold text-xl">ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p>
        </div>
        <svg className="line" width="200" height="200" viewBox="0 0 200 400">
          <path
            ref={lineRef}
            d="m1400,0 
           Q1080,200 750,180 
           l -150 -120,
             l -600 400"
            stroke="url(#gradient1)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <div className="step center" ref={el => textRefs.current[1] = el}>
          <div className="number">2</div>
          <p className="text-black font-bold text-xl">حدد الأوقات التي تكون فيها مشغولًا لتجنب جدولة أي مشوار خلالها.</p>
        </div>
        <svg className="line" width="200" height="200" viewBox="0 0 200 400">
          <path
            className="background-line"
            d="M100 0 Q 150 150, 100 200 T 100 300 100 400"
            stroke="#ddd"
            strokeWidth="25"
            fill="none"
          />
          <path
            ref={el => lineRefs.current[1] = el}
            d="M100 0 Q 150 150, 100 200 T 100 300 100 400"
            stroke="#6C63FF"
            strokeWidth="25"
            fill="none"
            strokeDasharray="500, 500"
          />
        </svg>
        <div className="step left" ref={el => textRefs.current[2] = el}>
          <div className="number">3</div>
          <p className="text-black font-bold text-xl">سنقوم بتحليل جميع البيانات المدخلة لإنشاء جدول زمني مثالي .</p>
        </div>
      </div>
    </div>
  );
}

export default Animation;