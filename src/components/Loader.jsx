// // Loader.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { TextPlugin } from "gsap/TextPlugin";

// gsap.registerPlugin(TextPlugin);

// export default function LoadingScreen({ onComplete }) {
//   const containerRef = useRef(null);
//   const counterRef = useRef(null);
//   const progressBarRef = useRef(null);
//   const textRef = useRef(null);
//   const [, setCounter] = useState(0);

//   useEffect(() => {
//     if (!containerRef.current || !counterRef.current || !progressBarRef.current || !textRef.current)
//       return;

//     // Lock scroll
//     const prevOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     // Grab main content
//     const mainEl = document.getElementById("main-content");

//     if (mainEl) {
//       // Slight haze effect while loader runs
//       gsap.set(mainEl, {
//         opacity: 1,
//         filter: "blur(8px)",
//         zIndex: 1000,
//         position: "relative",
//       });
//     }

//     const tl = gsap.timeline({
//       onComplete: () => {
//         // Remove haze
//         if (mainEl) gsap.set(mainEl, { filter: "none" });
//         document.body.style.overflow = prevOverflow;
//         onComplete && onComplete();
//       },
//     });

//     // Loader text intro
//     tl.fromTo(
//       textRef.current,
//       { opacity: 0, y: -30 },
//       { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
//     ).to(
//       textRef.current,
//       { text: "Loading Portfolio...", duration: 1.5, ease: "sine.out" },
//       "-=0.3"
//     );

//     // Counter & progress bar
//     tl.add(
//       gsap.to(counterRef.current, {
//         innerText: 100,
//         duration: 2.5,
//         snap: { innerText: 1 },
//         ease: "power2.inOut",
//         onUpdate: () => {
//           if (counterRef.current) setCounter(Math.round(Number(counterRef.current.innerText)));
//         },
//       }),
//       0
//     );

//     tl.add(
//       gsap.to(progressBarRef.current, {
//         width: "100%",
//         duration: 2.5,
//         ease: "power2.inOut",
//       }),
//       0
//     );

//     // Slide loader up
//     tl.to(containerRef.current, { y: "-120%", duration: 1.5, ease: "power4.inOut" }, "-=0.5");

//     return () => {
//       tl.kill();
//       document.body.style.overflow = prevOverflow;
//     };
//   }, [onComplete]);

//   return (
//     <div
//       ref={containerRef}
//       className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#17153B]"
//     >
//       <h2 ref={textRef} className="loader-text mb-10 gradient-text text-[28px] md:text-[36px]">
//         Loading...
//       </h2>

//       <div className="fixed flex flex-col items-end" style={{ bottom: "50px", right: "60px", gap: "8px" }}>
//         <div ref={counterRef} className="counter-loader text-[#865DFF] text-[60px] font-bold">
//           0
//         </div>
//         <div className="w-[180px] h-[8px] bg-[#1c1455] rounded-full overflow-hidden">
//           <div
//             ref={progressBarRef}
//             className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 w-0"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
