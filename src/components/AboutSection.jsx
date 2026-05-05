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

  useLayoutEffect(() => {
    let paraSplit = null;
    const ctx = gsap.context(() => {
      /** Wait for fonts to be ready first */
      document.fonts.ready.then(() => {
        
        //animate h2
        const h2El = h2Ref.current;
          if (h2El) {
            const split = SplitText.create(h2El, {
              type: "lines",
              linesClass: "line block overflow-hidden",
            });
            gsap.from(split.lines, {
              x: -170,
              opacity: 0,
              duration: 1.97,
              ease: "power3.out",
              stagger: 0.27,
            
              scrollTrigger: {
                trigger: aboutRef.current,
                start: "top 60%",
                toggleActions: "play none none reverse",
              },
            });
          }
        
        // Animate paragraph - SCROLL-BASED
        const pEl = paraRef.current;
        if (pEl) {
          paraSplit = SplitText.create(pEl, { 
            type: "chars, words", 
            charsClass: "char-animate"
          });
          
          gsap.set(paraSplit.chars, { 
            display: "inline-block", 
            willChange: "transform",
            opacity: 1  // Start with opacity 1
          });

          // Create timeline for scroll-based animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pEl,
              start: "top 117%",
              end: "bottom 67%",
              scrub: 2.7,  // Smooth scrubbing effect
              toggleActions: "play none none reverse",
            },
          });

          // Animate each character from random position to its place
          paraSplit.chars.forEach((char, i) => {
            const randomX = gsap.utils.random(-477, 377);
            const randomY = gsap.utils.random(17, 70);
            
            tl.fromTo(
              char,
              {
                x: randomX,
                y: randomY,
                opacity: 1,
                scale: gsap.utils.random(0.3, 1.5),
                rotation: gsap.utils.random(-180, 180),
              },
              {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                rotation: 0,
                ease: "power2.out",
              },
              i * 0.01  // Stagger timing
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
    <section
      ref={aboutRef}
      id="about"
      className="max-w-8xl mx-auto py-16 md:py-35 px-4  relative z-5 backdrop-blur-xl"
                style={{
            
            background: "rgba(11,15,19,0.17)", // subtle dark glass
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
          }}
    >
      <div className="grid md:grid-cols-3 gap-8 items-start z-7 px-[13%]">
        <div className="md:col-span-2">
          <h2
            ref={h2Ref}
            className="about-title text-5xl md:text-7xl mb-7"
          >
            I build fast, modern, and delightful web apps end-to-end.
          </h2>
          <p
            ref={paraRef}
            className="about-para text-2xl leading-relaxed opacity-90"
          >
            I'm Soumadip Dhara, a full-stack web developer specializing in React,
            Node.js, and performant UX. I focus on robust architecture, smooth
            motion, and pixel-perfect execution backed by scalable APIs and
            databases. 
          </p>
        </div>
        <div className="relative flex-col items-center ">
          {/* <CircularText
            text="WEB*AI-ML-DL-LLM*OPS*"
            onHover="speedUp"
            spinDuration={17}
            className="custom-class"
            style={{position:"absolute"}}
          /> */}

          <img src="./image.png" alt="" className="rounded-[37px] "/>
        </div>
      </div>
    </section>
  );
}