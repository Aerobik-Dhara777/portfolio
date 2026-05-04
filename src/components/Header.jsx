"use client";
import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import Button from "./Button";
import RollingText from "./RollingText";

export default function Header() {
  const menuRef = useRef(null);
  const pathRef = useRef(null);
  const linksRef = useRef([]);
  const buttonRef = useRef(null);
  const isAnimating = useRef(false);
  const [open, setOpen] = useState(false);

  const paths = {
    close: `M-18 758.717V11.5C-18 3.76801 -11.732 -2.5 -4.00004 -2.5H1924C1931.73 -2.5 1938 3.768 1938 11.5V758.665C1938 761.444 1937.15 764.111 1935.65 766.361C1933.43 769.699 1929.12 769.811 1925.39 768.27C1923.93 767.666 1922.46 766.99 1920.91 766.64C1216.58 606.849 789.299 607.56 -1.2239 767.202C-2.68919 767.497 -4.10926 768.088 -5.50815 768.615C-9.15243 769.988 -13.3045 769.812 -15.5021 766.633C-17.0887 764.338 -18 761.586 -18 758.717Z`,
    open: `M-18 758.717V11.5C-18 3.76801 -11.732 -2.5 -4.00004 -2.5H1924C1931.73 -2.5 1938 3.768 1938 11.5V758.665C1938 761.444 1937.15 764.111 1935.65 766.361C1934 768.852 1931.17 769.546 1928.3 769.098C1924.85 768.561 1921.31 767.528 1917.88 768.141C1212.55 894.154 785.537 902.189 1.54715 768.511C-1.6514 767.966 -4.96475 768.843 -8.17512 769.314C-11.0259 769.732 -13.8298 769.052 -15.5021 766.633C-17.0887 764.338 -18 761.586 -18 758.717Z`,
  };

  useLayoutEffect(() => {
    gsap.set(menuRef.current, { y: "-150vh", pointerEvents: "none" });
    gsap.set([...linksRef.current, buttonRef.current], {
      y: 57,
      opacity: 0,
      
      delay: "1.07",
      
      ease:"power4.out"
    });
  }, []);

  const openMenu = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    document.body.style.overflow = "hidden";
    gsap.set(menuRef.current, { pointerEvents: "auto" });

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    tl.to(menuRef.current, {
      y: 0,
      duration: 2.17,
      ease: "power3.inOut",
    })
      .to(
        pathRef.current,
        {
          attr: { d: paths.open },
          duration: 0.87,
          ease: "power4.inOut",
        },
        "<"
      )
      .to(
        [...linksRef.current, buttonRef.current],
        {
          y: 0,
          opacity: 1,
          stagger: 0.177,
          duration: 1.07,
          ease: "power3.out",
        },
        "-=0.45"
      );

    setOpen(true);
  };

  const closeMenu = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto";
        gsap.set(menuRef.current, { pointerEvents: "none" });
        isAnimating.current = false;
      },
    });

    tl.to([...linksRef.current, buttonRef.current], {
      y: 57,
      opacity: 0,
      stagger: 0.17,
      duration: 0.37,
      ease: "power2.in",
    })
      .to(
        pathRef.current,
        {
          attr: { d: paths.close },
          duration: 1.17,
          ease: "power4.inOut",
        },
        "-=0.1"
      )
      .to(
        menuRef.current,
        {
          y: "-150vh",
          duration: 0.97,
          ease: "power4.inOut",
        },
        "-=0.77"
      );

    setOpen(false);
  };

  const HamburgerIcon = ({ onClick, label }) => (
    <button
      onClick={onClick}
      className="p-2 cursor-pointer relative z-[70]"
      aria-label={label}
    >
      <svg width="24" height="14" viewBox="0 0 20 8" fill="none">
        <path
          d="M8 1H19M1 7H19"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );

  return (
    <>
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-[40] h-16 md:h-20 border-b border-white/10 bg-black/30 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24">          <a className="text-2xl md:text-3xl tracking-wide text-[#BBDCE5] txt-nav">
            {"<Soumadip Dhara/>"}
          </a>
          <HamburgerIcon onClick={openMenu} label="Open menu" />
        </div>
      </header>

      {/* FULLSCREEN MENU */}
      <div ref={menuRef} className="fixed inset-0 z-[50]">
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{ height: "141vh" }}
        >
          <path ref={pathRef} d={paths.close} fill="#0B0F13" />
        </svg>

        {/* TOP BAR INSIDE MENU */}
        <div className="absolute inset-x-0 top-0 z-[60] h-16 md:h-20">
          <div className="mx-auto flex h-full max-w-8xl items-center justify-between px-4">
            <span className="text-2xl md:text-3xl tracking-wide text-[#BBDCE5]">
              
            </span>
            <HamburgerIcon onClick={closeMenu} label="Close menu" />
          </div>
        </div>


{/* MENU LINKS */}
<div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 text-[#4DFFBE] header-nav">

  {/* LINK 1 */}
  <div ref={(el) => (linksRef.current[0] = el)} className=" overflow-hidden pt-6 md:pt-16">
    <div className="link-inner">
      <a
        href="#projects"
        onClick={closeMenu}
        className="block text-7xl md:text-8xl font-semibold uppercase tracking-wide hover:opacity-60 transition-opacity"
      >
        <RollingText>PROJECTS</RollingText>
      </a>
    </div>
  </div>

  {/* LINK 2 */}
  <div ref={(el) => (linksRef.current[1] = el)} className=" overflow-hidden pt-4 md:pt-6">
    <div className="link-inner">
      <a
        href="#journey"
        onClick={closeMenu}
        className="block text-7xl md:text-8xl font-semibold uppercase tracking-wide hover:opacity-60 transition-opacity"
      >
        <RollingText>JOURNEY</RollingText>
      </a>
    </div>
  </div>

  {/* LINK 3 */}
  <div ref={(el) => (linksRef.current[2] = el)} className=" overflow-hidden pt-4 md:pt-6">
    <div className="link-inner">
      <a
        href="#contact"
        onClick={closeMenu}
        className="block text-7xl md:text-8xl font-semibold uppercase tracking-wide hover:opacity-60 transition-opacity"
      >
        <RollingText>CONTACT</RollingText>
      </a>
    </div>
  </div>

  {/* LINK 4 */}
  <div ref={(el) => (linksRef.current[3] = el)} className=" overflow-hidden pt-4 md:pt-6">
    <div className="link-inner">
      <a
        href="#about"
        onClick={closeMenu}
        className="block text-7xl md:text-8xl font-semibold uppercase tracking-wide hover:opacity-60 transition-opacity"
      >
        <RollingText>ABOUT</RollingText>
      </a>
    </div>
  </div>
{/* 
  <div ref={buttonRef} className="mt-6">
    <Button />
  </div> */}

</div>
      </div>
    </>
  );
}