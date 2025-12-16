"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    key: "html",
    label: "HTML & CSS",
    desc: "Learning HTML and CSS was tough at first since I had no programming experience. Gradually, I became familiar with layouts, Flexbox, Grid, colors, fonts, and transitions. Experimenting with designs became enjoyable, and seeing pages come alive gave me confidence. This stage taught patience and persistence, preparing me for more advanced frontend development."
  },
  {
    key: "js",
    label: "JavaScript Basics",
    desc: "JavaScript was harder after HTML and CSS. I learned functions, variables, loops, conditionals, and DOM manipulation. Event handling, closures, and hoisting were tricky at first, but I gradually understood them. Completing scripts and seeing static pages become interactive improved my problem-solving skills and prepared me for modern frontend frameworks."
  },
  {
    key: "sih",
    label: "SIH 2024 Hackathon",
    desc: "SIH 2024 was my first hackathon. I learned teamwork, creativity, and applying technical knowledge under pressure. Working on real-life problems sparked curiosity and motivated me to explore advanced concepts. The experience boosted my confidence in collaboration, research, and delivering practical solutions within deadlines."
  },
  {
    key: "react",
    label: "Frontend Development",
    desc: "I focused on mastering React.js, learning components, hooks, Redux, and API integration. Building dynamic interfaces and organizing scalable code enhanced my understanding of maintainable applications. Practicing responsive, interactive web design and implementing best practices improved both my technical skills and efficiency in building production-ready applications."
  },
  {
    key: "frosthacks",
    label: "FrostHacks Hackathon",
    desc: "FrostHacks was my second hackathon, where I worked on a Library Management System. Applying frontend and backend skills under time pressure taught practical problem-solving, teamwork, and delivering functional solutions. This reinforced my full-stack knowledge and highlighted the value of planning and iterative development."
  },
  {
    key: "node",
    label: "Node.js & Backend",
    desc: "Learning Node.js introduced server-side programming, RESTful APIs, databases, authentication, and authorization. Connecting frontend and backend, handling data flow, and managing asynchronous operations improved my problem-solving skills and strengthened confidence in building real-world full-stack projects."
  },
  {
    key: "advanced-js",
    label: "Advanced JavaScript",
    desc: "Currently, I am mastering advanced JavaScript concepts, including asynchronous behavior, execution context, call stack, event loop, and ES6+ features. Exploring promises, async/await, and closures helps me write efficient and maintainable code, preparing me to build robust, high-performance applications and tackle complex technical challenges."
  },
]









