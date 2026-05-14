"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AboutSection() {
  const aboutRef     = useRef(null);
  const h2Ref        = useRef(null);
  const paraRef      = useRef(null);
  const imageRef     = useRef(null);
  const expansionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        runAnimation({ titleOffset: 140, scaleStart: 0.72 });
      });

      mm.add("(max-width: 767px)", () => {
        runAnimation({ titleOffset: 80, scaleStart: 0.85 });
      });

      function runAnimation(config) {
        /* ─── EXPANSION (unchanged) ──────────────────────────────────── */
        if (expansionRef.current) {
          gsap.set(expansionRef.current, { y: "100%" });
          gsap.to(expansionRef.current, {
            y: "0%",
            ease: "power4.out",
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 100%",
              end: "top 57%",
              scrub: 2.7,
            },
          });
        }

        /* ─── SPLIT ──────────────────────────────────────────────────── */
        const h2Split = SplitText.create(h2Ref.current, {
          type: "chars",
          charsClass: "inline-block",
        });

        const paraSplit = SplitText.create(paraRef.current, {
          type: "chars",
          charsClass: "inline-block",
        });

        /* ─── INITIAL STATES ─────────────────────────────────────────── */
        gsap.set(h2Split.chars, { y: 277, opacity: 0 });
        gsap.set(imageRef.current, { scale: config.scaleStart, opacity: 0 });

        /* ─── SCATTER: place every para char at a random position ───────
         *
         *  gsap x/y are transforms relative to each char's natural
         *  layout position. Setting large random values visually throws
         *  them all over the viewport (and beyond the overflow boundary,
         *  so they fly in from the edges as the tl progresses).
         *
         *  Opacity is untouched — letters are fully opaque but
         *  physically displaced. The animation only moves them
         *  back to x:0, y:0 (their correct typeset position).
         * ──────────────────────────────────────────────────────────────*/
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        paraSplit.chars.forEach((char) => {
          gsap.set(char, {
            x: (Math.random() - 0.5) * vw * 3,
            y: (Math.random() - 0.5) * vh * 3,
            rotation: (Math.random() - 0.5) * 720,
          });
        });

        /* ─── TIMELINE ──────────────────────────────────────────────── */
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Hold
        tl.to({}, { duration: 0.01 });

        // Title
        tl.to(
          h2Split.chars,
          { y: 0, opacity: 1, stagger: 0.06, duration: 1 },
          "-=1"
        );

        // Image
        tl.to(imageRef.current, { scale: 1, opacity: 1, duration: 1.5 });

        /* ─── PARAGRAPH: scattered → home ───────────────────────────────
         *
         *  Each char flies from its random position to x:0 y:0
         *  (its correct place in the paragraph layout).
         *  stagger from:"random" — chars don't land in reading order,
         *  they assemble chaotically, which matches the scattered start.
         *
         *  Tune:
         *    each        → time gap between chars landing
         *    from        → "random" | "start" | "end" | "center"
         *    duration    → how long each individual char travels
         *    ease        → deceleration curve into final position
         * ──────────────────────────────────────────────────────────────*/
        tl.to(
          paraSplit.chars,
          {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 2,
            ease: "power4.out",
            stagger: {
              each: 0.018,
              from: "random",
            },
          },
          "-=0.3"
        );

        /* ─── PIN ───────────────────────────────────────────────────── */
        ScrollTrigger.create({
          animation: tl,
          trigger: aboutRef.current,
          start: "top top",
          end: () => `+=${tl.duration() * 100}%`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={expansionRef}
        className="fixed bottom-0 left-0 w-full h-[100vh] bg-black z-10 pointer-events-none"
      />

      <section
        ref={aboutRef}
        id="about"
        className="max-w-8xl mx-auto py-16 md:py-35 px-4 relative z-20"
        style={{ background: "#000" }}
      >
        <div className="grid md:grid-cols-3 gap-8 items-start px-[13%]">
          <div className="md:col-span-2">
            <h2
              ref={h2Ref}
              className="
                about-title
                text-[57px]
                sm:text-[155px]
                md:text-[64px]
                lg:text-[177px]
                uppercase
              "
            >
              about
            </h2>

            <p
              ref={paraRef}
              className="about-para text-2xl leading-relaxed opacity-90"
            >
              I'm Soumadip Dhara, a systems-focused developer and AI engineer.
              I work at the intersection of software architecture, low-level
              computation, and intelligent systems — building scalable
              applications while deeply understanding how technology works
              beneath the surface. I prioritize performance, clean abstractions,
              and technically sound execution.
            </p>
          </div>

          <div className="relative flex-col items-center">
            <img
              ref={imageRef}
              src="./image.png"
              alt=""
              className="rounded-[37px]"
            />
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
//           end: "+=700vh",   // ✅ was 400vh — extended to match actual timeline duration
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
//         // masterTL.to({}, { duration: 1 });
//         masterTL.addLabel("holdEnd", 0.7);
//         masterTL.to({}, { duration: 0.7 }); // exact 70vh dead zone

//         // Image scales in (1 → 3)
//         // if (imageRef.current) {
//         //   masterTL.to(
//         //     imageRef.current,
//         //     { scale: 1, opacity: 1, ease: "power3.out", duration: 2 },
//         //     1
//         //   );
//         // }

//         masterTL.to(
//   imageRef.current,
//   { scale: 1, opacity: 1, ease: "power3.out", duration: 2 },
//   0.7
// );

//         // H2 chars fly in from left (1 → ~2.9)
//         // ✅ stagger: 0.37 → 0.08  |  duration: 3.7 → 1.5
//         // OLD: 5 chars × 0.37 stagger + 3.7 dur = 5.18 units from pos 1 → ends 6.18
//         // NEW: 5 chars × 0.08 stagger + 1.5 dur = 1.9  units from pos 1 → ends 2.9
//         // if (h2Split) {
//         //   masterTL.to(
//         //     h2Split.chars,
//         //     { x: 0, opacity: 1, stagger: 0.08, ease: "power3.out", duration: 1.5 },
//         //     1
//         //   );
//         // }

//         masterTL.to(
//   h2Split.chars,
//   { x: 0, opacity: 1, stagger: 0.08, ease: "power3.out", duration: 1.5 },
//   0.7
// );

//         // Para chars scatter → settle (2 → ~6.4)
//         // ✅ stagger: 0.17 → 0.01  |  duration: 1.5 → 1.0
//         // OLD: 340 chars × 0.17 stagger + 1.5 dur = 59.3 units from pos 2 → ends 61.3 💀
//         // NEW: 340 chars × 0.01 stagger + 1.0 dur =  4.4 units from pos 2 → ends  6.4 ✅
//         // if (paraSplit && randomCache.length) {
//         //   masterTL.fromTo(
//         //     paraSplit.chars,
//         //     {
//         //       x: (i) => randomCache[i].x,
//         //       y: (i) => randomCache[i].y,
//         //       scale: (i) => randomCache[i].scale,
//         //       rotation: (i) => randomCache[i].rotation,
//         //       opacity: 1,
//         //     },
//         //     {
//         //       x: 0,
//         //       y: 0,
//         //       scale: 1,
//         //       rotation: 0,
//         //       opacity: 1,
//         //       ease: "power2.out",
//         //       duration: 4.0,   // ✅ was 1.5
//         //       stagger: 0.01,   // ✅ was 0.17 — the killer value
//         //     },
//         //     2
//         //   );
//         // }

//                   masterTL.fromTo(
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

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       const mm = gsap.matchMedia();

//       mm.add("(min-width: 768px)", () => {
//         runAnimation({
//           titleOffset: -120,
//           paraOffset: 40,
//           scaleStart: 0.85,
//         });
//       });

//       mm.add("(max-width: 767px)", () => {
//         runAnimation({
//           titleOffset: -60,
//           paraOffset: 20,
//           scaleStart: 0.92,
//         });
//       });

//       function runAnimation(config) {
//         const h2Split = SplitText.create(h2Ref.current, {
//           type: "chars",
//           charsClass: "inline-block",
//         });

//         const paraSplit = SplitText.create(paraRef.current, {
//           type: "chars",
//           charsClass: "inline-block",
//         });

//         // Initial states
//         gsap.set(h2Split.chars, {
//           x: config.titleOffset,
//           opacity: 0,
//         });

//         gsap.set(paraSplit.chars, {
//           y: config.paraOffset,
//           opacity: 0,
//         });

//         gsap.set(imageRef.current, {
//           scale: config.scaleStart,
//           opacity: 0,
//         });

//         const tl = gsap.timeline({
//           defaults: { ease: "power3.out" }
//         });

//         // PHASE 1 – Hold
//         tl.to({}, { duration: 0.5 });

//         // PHASE 2 – Image
//         tl.to(imageRef.current, {
//           scale: 1,
//           opacity: 1,
//           duration: 1.5,
//         });

//         // PHASE 3 – Title
//         tl.to(
//           h2Split.chars,
//           {
//             x: 0,
//             opacity: 1,
//             stagger: 0.06,
//             duration: 1,
//           },
//           "-=1"
//         );

//         // PHASE 4 – Paragraph
//         tl.to(
//           paraSplit.chars,
//           {
//             y: 0,
//             opacity: 1,
//             stagger: 0.01,
//             duration: 1.8,
//           },
//           "-=0.5"
//         );

//         ScrollTrigger.create({
//           animation: tl,
//           trigger: aboutRef.current,
//           start: "top top",
//           end: () => `+=${tl.duration() * 100}%`,
//           scrub: 1.2,
//           pin: true,
//           anticipatePin: 1,
//         });
//       }
//     }, aboutRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//         <div className="relative overflow-hidden">
//       {/* BACKGROUND EXPANSION LAYER (UNCHANGED) */}
//       <div
//         ref={expansionRef}
//         className="fixed bottom-0 left-0 w-full h-[100vh] bg-black z-10 pointer-events-none"
//       />

//       <section
//         ref={aboutRef}
//         id="about"
//         className="max-w-8xl mx-auto py-16 md:py-35 px-4 relative z-20"
//         style={{ background: "#222" }}
//       >
//         <div className="grid md:grid-cols-3 gap-8 items-start px-[13%]">
//           <div className="md:col-span-2">
//             <h2
//               ref={h2Ref}
//               className="
//                 about-title
//                 text-[57px]
//                 sm:text-[155px]
//                 md:text-[64px]
//                 lg:text-[177px]
//                 mb-7 uppercase
//               "
//             >
//               about
//             </h2>

//             <p
//               ref={paraRef}
//               className="about-para text-2xl leading-relaxed opacity-90"
//             >
//               I'm Soumadip Dhara, a systems-focused developer and AI engineer.
//               I work at the intersection of software architecture, low-level
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