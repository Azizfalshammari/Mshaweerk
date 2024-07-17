// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import "../App.css";

// function App() {
//   const lineRef1 = useRef(null);
//   const lineRef2 = useRef(null);

//   useEffect(() => {
//     gsap.fromTo(
//       lineRef1.current,
//       { strokeDasharray: "0, 900" },
//       { strokeDasharray: "500, 0", duration: 9, ease: "none", repeat: -1 }
//     );
//     gsap.fromTo(
//       lineRef2.current,
//       { strokeDasharray: "0, 500" },
//       { strokeDasharray: "500, 0", duration: 9, ease: "none", repeat: -1 }
//     );
//   }, []);

//   return (
//     <div className="App">
//       <h1>كيف نستخدم جدولها ؟</h1>
//       <div className="step">
//         <div className="number">1</div>
//         <p>ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p>
//       </div>
//       <svg className="line" width="200" height="200" viewBox="0 0 200 400">
//         <path
//           className="background-line"
//           d="M100 0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600"
//           stroke="#ddd"
//           strokeWidth="25"
//           fill="none"
//         />
//         <path
//           ref={lineRef1}
//           d="M100 0 Q 150 150 , 100 200 T 100 300 T 100 400 T 100 500 T 100 600 "
//           stroke="#6C63FF"
//           strokeWidth="25"
//           fill="none"
//           strokeDasharray="25, 25"
//         />
//       </svg>
//       <div className="step">
//         <div className="number">2</div>
//         <p>ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p>
//       </div>
//       <svg className="line" width="200" height="200" viewBox="0 0 200 400">
//         {/* <path
//           className="background-line"
//           d="M100  0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600"
//           stroke="#ddd"
//           strokeWidth="25"
//           fill="none"
//         /> */}
//         <path
//           ref={lineRef2}
//           d="M100 0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600"
//           stroke="#6C63FF"
//           strokeWidth="25"
//           fill="none"
//           strokeDasharray="25, 25"
//         />
//       </svg>
//       <div className="step">
//         <div className="number">3</div>
//         <p>ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p>
//       </div>
//     </div>
//   );
// }

// export default App;
