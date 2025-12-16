

import { useRef } from "react"
import gsap from "gsap"

export default function GlowCard({ title, subtitle, para, href = "#", titleClassName, subtitleClassName, paraCN }) {
  const cardRef = useRef(null)

  function onMove(e) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = (y / rect.height - 0.5) * -6
    const ry = (x / rect.width - 0.5) * 6
    el.style.setProperty("--x", `${x}px`)
    el.style.setProperty("--y", `${y}px`)
    gsap.to(el, { rotateX: rx, rotateY: ry, transformPerspective: 800, duration: 0.3, ease: "power2.out" })
  }
  function onLeave() {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" })
  }

  return (
    <a
      ref={cardRef}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group rounded-xl px-11 py-11 border relative overflow-hidden"
      style={{
        borderColor: "rgba(230,241,255,0.1)",
        background: "linear-gradient(180deg, #10151B 0%, rgba(16,21,27,0.77) 100%)",
        boxShadow: "0 0 27px 3px #2afabf inset",
        
        transformStyle: "preserve-3d",
      }}
    >
      {/* <div
        className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity "
        style={{
          background:
            "radial-gradient(120px 120px at var(--x,50%) var(--y,50%), rgba(0,245,255,0.25), transparent 60%)",
          filter: "blur(17000px)",
        }}
      /> */}
      <h3 className={titleClassName}>{title}</h3>
      <p className={subtitleClassName}>{subtitle}</p>
      <br />
      <p className={paraCN}>{para}</p>

      <div
        className="mt-4 text-sm font-medium flex items-center gap-2"
        style={{ color: "#2afabf" }}
      >
        <span className="view-project">View Project</span>
        <img src="/right-arrow (5).png" alt="" className="w-7 h-7" />
      </div>

    </a>
  )
}
