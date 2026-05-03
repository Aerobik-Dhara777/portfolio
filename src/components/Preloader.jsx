import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline();

    const speed = 1.6; // slightly increased

    const phases = [
      { n2: [2, 3, 4], n3: [1, 5] },
      { n2: [5, 6], n3: [7, 8, 9] },
    ];

    phases.forEach(({ n2, n3 }, index) => {
      const secondDigit = gsap.utils.random(n2);
      const thirdDigit = gsap.utils.random(n3);

      tl.to(".number-2 .number-wrap", {
        duration: speed,
        yPercent: (secondDigit - 1) * -10,
        ease: "power2.out",
      });

      tl.to(
        ".number-3 .number-wrap",
        {
          duration: speed,
          yPercent: (thirdDigit - 1) * -10,
          ease: "power2.out",
        },
        "<"
      );

      tl.to(
        `.pre-welcome .line:nth-child(${index + 1}) p`,
        {
          duration: speed / 2,
          y: 0,
          ease: "power2.out",
          delay: "0.37",
        },
        "<"
      );

      tl.to(
        ".progress-bar",
        {
          duration: speed,
          height: `${secondDigit * 10 + thirdDigit}%`,
          ease: "power2.out",
        },
        "<"
      );
    });

    // Final jump to 100%
    tl.to(
      [".number-2 .number-wrap", ".number-3 .number-wrap"],
      {
        duration: speed,
        yPercent: -90,
        ease: "power2.out",
      }
    );

    tl.to(
      ".progress-bar",
      {
        duration: speed,
        height: "100%",
        ease: "power2.out",
      },
      "<"
    );

    // Show 1 (100%)
    tl.to(".number-1 .number-wrap", {
      duration: speed,
      y: 0,
      ease: "power2.out",
    }, "<");

    // Exit animation
    tl.to(
      [".number-wrap", ".numbers"],
      {
        duration: speed,
        yPercent: -100,
        ease: "power2.inOut",
      }
    )
    .to(
      [".percentage",".progress-bar"],
      {
        duration: speed,
        yPercent: -100,
        ease: "power2.inOut",
      },
      "<"
    )
    .to(
      ".pre-welcome .line p",
      {
        duration: speed / 2,
        yPercent: -100,
        stagger: 0.2,
        ease: "power2.inOut",
      },
      "<"
    )
.to(containerRef.current, {
  duration: 1.4,
  yPercent: -100,
  ease: "power4.inOut", // smoother cinematic curve
  onComplete: () => {
    if (onComplete) onComplete();
  },
});

  }, containerRef);

  return () => ctx.revert();
}, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-screen bg-black z-[9999] overflow-hidden"
    >
      {/* Progress Bar */}
      <div className="progress-bar absolute bottom-0 right-0 w-[17px] md:w-[17px] h-0 bg-[#5affbd] z-10" />

      {/* Pre Welcome */}
        <div className="pre-welcome absolute top-[45%] left-[10%] md:left-[20%]">

        <div className="line overflow-hidden my-3 h-[70px] md:h-[90px]">
            <p className="translate-y-[107%] text-[#5affbd] text-[48px] md:text-[64px] font-bold leading-[70px] md:leading-[90px]">
            স্বাগতম
            </p>
        </div>

        <div className="line overflow-hidden my-3 h-[50px] md:h-[70px]">
            <p className="translate-y-[120%] text-[#fff] text-[28px] md:text-[40px] font-bold leading-[50px] md:leading-[70px]">
            Welcome
            </p>
        </div>

        </div>


      {/* Numbers */}
<div className="numbers flex items-end absolute bottom-[5%] right-[5%] h-[120px] md:h-[180px] overflow-hidden">

  <div className="number number-1 h-full overflow-hidden">
    <div className="number-wrap translate-y-full flex flex-col">
      <span className="text-[90px] md:text-[140px] font-bold h-[120px] md:h-[180px] leading-[120px] md:leading-[180px] text-[#5affbd]">
        1
      </span>
    </div>
  </div>

  {[2, 3].map((num) => (
    <div key={num} className={`number number-${num} h-full overflow-hidden`}>
      <div className="number-wrap flex flex-col">
        {[1,2,3,4,5,6,7,8,9,0].map((n) => (
          <span
            key={n}
            className="text-[90px] md:text-[140px] font-bold h-[120px] md:h-[180px] leading-[120px] md:leading-[180px] text-[#5affbd]"
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  ))}

  <div className="percentage text-2xl md:text-4xl ml-3 self-start text-[#fff]">
    %
  </div>

</div>
    </div>
  );
}