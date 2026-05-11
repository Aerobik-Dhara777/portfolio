"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";


gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AboutSection() {
  const aboutRef = useRef(null);
  const h2Ref = useRef(null);
  const paraRef = useRef(null);
  const imageRef = useRef(null);
  const expansionRef = useRef(null);

  

  useLayoutEffect(() => {
    let paraSplit = null;
    // console.log(expansionRef.current.offsetHeight);
    const ctx = gsap.context(() => {
      /** Wait for fonts to be ready first */
      document.fonts.ready.then(() => {
        
// animate h2
const h2El = h2Ref.current;

// IMAGE SCALE ANIMATION

if (imageRef.current) {
  gsap.from(imageRef.current, {
    scale: 0.72,
    opacity: 0,
    ease: "power3.out",
    

    scrollTrigger: {
      trigger: imageRef.current,
      start: "top 67%",
      end: "top 27%",
      scrub: 3.7,
    },
  });
}

if (expansionRef.current) {
  gsap.set(expansionRef.current, { y: "100%" });

  // RISE — scroll down into about section → div climbs up
  gsap.to(expansionRef.current, {
    y: "0%",
    ease: "power4.out",
    scrollTrigger: {
      trigger: aboutRef.current,
      start: "top 100%",   // starts at 95% — as you said
      end: "top 57%",     // fully risen when about top reaches 10%
      scrub: 2.7,        // 1:1 with scroll — only moves when you scroll
    },
  });

  // DROP — scroll down past about section → div drops back down
  // gsap.to(expansionRef.current, {
  //   y: "100%",
  //   ease: "power4.in",
  //   scrollTrigger: {
  //     trigger: aboutRef.current,
  //     start: "bottom 50%",  // starts dropping when about bottom starts leaving
  //     end: "bottom 90%",     // fully dropped when about section exits viewport
  //     scrub: 2.7,
  //   },
  // });
}

if (h2El) {
  const split = SplitText.create(h2El, {
    type: "chars",
    charsClass: "char inline-block",
  });

  gsap.set(split.chars, {
    display: "inline-block",
    willChange: "transform",
  });

  // SCROLL-BASED ABOUT ANIMATION
  gsap.from(split.chars, {
    x: -170,
    // y: 40,
    opacity: 0,
    stagger: 0.08,
    ease: "power3.out",

    scrollTrigger: {
      trigger: aboutRef.current,
      start: "top 80%",
      end: "top 20%",
      scrub: 1.7,
    },
  });
}

// Animate paragraph - SCROLL-BASED
const pEl = paraRef.current;

if (pEl) {
  paraSplit = SplitText.create(pEl, {
    type: "chars, words",
    charsClass: "char-animate",
  });

  gsap.set(paraSplit.chars, {
    display: "inline-block",
    willChange: "transform",
    opacity: 1,
  });

  // Create timeline for scroll-based animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: pEl,
      start: "top 77%",
      end: "bottom 67%",
      scrub: 2.7,
      toggleActions: "play none none reverse",
    },
  });

  // Animate each character from random position to its place
  paraSplit.chars.forEach((char, i) => {
    const randomX = gsap.utils.random(-177, 177);
    const randomY = gsap.utils.random(17, 70);

    tl.fromTo(
      char,
      {
        x: randomX,
        y: randomY,
        opacity: 1,
        scale: gsap.utils.random(0.3, 1.5),
        rotation: gsap.utils.random(-77, 77),
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        ease: "power2.out",
      },
      i * 0.01
    );
  });
}
      });
    }, aboutRef);

    return () => {
      if (paraSplit && typeof paraSplit.revert === "function") paraSplit.revert();
      ctx.revert();
    };

    
  }, []);

  return (
    <div className="relative overflow-hidden">
          {/* BACKGROUND EXPANSION LAYER */}
  <div
    ref={expansionRef}
    className="fixed bottom-0 left-0 w-full h-[100vh] bg-black z-10  pointer-events-none"
    // style={{ transform: "scaleY(0)" }}
  />
 
     <section
      ref={aboutRef}
      id="about"
      className="max-w-8xl mx-auto py-16 md:py-35 px-4  relative z-20"
        style={{
          background: "#000",
        }}
    >
      <div className="grid md:grid-cols-3 gap-8 items-start px-[13%]">
        <div className="md:col-span-2">
          <h2
            ref={h2Ref}
            className="about-title text-5xl md:text-7xl mb-7 uppercase"
          >
              about       </h2>
          <p
            ref={paraRef}
            className="about-para text-2xl leading-relaxed opacity-90"
          >
I'm Soumadip Dhara, a systems-focused developer and AI engineer. I work at the intersection of software architecture, low-level computation, and intelligent systems — building scalable applications while deeply understanding how technology works beneath the surface. I prioritize performance, clean abstractions, and technically sound execution. 
          </p>
        </div>
        <div className="relative flex-col items-center ">


          <img ref={imageRef} src="./image.png" alt="" className="rounded-[37px] "/>
        </div>
      </div>
    </section>  
    </div>
  );
}



























