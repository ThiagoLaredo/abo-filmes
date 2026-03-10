import React, { useEffect, useState } from "react";
import gsap from "gsap";
import "./Hero.css";
import VideoModal from "./VideoModal";

export default function Hero() {
  const [isReelModalOpen, setIsReelModalOpen] = useState(false);

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
        ".hero-play-badge",
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1 },
        "-=0.3"
      )
      // Seta de scroll entra por último
      .to(
        ".scroll-indicator",
        {
          opacity: 1,
          y: 0,
          duration: 0.8
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
        <button
          className="hero-play-badge"
          aria-label="Assista o Vídeo"
          type="button"
          onClick={() => setIsReelModalOpen(true)}
        >
          <svg
            className="hero-circular-text"
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <path
                id="heroCirclePath"
                d="M 110,110 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
              />
            </defs>
            <text>
              <textPath href="#heroCirclePath" startOffset="0%">
                Assista o Vídeo • Assista o Vídeo • Assista o Vídeo •
              </textPath>
            </text>
          </svg>

          <span className="hero-play-core" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="hero-play-icon" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 6.5L18 12L8 17.5V6.5Z" fill="currentColor" />
            </svg>
          </span>
        </button>
      </div>

      <VideoModal
        videoSrc="/abo_reels.mp4"
        isOpen={isReelModalOpen}
        onClose={() => setIsReelModalOpen(false)}
      />

      {/* Scroll indicator com acessibilidade */}
      <a
        href="#videos"
        className="scroll-indicator"
        aria-label="Ir para a seção de vídeos"
      >
        <svg
          width="24"
          height="36"
          viewBox="0 0 24 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mouse-icon"
        >
          <rect
            x="1"
            y="1"
            width="22"
            height="34"
            rx="11"
            ry="11"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="12"
            cy="10"
            r="2"
            fill="white"
            className="mouse-wheel"
          />
        </svg>
      </a>
    </section>
  );
}
