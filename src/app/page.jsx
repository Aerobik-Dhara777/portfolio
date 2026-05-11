// src/app/page.jsx
"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";


import Preloader from "../components/Preloader";
import Header from "../components/Header";
import FuturisticCursor from "../components/FuturisticCursor";
import Hero from "../components/hero";
import AboutSection from "../components/AboutSection";
import Quote from "../components/Quote";
import ProjectsSection from "../components/ProjectsSection";
import Journey from "../components/journey";
import Contact from "../components/Contact";

import SmoothScrollProvider from "../components/smooth-scroll-provider";
import Button from "../components/Button";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger, TextPlugin);

export default function Page() {
  const [loading, setLoading] = useState(true);
  
  const scrambleRef = useRef(null);
  const headerRef = useRef(null);



  // scramble animation: only run after loader finishes
  useEffect(() => {
    if (loading) return;
    // if (!nameRef.current || !scrambleRef.current) return;

    gsap.fromTo(
      scrambleRef.current,
      { scrambleText: { text: "", chars: "01", revealDelay: 0.1 } },
      {
        scrambleText: {
          text: "Soumadip Dhara",
          chars: "0x",
          speed: 0.37,
          
        },
        duration: 3.7,
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

        

       
        <Header/>

        {/* Hero */}
        <Hero startAnimation={!loading} />

        {/* Sections */}
        <Quote/>
        <AboutSection />
        
        {/* <ProjectsSection /> */}
        <Journey />

        Contact
        <Contact />
        
        Footer
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
