import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Card from "./Messege-letter";

// 🎨 Styled Canvas
const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
`;

// 🎨 Contact Box
const Container = styled.div`
  position: relative;
  width: 90%;
  max-width: 460px;
  padding: 30px 25px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  text-align: center;
  z-index: 2;
  box-shadow: 0 0 60px rgba(0, 221, 235, 0.4),
    0 0 120px rgba(175, 64, 255, 0.25);

  h2 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }

  input,
  textarea {
    width: 100%;
    padding: 14px 18px;
    margin: 10px 0;
    border: none;
    outline: none;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.15);
    transition: all 0.3s ease;
    font-size: 0.95em;
    color: white;
  }

  input:focus,
  textarea:focus {
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 0 12px #00ddeb;
  }

  button {
    width: 100%;
    padding: 14px;
    margin-top: 15px;
    border: none;
    border-radius: 50px;
    background: linear-gradient(135deg, #af40ff, #5b42f3 40%, #00ddeb);
    color: white;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: 0.4s;
  }

  button:hover {
    transform: translate(-3px);
    box-shadow: 0 6px 20px rgba(0, 221, 235, 0.7);
  }

  @media (max-width: 768px) {
    padding: 25px 15px;
    h2 {
      font-size: 1.3rem;
    }
    input,
    textarea {
      font-size: 0.9em;
    }
    button {
      font-size: 0.95em;
    }
  }
`;

const Contact = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    class Wave {
      constructor(color, baseRadius, amplitude, frequency, speed) {
        this.color = color;
        this.baseRadius = baseRadius;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
      }
      draw(time) {
        ctx.beginPath();
        for (let angle = 0; angle <= Math.PI * 2 + 0.05; angle += 0.05) {
          const offset =
            this.amplitude * Math.sin(angle * this.frequency + time * this.speed);
          const x = w / 2 + (this.baseRadius + offset) * Math.cos(angle);
          const y = h / 2 + (this.baseRadius + offset) * Math.sin(angle);
          if (angle === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3.5;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.stroke();
      }
    }

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        const colors = ["#ffffff", "#00ffff", "#ff0080", "#ff8c00"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
      }
    }

    const waves = [
      new Wave("#ff0080", 77, 25, 6, 2.0),
      new Wave("#00ffff", 200, 20, 5, 1.5),
      new Wave("#ff8c00", 307, 30, 4, 1.0),
      new Wave("#6500ff", 407, 35, 3, 0.8),
      new Wave("#FF0B55", 517, 35, 3, 0.4),
      new Wave("#FFEA20", 697, 35, 3, 0.2),
    ];

    const particles = Array.from({ length: 80 }, () => new Particle());

    function animate(time) {
      ctx.clearRect(0, 0, w, h);
      const t = time * 0.002;
      waves.forEach((wave) => wave.draw(t));
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate(0);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-screen flex justify-center items-center bg-[#0d0d0d] overflow-hidden px-4 md:px-0">
      <Canvas ref={canvasRef} />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center  justify-center z-10 w-full max-w-6xl">
        <Container>
          <h2 className="contact-h2">Get in Touch</h2>
          <input type="text" placeholder="What is your name ??" id="contact-input"/>
          <input type="email" placeholder="Set your email..." id="contact-input"/>
          <textarea id="textarea" placeholder="Your message..." style={{ minHeight: "120px" }} />
          <button>Send Message</button>
        </Container>

  <div className="flex justify-center w-full lg:w-auto">
    <div className="scale-[0.75] sm:scale-90 lg:scale-100">
      <Card />
    </div>
  </div>
      </div>
    </div>
  );
};

export default Contact;