export default function Journey() {
  const rootRef = useRef(null)
  const progressRef = useRef(null)
  const nodeRefs = useRef([])
  const cardRefs = useRef([])
  const connectorRefs = useRef([])

  nodeRefs.current = []
  cardRefs.current = []
  connectorRefs.current = []

  const setNodeRef = (el, i) => (nodeRefs.current[i] = el)
  const setCardRef = (el, i) => (cardRefs.current[i] = el)
  const setConnectorRef = (el, i) => (connectorRefs.current[i] = el)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const root = rootRef.current
      if (!root) return

      // Smooth timeline progress
      ScrollTrigger.create({
        trigger: root,
        start: "top top+=207", // start after 70px
        end: "bottom bottom-=577",
        scrub: 0.3, // smooth
        onUpdate: (self) => {
          gsap.to(progressRef.current, {
            scaleY: self.progress,
            duration: 0.1,
            ease: "power1.out",
            overwrite: true,
          })
        },
      })

      // Activate nodes individually
      nodeRefs.current.forEach((node, i) => {
        const card = cardRefs.current[i]
        const connector = connectorRefs.current[i]

        const activate = () => {
          gsap.to(node, {
            backgroundColor: "#00ddeb",
            boxShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.35)",
            duration: 0.25,
            ease: "power2.out",
          })
          if (connector) {
            gsap.to(connector, {
              "--linkColor": "#00ddeb",
              scaleX: 1,
              duration: 0.35,
              ease: "power2.out",
            })
          }
          gsap.to(card, {
            borderColor: "rgba(230,241,255,0.28)",
            duration: 0.35,
            ease: "power2.out",
          })
        }

        const deactivate = () => {
          gsap.to(node, {
            backgroundColor: "rgba(230,241,255,0.12)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.75,
            ease: "power2.out",
          })
          if (connector) {
            gsap.to(connector, {
              "--linkColor": "rgba(230,241,255,0.18)",
              scaleX: 0,
              duration: 0.3,
              ease: "power2.inOut",
            })
          }
          gsap.to(card, {
            borderColor: "rgba(230,241,255,0.12)",
            duration: 0.35,
            ease: "power2.out",
          })
        }

        ScrollTrigger.create({
          trigger: card,
          start: "top center+=10",
          end: "bottom center-=1",
          onEnter: activate,
          onEnterBack: activate,
          onLeave: deactivate,
          onLeaveBack: deactivate,
        })
      })

      ScrollTrigger.refresh()
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" ref={rootRef} className=" relative w-full bg-[var(--bg)] z-10">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-28">
        <header className="text-center mb-22 md:mb-26">
          <h2 className="journey-h2 z-[7]">My Development Journey</h2>
          <p className="journey-p z-[7] mt-4">
            Scroll down — the timeline fills smoothly as you pass each milestone.
          </p>
        </header>

        {/* TIMELINE LINE */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute left-1/2 top-[307px] -translate-x-1/2 w-[7px] h-full z-[20]"
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(230,241,255,0.12) 0%, rgba(230,241,255,0.05) 100%)",
            }}
          />
          <div
            ref={progressRef}
            className="absolute inset-0"
            style={{
              
   background: 
    `linear-gradient( #00ddeb)`,
              boxShadow: "0 0 24px #00F5FF88, 0 0 64px #00F5FF55",
              transform: "scaleY(0)",
              transformOrigin: "50% 0%",
            }}
          />
        </div>

        {/* TIMELINE CARDS */}
        <div className="flex flex-col gap-10 md:gap-16">
          {STEPS.map((step, i) => {
            const isLeft = i % 2 !== 0
            const sidePadding = isLeft ? "md:pr-[140px]" : "md:pl-[140px]"
            const connectorWidth = 96
            const gradient = isLeft
              ? "linear-gradient(270deg, var(--linkColor) 0%, var(--linkColor) 70%, rgba(0,0,0,0) 100%)"
              : "linear-gradient(90deg, var(--linkColor) 0%, var(--linkColor) 70%, rgba(0,0,0,0) 100%)"

            return (
              <div key={step.key} className="relative md:min-h-[160px]">
                {/* NODE */}
                <span
                  ref={(el) => setNodeRef(el, i)}
                  aria-hidden="true"
                  className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-7 w-7 rounded-full border z-[20]"
                  style={{
                    borderColor: "rgba(230,241,255,0.25)",
                    backgroundColor: "rgba(230,241,255,0.12)",
                  }}
                />
                {/* CONNECTOR */}
                <span
                  ref={(el) => setConnectorRef(el, i)}
                  aria-hidden="true"
                  data-side={isLeft ? "left" : "right"}
                  className={`hidden md:block absolute top-1/2 h-[7px] z-[1] pointer-events-none ${
                    isLeft ? "right-1/2 -translate-y-1/2" : "left-1/2 -translate-y-1/2"
                  }`}
                  style={{
                    width: `${connectorWidth}px`,
                    ["--linkColor"]: "rgba(230,241,255,0.18)",
                    background: gradient,
                    transform: "scaleX(0)",
                  }}
                />

                <div className={`md:grid md:grid-cols-2 md:items-center ${sidePadding}`}>
                  <div className={isLeft ? "" : "md:col-start-2"}>
                    <div className="card-wrapper relative rounded-2xl">
                      <article
                        ref={(el) => setCardRef(el, i)}
                        className="relative z-10 rounded-2xl border p-7 h-77 article-journey"
                        style={{
                          borderColor: "rgba(230,241,255,0.07)",
                          background: "linear-gradient(180deg, #18230F 0%, #111711 100%)",
                          minHeight: "200px",
                          maxHeight: "357px",
                          overflowY: "auto",
                          padding: "1.5rem",
                        }}
                      >
                        <header className="flex items-center justify-between mb-2">
                          <span
                            className="journey-p2 mb-2"
                            style={{ color: "var(--brand)", letterSpacing: "0.2em" }}
                          >
                            journey {i + 1}
                          </span>
                          <span className="h-11 w-11" style={{ color: "var(--accent)" }}>
                            <img src="/statistics.png" alt="" />
                          </span>
                        </header>
                        <h3 className="jouney-h3 mb-2">{step.label}</h3>
                        <p className="journey-p2">{step.desc}</p>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
