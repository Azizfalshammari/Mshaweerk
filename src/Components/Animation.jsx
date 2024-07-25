// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// function Animation() {
//   const lineRefs = useRef([]);

//   useEffect(() => {
//     gsap.fromTo(
//       lineRefs.current,
//       { strokeDashoffset: 50, opacity: 0 },
//       {
//         strokeDashoffset: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power4.out",
//         stagger: 0.5,
//       }
//     );
//   }, []);

//   return (
//     <div className="App flex-col justify-center">
//       <div className="text-center pb-2">
//         <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
//           كيف نستخدم جدولها ؟
//         </h1>
//       </div>
//       <div className="card">
//         <i className="fa-solid fa-circle-nodes root"></i>
//         <p className="card-content">
//           ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.
//         </p>
//       </div>
//       <svg className="line" width="200" height="200" viewBox="0 0 200 400">
//         <path
//           className="background-line"
//           d="M100 0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600"
//           stroke=""
//           strokeWidth="25"
//           fill="none"
//         />
//         <path
//           ref={(el) => (lineRefs.current[0] = el)}
//           d="M100 0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600"
//           stroke="#ffa842"
//           strokeWidth="10"
//           fill="none"
//           strokeDasharray="50"
//           strokeDashoffset="50"
//         />
//       </svg>
//       <div className="card">
//         <i className="fa-solid fa-circle-nodes root"></i>
//         <p className="card-content">
//           حدد الأوقات التي تكون فيها مشغولًا لتجنب جدولة أي مشوار خلالها.
//         </p>
//       </div>
//       <svg className="line " width="200" height="200" viewBox="0 0 200 400">
//         <path
//           className="background-line"
//           d="M100 0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600"
//           stroke=""
//           strokeWidth="25"
//           fill="none"
//         />
//         <path
//           ref={(el) => (lineRefs.current[1] = el)}
//           d="M100 0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600"
//           stroke="#ffa842"
//           strokeWidth="10"
//           fill="none"
//           strokeDasharray="50"
//           strokeDashoffset="50"
//         />
//       </svg>
//       <div className="card">
//         <i className="fa-solid fa-circle-nodes root"></i>
//         <p className="card-content">
//           سنقوم بتحليل جميع البيانات المدخلة (المشاوير، المسافات، الأوقات المشغولة) باستخدام خرائط قوقل لنقوم بإنشاء جدول زمني مثالي، يضمن أقل مسافة بين المشاوير وأفضل توقيت لكل منها.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Animation;

// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import "../App.css";

// function Animation() {
//   const lineRefs = useRef([]);
//   const textRefs = useRef([]);

//   useEffect(() => {
//     lineRefs.current.forEach((line, index) => {
//       gsap.fromTo(
//         line,
//         { strokeDasharray: "0, 500" },
//         { strokeDasharray: "500, 0", duration: 3, ease: "none", delay: index * 3 }
//       );
//     });

//     textRefs.current.forEach((text, index) => {
//       gsap.fromTo(
//         text,
//         { opacity: 0 },
//         { opacity: 1, duration: 3, ease: "power1.out", delay: index * 3 }
//       );
//     });
//   }, []);