// "use client";
// import { useRef, useLayoutEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";

// gsap.registerPlugin(ScrollTrigger, SplitText);

// export default function AboutSection() {
//   const aboutRef = useRef(null);
//   const h2Ref = useRef(null);
//   const paraRef = useRef(null);
//   const imageRef = useRef(null);
//   const expansionRef = useRef(null);

//   useLayoutEffect(() => {
//     let paraSplit = null;
//     let h2Split = null;

//     const ctx = gsap.context(() => {

//       // ── ① SYNC SETS — run before first paint, no async gap ──────────
//       gsap.set(expansionRef.current, { y: "100%" });
//       gsap.set(imageRef.current, { scale: 0.72, opacity: 0 });

//       // ── EXPANSION — fully independent, untouched ─────────────────────
//       gsap.to(expansionRef.current, {
//         y: "0%",
//         ease: "power4.out",
//         scrollTrigger: {
//           trigger: aboutRef.current,
//           start: "top 100%",
//           end: "top 57%",
//           scrub: 2.7,
//           invalidateOnRefresh: true,
//           pinSpacing: true,
//         },
//       });

//       // ── MASTER PINNED TIMELINE ───────────────────────────────────────
//       //  Total  : ~650vh  |  1 unit ≈ 100vh
//       //  0 → 1  : dead zone (100vh scroll, nothing moves)
//       //  1 → 6.5: all content animations fire
//       //
//       //  WHY 650vh:
//       //    H2  (~5 chars)  : pos 1, stagger 0.08, dur 1.5 → ends at ~2.9
//       //    Para (~340 chars): pos 2, stagger 0.01, dur 1.0 → ends at ~6.4
//       //    ceil(6.4) × 100vh = 640vh → 650vh gives a clean tail buffer
//       const masterTL = gsap.timeline({
//         scrollTrigger: {
//           trigger: aboutRef.current,
//           start: "top top",
//           end: "+=650vh",   // ✅ was 400vh — extended to match actual timeline duration
//           scrub: true,
//           pin: true,
//           anticipatePin: 1,
//         },
//       });


//       // ── Wait for fonts before SplitText (font metrics must be ready) ──
//       document.fonts.ready.then(() => {

//         const h2El = h2Ref.current;
//         const pEl = paraRef.current;

//         // ── H2 SPLIT ────────────────────────────────────────────────────
//         if (h2El) {
//           h2Split = SplitText.create(h2El, {
//             type: "chars",
//             charsClass: "char inline-block",
//           });
//           gsap.set(h2Split.chars, {
//             display: "inline-block",
//             willChange: "transform",
//             x: -170,
//             opacity: 0,
//           });
//         }

//         // ── PARA SPLIT + cache randoms once ─────────────────────────────
//         let randomCache = [];
//         if (pEl) {
//           paraSplit = SplitText.create(pEl, {
//             type: "chars, words",
//             charsClass: "char-animate",
//           });

//           // Cache ONCE — stable values on scrub reverse
//           randomCache = paraSplit.chars.map(() => ({
//             x: gsap.utils.random(-177, 177),
//             y: gsap.utils.random(17, 70),
//             scale: gsap.utils.random(0.3, 1.5),
//             rotation: gsap.utils.random(-77, 77),
//           }));

