"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import GlowCard from "./glow-card";

gsap.registerPlugin(ScrollTrigger, SplitText);

const ProjectsSection = () => {
  const mainRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const topH1Ref = useRef(null);
  const bottomH1Ref = useRef(null);
  const loveRef = useRef(null);

    useEffect(() => {
    // GSAP Timeline Animation
    const tl = gsap.timeline({
      scrollTrigger: {
       // trigger: mainRef.current, //!not working so comment out for seeing the previous effect(comming from the bottom of the screen)
       
       // markers: true,
        start: "38% 50%",
        end: "100% 50%",
        scrub: 2,
        pin: true
      }
    });

    tl.to(".text", {
      top: "-7%",
    }, 'a')
    .to("#card-one", {
      top: "35%",
    }, 'a')
    .to("#card-two", {
      top: "130%"
    }, 'a')
    .to("#card-two", {
      top: "42%"
    }, 'b')
    .to("#card-one", {
      width: "65%",
      height: "65vh"
    }, 'b')
    .to("#card-three", {
      top: "130%"
    }, 'b')
    .to("#card-three", {
      top: "50%"
    }, 'c')
    .to("#card-two", {
      width: "70%",
      height: "70vh"
    }, 'c');

    // Cleanup function to kill ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current, 
        // markers: true,
        start: "50% 50%",
        end: "177% 100%",
        scrub: 2,
        pin: true
      }
    });

    tl
      .to(topRef.current, {
        top: "-50%"
      }, 'a')
      .to(bottomRef.current, {
        bottom: "-50%"
      }, 'a')
      .to(topH1Ref.current, {
        y: "107%"
      }, 'a')
      .to(bottomH1Ref.current, {
        y: "-27%"
      }, 'a')
      .to(loveRef.current, {
        marginTop: '0%',
        delay: '-0.2'
      }, 'a');

    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);

  return (
    <>
      <style >{`
        .top-h1-custom {
          position: absolute;
          top: 83.7%;
          left: 50%;
          transform: translate(-50%, 0%);
          white-space: nowrap;
          z-index: 10;
        }

        @media (min-width: 640px) {
          .top-h1-custom {
            top: 50%;
            transform: translate(-50%, 65%);
          }
        }

        .top-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          object-fit: cover;
          object-position: center top;
        }

        .bottom-image {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          object-fit: cover;
          object-position: center bottom;
        }

        @media (min-width: 1024px) {
          .top-image,
          .bottom-image {
            object-fit: cover;
            object-position: center center;
          }
        }
      `}</style>

      <section
        id="projects"
        className="w-full relative z-5"
      >
        <div ref={mainRef} className="w-full h-screen relative " >
          {/* Top Section */}
          <div 
            ref={topRef}
            className="absolute top-[0%] w-full h-[50vh] overflow-hidden z-10"
          >
            {/* Top half of image - showing from top to middle */}
            <img 
              src="https://images.pexels.com/photos/16052069/pexels-photo-16052069.jpeg" 
              alt="" 
              className="top-image"
            />
            <h1 
              ref={topH1Ref}
              className="top-h1-custom text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[7rem] project-h2"
            >
              Selected Projects
            </h1>
          </div>

          {/* Center Section */}
          <div className="relative inset-0 w-full h-screen"
                  // className="max-w-8xl mx-auto py-16 md:py-35 px-4  relative z-5 backdrop-blur-xl"
          //       style={{
            
          //   background: "rgba(11,15,19,0)", // subtle dark glass
          //   WebkitBackdropFilter: "blur(8px)",
          //   boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
          // }}
          >
            <div 
              ref={loveRef}
              className="love absolute mt-[77vh] flex w-full h-full  items-center justify-center "
            >
{/*               
                <div className="cards bg-amber-300 " id="card-one"></div>
                <div className="cards bg-amber-100" id="card-two"></div>
                <div className="cards bg-amber-500" id="card-three"></div> */}
                      <div className="grid md:grid-cols-3 gap-6 mx-47">
        <GlowCard
          title="Realtime Code Editor"
          subtitle="React.js • WebSockets • Tailwind • Socket.io"
          para="An interactive online code editor built with React and WebSockets, enabling multiple users to collaborate in real-time. Currently supports live editing and synchronized updates. Compiler support will be added in the future, making it a full-fledged coding platform."
          href="https://realtime-code-editor-sigma-flax.vercel.app/"
          titleClassName="veltania-font text-xl"
          subtitleClassName="bobbers-font text-sm"
          paraCN="para"
        />
        <GlowCard
          title="Team Portfolio"
          subtitle="Next.js • GSAP • Tailwind • WebGL"
          para="A beautifully animated web portfolio showcasing our team members, their skills, and personal bios. Explore each profile, get to know our journey, and reach out for collaboration opportunities. Designed to merge aesthetics, clarity, and smooth interactions."
          href="https://neuro-genesis-nine.vercel.app/"
          titleClassName="veltania-font text-xl"
          subtitleClassName="bobbers-font text-sm"
          paraCN="para"
        />
        <GlowCard
          title="Realtime Chat App"
          subtitle="React.JS • DaisyUI • GSAP"
          para="A fast, modern chat application built with React and DaisyUI, featuring instant messaging, responsive design, and GSAP-powered animations. Designed for seamless communication and easy project collaboration in real-time."
          href="https://github.com/Aerobik-Dhara777/realtime-chatapp"
          titleClassName="veltania-font text-xl"
          subtitleClassName="bobbers-font text-sm"
          paraCN="para"
        />
      </div>

              
            </div>
          </div>

          {/* Bottom Section */}
          <div 
            ref={bottomRef}
            className="absolute bottom-0 left-0 right-0 w-full h-[50vh] overflow-hidden"
          >
            {/* Bottom half of image - showing from middle to bottom */}
            <img 
              src="https://images.pexels.com/photos/16052069/pexels-photo-16052069.jpeg" 
              alt="" 
              className="bottom-image"
            />
            <h1 
              ref={bottomH1Ref}
              className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[7rem] project-h2 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-10"
            >
              Selected Projects
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;