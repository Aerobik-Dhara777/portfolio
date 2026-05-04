"use client";

export default function RollingText({ children }) {
  const letters = children.split("");

  return (
    <span className="rolling-text">
      <span className="rolling-inner">
        {/* TOP TEXT */}
        <span className="block">
          {letters.map((letter, i) => (
            <span
              key={"top-" + i}
              className="letter"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>

        {/* BOTTOM TEXT */}
        <span className="block">
          {letters.map((letter, i) => (
            <span
              key={"bottom-" + i}
              className="letter"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}