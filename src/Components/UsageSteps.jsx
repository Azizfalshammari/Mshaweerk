import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import "../App.css";

gsap.registerPlugin(ScrollTrigger);

function UsageSteps() {
  const lineRef1 = useRef(null);
  const lineRef2 = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      lineRef1.current,
      { strokeDasharray: "0, 500" },
      {
        strokeDasharray: "500, 0",
        duration: 8,
        // ease: "power2.inOut",
        scrollTrigger: {
          trigger: lineRef1.current,
          //   start: "top 80%",
          //   end: "top 30%",
          //   scrub: true,
          //   toggleActions: "play none none none ",
        },
      }
    );

    gsap.fromTo(
      lineRef2.current,
      { strokeDasharray: "10, 10" },
      {
        strokeDasharray: "25, 25",
        duration: 8,
        // ease: "power2.inOut",
        scrollTrigger: {
          trigger: lineRef2.current,
          //   start: "top 80%",
          //   end: "top 30%",
          //   scrub: true,
          //   toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="text-center p-[20px]">
      <h1>كيف نستخدم جدولها ؟</h1>
      <div className="step">
        <div className="number">1</div>
        <p>ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p>
      </div>
      <svg
        className="line mx-auto"
        width="200"
        height="200"
        viewBox="0 0 200 400"
      >
        <path
          className="background-line"
          d="M100 0 Q 250 150, 350 200 T 100 300 T 100 400 T 100 500 T 100 600"
          stroke="#ddd"
          strokeWidth="25"
          fill="none"
        />
        <path
          ref={lineRef1}
          d="M100 0 Q 250 150, 150 200 T 100 300 T 100 400 T 100 500 T 100 600"
          stroke="#6C63FF"
          strokeWidth="25"
          fill="none"
          strokeDasharray="500, 500"
        />
      </svg>
      <div className="step">
        <div className="number">2</div>
        <p>ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p>
      </div>
      <svg
        className="line mx-auto"
        width="200"
        height="200"
        viewBox="0 0 200 400"
      >
        <path
          className="background-line"
          d="M100 0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600"
          stroke="#ddd"
          strokeWidth="25"
          fill="none"
        />
        <path
          ref={lineRef2}
          d="M100 0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600"
          stroke="#6C63FF"
          strokeWidth="25"
          fill="none"
          strokeDasharray="500, 500"
        />
      </svg>
      <div className="step">
        <div className="number">3</div>
        <p>ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p>
      </div>
    </div>
  );
}

export default UsageSteps;
