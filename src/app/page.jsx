// src/app/page.jsx
"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// import Loader from "../components/Loader";
import Preloader from "../components/Preloader";
import FuturisticCursor from "../components/FuturisticCursor";
import Hero from "../components/hero";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import Journey from "../components/journey";
import Contact from "../components/Contact";

import SmoothScrollProvider from "../components/smooth-scroll-provider";
import Button from "../components/Button";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger, TextPlugin);

export default function Page() {
  const [loading, setLoading] = useState(true);
  const nameRef = useRef(null);
  const scrambleRef = useRef(null);
  const headerRef = useRef(null);



  // scramble animation: only run after loader finishes
  useEffect(() => {
    if (loading) return;
    if (!nameRef.current || !scrambleRef.current) return;

    gsap.fromTo(
      scrambleRef.current,
      { scrambleText: { text: "", chars: "01", revealDelay: 0.3 } },
      {
        scrambleText: {
          text: "Soumadip Dhara",
          chars: "0X#",
          speed: 1.07,
          
        },
        duration: 3,
        ease: "power2.out",
        delay: 0.6,
      }
    );
  }, [loading]);

  useLayoutEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-links a",
        { y: -47, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          delay: 1.5,
        }
      );


    }, headerRef);

    return () => ctx.revert();
  }, [loading]);

  // if (loading) {
  //   return (
  //     <div className="fade-loader">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
  <>
    {loading && <Preloader onComplete={() => setLoading(false)} />}

    <SmoothScrollProvider>
      <main
        style={{
          "--brand": "#00F5FF",
          "--accent": "#FF008C",
          "--bg": "#101828",
          "--muted": "#10151B",
          "--fg": "#E6F1FF",
        }}
        className="relative min-h-screen bg-[var(--bg)] text-[var(--fg)] font-sans antialiased overflow-hidden"
        id="main-content"
      >
       
        <FuturisticCursor />

        

        {/* ====== FIXED GLASS HEADER ====== */}
        <header
          ref={headerRef}
          className="fixed top-0 left-0 w-full h-16 md:h-20 z-50 border-b border-white/6 backdrop-blur-lg"
          style={{
            
            background: "rgba(11,15,19,0.22)", // subtle dark glass
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between h-full">
            {/* Animated scramble name */}
          <a
            href="#"
            ref={nameRef}
            className="text-3xl tracking-wide inline-block leading-none font-veltania"
            style={{ color: "#BBDCE5", willChange: "transform, opacity, text-shadow" }}
            aria-label="Soumadip Dhara home"
          >
            {"<"}
            <span ref={scrambleRef}>Soumadip Dhara</span>
            {"/>"}
          </a>

            <nav className="hidden md:flex items-center gap-6 text-[17px] nav-links">
              <a className="opacity-90 hover:opacity-100 transition-opacity" href="#projects">
                PROJECTS 
              </a>
              <a className="opacity-90 hover:opacity-100 transition-opacity" href="#journey">
                JOURNEY
              </a>
              <a className="opacity-90 hover:opacity-100 transition-opacity" href="#contact">
                CONTACT 
              </a>
            </nav>

            <Button />
          </div>
        </header>

        {/* Hero */}
        <Hero />

        {/* Sections */}
        <AboutSection />
        <ProjectsSection />
        <Journey />

        {/* Contact */}
        <Contact />
        
        {/* Footer */}
        <footer
          className="py-8 text-center text-sm opacity-70"
          style={{ borderTop: "1px solid rgba(230,241,255,0.1)" }}
        >
          © {new Date().getFullYear()} Soumadip Dhara. All rights reserved.
        </footer>
      </main>
      
    </SmoothScrollProvider>
  </>
  );
}
