import { useLayoutEffect, useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import LaserFlow from "./galaxy-canvas"
import TextPressure from "@/bits/TextPressure"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const root = useRef(null)
  const beamWrapRef = useRef(null)

  // Hero text animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(
        ".hero-title",
        { y: -70, opacity: 0, filter: "blur(57px)",delay:0.27 },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.57, ease: "power3.out", scrub:1.7 }
      )
        .fromTo(
          ".hero-sub",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.97, ease: "back.inout(5.7)" },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(5.7)" },
          "-=0.3"
        )
    }, root)

    return () => ctx.revert()
  }, [])

  
  // 🔑 FORCE CANVAS RESIZE AFTER LAYOUT
  useEffect(() => {
    const forceResize = () => {
      window.dispatchEvent(new Event("resize"))
    }

    // First layout
    forceResize()

    // After browser settles
    const t = setTimeout(forceResize, 120)

    return () => clearTimeout(t)
  }, [])

  return (
    <section
      ref={root}
      className=" relative min-h-screen overflow-hidden"
    >

      <div
        className="fixed inset-0 z-[1]"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/16052074/pexels-photo-16052074.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
    />


      {/* Beam container — NOT fixed, NOT zero-sized */}
      <div
        ref={beamWrapRef}
        className="fixed inset-0 z-2 pointer-events-none"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <LaserFlow
          verticalSizing={2.6}
          horizontalSizing={0.57}
          verticalBeamOffset={-0.5}
          fogScale={0.17}
          fogIntensity={1.1}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 md:py-56 ">
        <p
          className="mb-4 text-sm tracking-widest uppercase hero-p"
          style={{ color: "beige" }}
        >
          Full Stack Web Developer 
        </p>

        <h1
          className="hero-title text-4xl md:text-6xl font-semibold leading-tight text-balance"
          style={{ color: "#F5EFE6" }}
        >
          <div style={{position: 'relative', height: '200px' ,background:''}}>
              <TextPressure
                text="Soumadip Dhara"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#a351d4"
                minFontSize={36}
              />
            </div>
        </h1>

        <p
          className="hero-sub mt-4 max-w-2xl opacity-90 "
          style={{ color: "beige" }}
        >
          Crafting futuristic experiences with React, Node.js, and 3D motion. I
          merge performance, accessibility, and striking visuals into seamless
          products.
        </p>

        <div className="hero-cta mt-8 flex items-center gap-4  ">
          <a
            href="#projects"
            className="px-5 py-3 rounded-md"
            style={{
              background: "#C0D0DE",
              color: "#0b0f13",
              boxShadow: "0 0 24px #00F5FF66, 0 0 7px #00F5FF33",
            }}
          >
            View Projects
          </a>

          <a
            href="#journey"
            className="px-5 py-3 rounded-md border font-medium"
            style={{
              borderColor: "rgba(230,241,255,0.15)",
              background:
                "linear-gradient(180deg, #10151B 0%, rgba(16,21,27,0.6) 100%)",
            }}
          >
            My Journey
          </a>
        </div>
      </div>
    </section>
  )
}
