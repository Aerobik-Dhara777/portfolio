import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const ProjectHoverSection = ({
  projects,
  thumbnailWidth = 250,
  thumbnailHeight = 300,
}) => {
  const containerRef = useRef(null);
  const thumbnailRef = useRef(null);
  const sliderRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(true);
  const [modal, setModal] = useState({ active: false, index: 0 });

  // Desktop detection
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Mouse follow logic
useEffect(() => {
  if (!isDesktop) return;
  if (!thumbnailRef.current || !containerRef.current) return;

  const thumb = thumbnailRef.current;
  const container = containerRef.current;

  gsap.set(thumb, {
    scale: 0,
    opacity: 0,
    xPercent: -50,
    yPercent: -50,
    visibility: "hidden",
  });

  const xTo = gsap.quickTo(thumb, "x", {
    duration: 0.3,
    ease: "power2.out",
  });

  const yTo = gsap.quickTo(thumb, "y", {
    duration: 0.3,
    ease: "power2.out",
  });

  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    xTo(x);
    yTo(y);
  };

  container.addEventListener("mousemove", handleMouseMove);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
  };
}, [isDesktop]);

  // Hover animation logic
useEffect(() => {
  if (!isDesktop) return;
  if (!thumbnailRef.current || !sliderRef.current) return;

  const thumb = thumbnailRef.current;
  const slider = sliderRef.current;

  if (modal.active) {
    gsap.killTweensOf(thumb);
    gsap.killTweensOf(slider);

    gsap.set(thumb, { visibility: "visible" });

    gsap.to(thumb, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(slider, {
      y: -modal.index * thumbnailHeight,
      duration: 0.3,
      ease: "power2.out",
    });
  } else {
    gsap.to(thumb, {
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(thumb, { visibility: "hidden" });
      },
    });
  }
}, [modal, isDesktop]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col w-full max-w-[1000px] mx-auto py-12"
      onMouseLeave={() => setModal({ active: false, index: 0 })}
    >
      {/* Project List */}
      {projects.map((project, index) => (
        <div
          key={index}
          onMouseEnter={() => setModal({ active: true, index })}
          className="flex justify-between items-center py-10 border-t border-white/20 cursor-pointer"
        >
          <h2 className="text-4xl text-white">{project.title}</h2>
          <p className="text-white/70">{project.subtitle}</p>
        </div>
      ))}

      {/* Floating Thumbnail */}
      <div
        ref={thumbnailRef}
        className="absolute top-0 left-0 z-50 overflow-hidden rounded-lg border border-white/20 shadow-2xl"
        style={{
          width: thumbnailWidth,
          height: thumbnailHeight,
          pointerEvents: "none",
        }}
      >
        <div
          ref={sliderRef}
          style={{
            position: "relative",
            height: thumbnailHeight * projects.length,
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                top: index * thumbnailHeight,
                width: thumbnailWidth,
                height: thumbnailHeight,
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectHoverSection;





























// import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
// import { gsap } from "gsap";
// import clsx from "clsx";

// const ProjectHoverSection = ({
//   projects,
//   className,
//   thumbnailWidth = 250,
//   thumbnailHeight = 300,
// }) => {
//   const containerRef = useRef(null);
//   const thumbnailRef = useRef(null);
//   const sliderRef = useRef(null);

//   const [isDesktop, setIsDesktop] = useState(true);
//   const [expandedIndex, setExpandedIndex] = useState(null);
//   const [modal, setModal] = useState({ active: false, index: 0 });

//   // Detect desktop
//   useEffect(() => {
//     const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
//     checkDesktop();
//     window.addEventListener("resize", checkDesktop);
//     return () => window.removeEventListener("resize", checkDesktop);
//   }, []);

//   // Mouse Follow Logic
//   useLayoutEffect(() => {
//     if (!isDesktop || !thumbnailRef.current || !sliderRef.current || !containerRef.current)
//       return;

//     gsap.set(thumbnailRef.current, {
//       scale: 0,
//       xPercent: -50,
//       yPercent: -50,
//       force3D: true,
//     });

//     const xTo = gsap.quickTo(thumbnailRef.current, "x", {
//       duration: 0.5,
//       ease: "power3.out",
//     });

//     const yTo = gsap.quickTo(thumbnailRef.current, "y", {
//       duration: 0.5,
//       ease: "power3.out",
//     });

//     let hasPosition = false;

//     const handleMouseMove = (e) => {
//       const rect = containerRef.current.getBoundingClientRect();
//       const relX = e.clientX - rect.left;
//       const relY = e.clientY - rect.top;

//       if (!hasPosition) {
//         gsap.set(thumbnailRef.current, { x: relX, y: relY });
//         hasPosition = true;
//       } else {
//         xTo(relX);
//         yTo(relY);
//       }
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, [isDesktop]);

//   // Modal Animation
//   useLayoutEffect(() => {
//     if (!isDesktop || !thumbnailRef.current || !sliderRef.current) return;

//     if (modal.active) {
//       gsap.to(thumbnailRef.current, {
//         scale: 1,
//         opacity: 1,
//         visibility: "visible",
//         duration: 0.4,
//         ease: "power2.out",
//       });

//       gsap.to(sliderRef.current, {
//         y: -modal.index * thumbnailHeight,
//         duration: 0.4,
//         ease: "power2.out",
//       });
//     } else {
//       gsap.to(thumbnailRef.current, {
//         scale: 0,
//         opacity: 0,
//         duration: 0.3,
//         ease: "power2.in",
//         onComplete: () => {
//           gsap.set(thumbnailRef.current, { visibility: "hidden" });
//         },
//       });
//     }
//   }, [modal, isDesktop, thumbnailHeight]);

//   return (
//     <div
//       ref={containerRef}
//       onMouseLeave={() => setModal({ active: false, index: 0 })}
//       className={clsx(
//         "relative flex flex-col w-full max-w-[1000px] mx-auto py-12",
//         className
//       )}
//     >
//       <div className="flex flex-col w-full">
//         {projects.map((project, index) => (
//           <div
//             key={index}
//             onMouseEnter={() => setModal({ active: true, index })}
//             className="w-full flex items-center justify-between px-6 py-8 border-t border-white/20 cursor-pointer"
//           >
//             <h2 className="text-2xl font-medium text-white">
//               {project.title}
//             </h2>
//             <p className="text-sm text-white/70">
//               {project.subtitle}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div
//         ref={thumbnailRef}
//         className="absolute top-0 left-0 z-50 overflow-hidden rounded-lg border border-white/20 shadow-2xl"
//         style={{
//           width: thumbnailWidth,
//           height: thumbnailHeight,
//           pointerEvents: "none",
//           opacity: 0,
//           visibility: "hidden",
//         }}
//       >
//         <div
//           ref={sliderRef}
//           className="relative w-full"
//           style={{ height: thumbnailHeight * projects.length }}
//         >
//           {projects.map((project, index) => (
//             <div
//               key={index}
//               className="absolute left-0 w-full"
//               style={{
//                 top: index * thumbnailHeight,
//                 height: thumbnailHeight,
//               }}
//             >
//               <img
//                 src={project.image}
//                 alt={project.alt || project.title}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectHoverSection;










