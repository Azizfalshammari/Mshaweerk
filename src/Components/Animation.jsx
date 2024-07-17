
// import React, { useEffect, useRef } from "react"; 
// import { gsap } from "gsap"; import "../App.css"; 
// function Animation() 
// { const lineRef1 = useRef(null); const lineRef2 = useRef(null); useEffect(() => { gsap.fromTo( lineRef1.current, { strokeDasharray: "0, 500" }, { strokeDasharray: "500, 0", duration: 9, ease: "none" } ); 
// gsap.fromTo( lineRef2.current, { strokeDasharray: "0, 500" }, { strokeDasharray: "500, 0", duration: 9, ease: "none" } ); }, []); return ( <div className="App"> <h1>كيف نستخدم جدولها ؟</h1> <div className="step"> <div className="number">1</div>
//  <p>ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p> </div> 
//  <svg className="line" width="200" height="200" viewBox="0 0 200 400">
//      <path className="background-line" d="M100 0 Q 150 150, 100 200 T 100 300 100 400 T 100 500 T 100 600" stroke="#ddd" strokeWidth="25" fill="none" /> 
//      <path ref={lineRef1} d="M100 0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600" stroke="#6C63FF" strokeWidth="25" fill="none" strokeDasharray="500, 500" /> 
//  </svg> <div className="step"> 
//     <div className="number">2</div> <p>ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p> </div> <svg className="line" width="200" height="200" viewBox="0 0 200 400"> <path className="background-line" d="M100 0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600" stroke="#ddd" strokeWidth="25" fill="none" /> <path ref={lineRef2} d="M100 0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600" stroke="#6C63FF" strokeWidth="25" fill="none" strokeDasharray="500, 500" /> </svg> 
//  <div className="step"> 
//     <div className="number">3</div> 
//     <p>ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع.</p> 
//     </div> 
//     </div> ); }
//  export default Animation;


import React, { useEffect, useRef } from "react"; 
import { gsap } from "gsap"; 
import "../App.css"; 

function Animation() { 
    const lineRef1 = useRef(null); 
    const lineRef2 = useRef(null); 

    useEffect(() => { 
        
        gsap.fromTo(
            lineRef1.current,
            { strokeDasharray: "10, 10" }, 
            { strokeDasharray: "25, 25", duration: 9, ease: "none" } 
        ); 
        
        gsap.fromTo(
            lineRef2.current,
            { strokeDasharray: "10, 10" }, 
            { strokeDasharray: "25, 25", duration: 9, ease: "none" }
        ); 
    }, []); 

    return ( 
        <div className="App flex-col justify-center m-[auto]"> 
            <h1 className="mb-[20px] text-[18px] text-gray-600 border-solid border-[#FFA842] border-[1px] shadow-xl rounded-[15px] p-2">كيف نستخدم جدولها ؟</h1> 
            <div className="step"> 
                {/* <div className="number">1</div> */}
                <i className="fa-solid fa-circle-nodes root mb-[-4vh] relative z-10"></i>
                <p className="cloud-background bg-[#eee] text-gray-600  font-medium">ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع</p> 
            </div> 
            <svg className="line" width="200" height="200" viewBox="0 0 200 400">
                <path className="background-line" d="M100 0 Q 150 150, 100 200 T 100 300 100 400 T 100 500 T 100 600" stroke="" strokeWidth="25" fill="none" /> 
                <path 
                    ref={lineRef1} 
                    d="M100 0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600" 
                    stroke="#6C63FF" 
                    strokeWidth="10" 
                    fill="none" 
                    strokeDasharray="5, 15" 
                /> 
            </svg> 
            <div className="step"> 
                {/* <div className="number">2</div>  */}
                <i className="fa-solid fa-circle-nodes root  mb-[-4vh] relative z-10"></i>
                <p className="cloud-background bg-[#eee] font-medium text-gray-600">ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع</p>
            </div> 
            <svg className="line " width="200" height="200" viewBox="0 0 200 400"> 
                <path className="background-line" d="M100 0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600" stroke="" strokeWidth="25" fill="none" /> 
                <path 
                    ref={lineRef2} 
                    d="M100 0 Q 150 150, 100 200 T 100 300 T 100 400 T 100 500 T 100 600" 
                    stroke="#6C63FF" 
                    strokeWidth="10" 
                    fill="none" 
                    strokeDasharray="5, 15" 
                /> 
            </svg> 
            <div className="step"> 
                {/* <div className="number">3</div>  */}
                <i className="fa-solid fa-circle-nodes root  mb-[-4vh] relative z-10"></i>
                <p className="cloud-background bg-[#eee] text-gray-600 font-medium">ادخل جميع الأماكن التي تحتاج لزيارتها خلال الأسبوع</p> 
            </div> 
        </div> 
    ); 
}

export default Animation;


         
