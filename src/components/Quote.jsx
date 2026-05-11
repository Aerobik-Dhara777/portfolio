"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";



gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Quote() {
  const aboutRef = useRef(null);
  const paraRef = useRef(null);



useLayoutEffect(() => {
  let split;

  const ctx = gsap.context(() => {
    const el = paraRef.current;
    if (!el) return;

    // 1️⃣ Split into characters
    split = SplitText.create(el, {
      type: "chars",
      charsClass: "char"
    });

    // 2️⃣ Wrap each char in its own mask
    split.chars.forEach((char) => {
      const wrapper = document.createElement("div");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";

      char.parentNode.insertBefore(wrapper, char);
      wrapper.appendChild(char);
    });

    // 3️⃣ Initial state (hidden left)
    gsap.set(split.chars, {
      display: "inline-block",
      xPercent: -120
    });

    // 4️⃣ Master timeline (THIS CONTROLS EVERYTHING)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top top",
        end: "+=200%",   // 100vh hold + animation space
        scrub: true,
        pin: true,
        anticipatePin: 1
      }
    });

    // 🔹 First 100vh → nothing happens (just hold)
    tl.to({}, { duration: 1 });

    // 🔹 Then animation begins
    tl.to(split.chars, {
      xPercent: 0,
      ease: "power3.out",
      stagger: 0.02,
      duration: 2
    });

  }, aboutRef);

  return () => {
    if (split) split.revert();
    ctx.revert();
  };
}, []);

  return (
<section
  ref={aboutRef}
  id="about"
  className="w-full h-screen relative z-10 backdrop-blur-xl"
  style={{
    background: "rgba(11,15,19,0.17)",
    WebkitBackdropFilter: "blur(8px)",
    boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
  }}
>
  <div className="flex items-center justify-center h-full w-full px-6 sm:px-10 md:px-16">
    
    <div className=" max-w-5xl mx-auto text-center">

      <h2
        ref={paraRef}
        className="
          text-[18px]
          sm:text-[22px]
          md:text-[34px]
          lg:text-[37px]
          font-semibold
          leading-snug
          tracking-wide
          uppercase
          text-white
          about-para
        "
      >
        <span className="block">
          IN CODE AND IN LIFE,
        </span>

        <span className="block flex flex-wrap justify-center">
          <span>I STRIVE</span>
          <span className="
            ml-4
            sm:ml-8
            md:ml-16
            lg:ml-24
          ">
            TO KEEP ONLY
          </span>
        </span>

        <span className="block mt-3 sm:mt-4">
          WHAT MATTERS AND REMOVE THE REST.
        </span>

        <span className="block">
          WHAT STAYS IS STRONGER, CLEARER,
        </span>

        <span className="
          block
          text-right
          sm:pr-6
          md:pr-10
          lg:pr-16
          mt-3
        ">
          AND MORE
        </span>

        <span className="
          block
          text-right
          sm:pr-6
          md:pr-10
          lg:pr-16
        ">
          MEANINGFUL.
        </span>

      </h2>

    </div>
  </div>
</section>
  );
}