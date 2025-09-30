import React, { useEffect } from "react";
import gsap from "gsap";
import "./Hero.css";

export default function Hero() {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animação do vídeo (clipPath + fade in)
    tl.fromTo(
      ".hero-video",
      { clipPath: "inset(100% 0 0 0)", opacity: 0 },
      { clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 1.5 }
    )
      // Overlay entra suavemente junto
      .fromTo(
        ".overlay",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=1"
      )
      // Texto aparece depois do vídeo
      .fromTo(
        ".hero-content h1",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.3"
      )
      // Seta de scroll entra por último
      .to(
        ".scroll-indicator",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          onComplete: () => {
            document.querySelector(".scroll-indicator")?.classList.add("blink");
          },
        },
        "+=0.2"
      );
  }, []);

  return (
    <section
      className="hero"
      aria-label="Seção hero com vídeo de apresentação da Abó Filmes"
    >
      {/* Vídeo otimizado e autoplay garantido */}
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/abo_reels_poster.webp"
      >
        <source src="/abo_reels.webm" type="video/webm" />
        <source src="/abo_reels.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>

      {/* Overlay */}
      <div className="overlay" aria-hidden="true"></div>

      {/* Texto hero */}
      <div className="hero-content">
        <h1>Abó Filmes</h1>
      </div>

      {/* Scroll indicator com acessibilidade */}
      <a
        href="#videos"
        className="scroll-indicator"
        aria-label="Ir para a seção de vídeos"
      >
        ↓
      </a>
    </section>
  );
}