//   return (
//     <div className="Appp">
//       <h1 className="text-black font-bold mt-6 text-4xl">كيف نستخدم <strong className="text-[#FFA842]">جّدولها</strong>؟</h1>
//       <div className="steps-container">
//         <div className="step right" ref={el => textRefs.current[0] = el}>
//           <div className="number">1</div>
//           <p className="text-black font-bold text-xl">ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p>
//         </div>
//         <svg className="line" width="200" height="200" viewBox="0 0 200 400">
//           <path
//             className="background-line"
//             d="M100 0 Q 150 150, 100 200 T 100 300 100 400"
//             stroke="#ddd"
//             strokeWidth="25"
//             fill="none"
//           />
//           <path
//             ref={el => lineRefs.current[0] = el}
//             d="M100 0 Q 150 150, 100 200 T 100 300 100 400"
//             stroke="#6C63FF"
//             strokeWidth="25"
//             fill="none"
//             strokeDasharray="500, 500"
//           />
//         </svg>
//         <div className="step center" ref={el => textRefs.current[1] = el}>
//           <div className="number">2</div>
//           <p className="text-black font-bold text-xl">حدد الأوقات التي تكون فيها مشغولًا لتجنب جدولة أي مشوار خلالها.</p>
//         </div>
//         <svg className="line" width="200" height="200" viewBox="0 0 200 400">
//           <path
//             className="background-line"
//             d="M100 0 Q 150 150, 100 200 T 100 300 100 400"
//             stroke="#ddd"
//             strokeWidth="25"
//             fill="none"
//           />
//           <path
//             ref={el => lineRefs.current[1] = el}
//             d="M100 0 Q 150 150, 100 200 T 100 300 100 400"
//             stroke="#6C63FF"
//             strokeWidth="25"
//             fill="none"
//             strokeDasharray="500, 500"
//           />
//         </svg>
//         <div className="step left" ref={el => textRefs.current[2] = el}>
//           <div className="number">3</div>
//           <p className="text-black font-bold text-xl">سنقوم بتحليل جميع البيانات المدخلة لإنشاء جدول زمني مثالي .</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Animation;


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
    <div className="flex flex-col items-center justify-center w-full h-full bg-white py-10">
         <div className="mb-4">
         <h1 className="font-bold text-3xl text-center p-10 md:text-4xl lg:text-5xl font-heading text-gray-900">
          كيف نستخدم <strong className="text-[#FFA842]">جّدولها</strong> ؟
         </h1>
         </div>
      <div className="relative w-full flex justify-center items-center">
        <svg
          className="absolute z-0 max-lg:hidden "
          viewBox="0 0 1400 320"
          preserveAspectRatio="none"
          style={{ top: "-70px", left: "0", width: "100%", height: "auto" }}
        >
          <defs>
            <linearGradient id="gradient1" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="#6C63FF" />
              <stop offset="100%" stopColor="#6C63FF" />
            </linearGradient>
          </defs>

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
        <div className="relative w-[90%] bg--500 z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-sm:">
          <div className="step z-50 bg-white border-4 border-purple-400 card p-4 rounded-badge flex flex-col items-center w-96 h-40">
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex justify-center rounded-full w-[30px] mb-4">
              <p className="text-white text-2xl">1</p>
            </div>
            <p className="text-center font-bold">ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع. </p>
          </div>

          <div className="step z-50 bg-white border-4 border-purple-400 mt-32 card p-4 rounded-badge flex flex-col items-center w-96 h-40 max-sm:mt-2">
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex justify-center rounded-full w-[30px] mb-4">
              <p className="text-white text-2xl">2</p>
            </div>
            <p className="text-center font-bold">ادخل مكان عملك ومنزلك</p>
          </div>

          <div className="step z-50 bg-white border-4 border-purple-400 card p-4 rounded-badge flex flex-col items-center w-96 h-40 max-sm:mt-2">
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex justify-center rounded-full w-[30px] mb-4">
              <p className="text-white text-2xl">3</p>
            </div>
            <p className="text-center font-bold">حدد الأوقات التي تكون فيها مشغولًا لتجنب جدولة أي مشوار خلالها. </p>
          </div>
          <div className="step z-50 bg-white border-4 border-purple-400 mt-52 card p-4 rounded-badge flex flex-col items-center w-96 h-40 max-sm:mt-2">
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex justify-center rounded-full w-[30px] mb-4">
              <p className="text-white text-2xl">4</p>
            </div>
            <p className="text-center font-bold text-xl">سنقوم بتحليل جميع البيانات المدخلة لإنشاء جدول زمني مثالي  </p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Animation;