import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
// import SplashCursor from "../bits/SplashCursor"



export default function FuturisticCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const idleTimeout = useRef(null)

  // Target positions
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dotEl = dotRef.current
    const ringEl = ringRef.current

    if (!dotEl || !ringEl) return

    const fadeIn = () => gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.3, ease: "power3.out" })
    const fadeOut = () => gsap.to([dotEl, ringEl], { opacity: 0, duration: 0.5, ease: "power3.out" })

    const resetIdle = () => {
      fadeIn()
      if (idleTimeout.current) clearTimeout(idleTimeout.current)
      idleTimeout.current = setTimeout(fadeOut, 2000)
    }

    const onMouseMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      resetIdle()
    }

    const onMouseDown = () => gsap.to([dotEl, ringEl], { scale: 0.8, duration: 0.2, ease: "power3.out" })
    const onMouseUp = () => gsap.to([dotEl, ringEl], { scale: 1, duration: 0.3, ease: "power3.out" })

    const onHoverIn = (e) => {
      const el = e.target
      if (el.tagName === "A" || el.tagName === "BUTTON" || el.classList.contains("cursor-hover")) {
        gsap.to(ringEl, { scale: 1.5, borderColor: "#00fff5", duration: 0.3, ease: "power3.out" })
      }
    }

    const onHoverOut = () => {
      gsap.to(ringEl, { scale: 1, borderColor: "rgba(0,255,255,0.6)", duration: 0.3, ease: "power3.out" })
    }

    // Smooth animation loop
    const animate = () => {
      // Dot sticks directly
      gsap.set(dotEl, { x: pos.current.x, y: pos.current.y })

      // Ring lerp / smooth follow
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15
      gsap.set(ringEl, { x: ringPos.current.x, y: ringPos.current.y })

      requestAnimationFrame(animate)
    }
    animate()

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseover", onHoverIn)
    document.addEventListener("mouseout", onHoverOut)

    // Initial idle
    resetIdle()

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseover", onHoverIn)
      document.removeEventListener("mouseout", onHoverOut)
      if (idleTimeout.current) clearTimeout(idleTimeout.current)
    }
  }, [])

  return (
    <>
    {/* <SplashCursor /> */}
      {/* Ring (glowing, smooth trailing) */}
      <div
        ref={ringRef}
        className="fixed w-8 h-8 border border-cyan-400/60 rounded-full pointer-events-none z-[9999]
                   shadow-[0_0_15px_#00fff580] backdrop-blur-[3px] translate-x-[-50%] translate-y-[-50%] opacity-100"
      />

      {/* Dot (precise, fast) */}
      <div
        ref={dotRef}
        className="fixed w-2.5 h-2.5 bg-cyan-300 rounded-full pointer-events-none z-[10000]
                   shadow-[0_0_6px_#00fff580] translate-x-[-50%] translate-y-[-50%] opacity-100"
      />
    </>
  )
}
