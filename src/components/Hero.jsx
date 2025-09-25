import React, { useEffect } from "react";
import gsap from "gsap";
import "./Hero.css";

export default function Hero() {
  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Animação do vídeo (abre com clipPath)
    tl.fromTo(
      ".hero-video",
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.5,
        ease: "power3.out",
      }
    );

    // 2. Overlay entra suavemente junto
    tl.fromTo(
      ".overlay",
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" },
      "-=1" // começa junto do vídeo
    );

    // 3. Texto aparece depois do vídeo
    tl.fromTo(
      ".hero-content h1",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.3" // um pouco antes do fim do overlay
    );

    // 4. Seta entra por último
    tl.to(
      ".scroll-indicator",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          document.querySelector(".scroll-indicator").classList.add("blink");
        }
      },
      "+=0.2"
    );

  }, []);

  return (
    <section className="hero">
      <video
        className="hero-video"
        src="/abo_reels.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="overlay"></div>
      <div className="hero-content">
        <h1>Abó Filmes</h1>
      </div>
      <a href="#videos" className="scroll-indicator">↓</a>
    </section>
  );
}