//           // Apply cached random initial state
//           paraSplit.chars.forEach((char, i) => {
//             gsap.set(char, {
//               display: "inline-block",
//               willChange: "transform",
//               opacity: 1,
//               x: randomCache[i].x,
//               y: randomCache[i].y,
//               scale: randomCache[i].scale,
//               rotation: randomCache[i].rotation,
//             });
//           });
//         }

//         // Dead zone spacer — holds 100vh of scroll, nothing visible happens
//         masterTL.to({}, { duration: 1 });

//         // Image scales in (1 → 3)
//         if (imageRef.current) {
//           masterTL.to(
//             imageRef.current,
//             { scale: 1, opacity: 1, ease: "power3.out", duration: 2 },
//             1
//           );
//         }

//         // H2 chars fly in from left (1 → ~2.9)
//         // ✅ stagger: 0.37 → 0.08  |  duration: 3.7 → 1.5
//         // OLD: 5 chars × 0.37 stagger + 3.7 dur = 5.18 units from pos 1 → ends 6.18
//         // NEW: 5 chars × 0.08 stagger + 1.5 dur = 1.9  units from pos 1 → ends 2.9
//         if (h2Split) {
//           masterTL.to(
//             h2Split.chars,
//             { x: 0, opacity: 1, stagger: 0.08, ease: "power3.out", duration: 1.5 },
//             1
//           );
//         }

//         // Para chars scatter → settle (2 → ~6.4)
//         // ✅ stagger: 0.17 → 0.01  |  duration: 1.5 → 1.0
//         // OLD: 340 chars × 0.17 stagger + 1.5 dur = 59.3 units from pos 2 → ends 61.3 💀
//         // NEW: 340 chars × 0.01 stagger + 1.0 dur =  4.4 units from pos 2 → ends  6.4 ✅
//         if (paraSplit && randomCache.length) {
//           masterTL.fromTo(
//             paraSplit.chars,
//             {
//               x: (i) => randomCache[i].x,
//               y: (i) => randomCache[i].y,
//               scale: (i) => randomCache[i].scale,
//               rotation: (i) => randomCache[i].rotation,
//               opacity: 1,
//             },
//             {
//               x: 0,
//               y: 0,
//               scale: 1,
//               rotation: 0,
//               opacity: 1,
//               ease: "power2.out",
//               duration: 4.0,   // ✅ was 1.5
//               stagger: 0.01,   // ✅ was 0.17 — the killer value
//             },
//             2
//           );
//         }

//         // Recalculate all trigger positions after async setup
//         ScrollTrigger.refresh();
//       });
//     }, aboutRef);

//     return () => {
//       if (paraSplit?.revert) paraSplit.revert();
//       if (h2Split?.revert) h2Split.revert();
//       ctx.revert();
//     };
//   }, []);

//   return (
//     // ── overflow-hidden REMOVED — was killing pin spacer calculations ──
//     <div className="relative">
//       {/* BACKGROUND EXPANSION — independent fixed layer */}
//       <div
//         ref={expansionRef}
//         className="fixed bottom-0 left-0 w-full h-[100vh] bg-[#333] z-10 pointer-events-none"
//       />

//       <section
//         ref={aboutRef}
//         id="about"
//         className="max-w-8xl mx-auto min-h-screen py-16 md:py-35 px-4 relative z-20"
//         style={{ background: "#000" }}
//       >
//         <div className="grid md:grid-cols-3 gap-8 items-start px-[13%]">
//           <div className="md:col-span-2">
//             <h2
//               ref={h2Ref}
//               className="about-title text-5xl md:text-7xl mb-7 uppercase"
//             >
//               about
//             </h2>
//             <p
//               ref={paraRef}
//               className="about-para text-2xl leading-relaxed opacity-90"
//             >
//               I'm Soumadip Dhara, a systems-focused developer and AI engineer. I
//               work at the intersection of software architecture, low-level
//               computation, and intelligent systems — building scalable
//               applications while deeply understanding how technology works
//               beneath the surface. I prioritize performance, clean abstractions,
//               and technically sound execution.
//             </p>
//           </div>
//           <div className="relative flex-col items-center">
//             <img
//               ref={imageRef}
//               src="./image.png"
//               alt=""
//               className="rounded-[37px]"
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }