// src/components/Hero.jsx
import React from "react";
import "./Hero.css";

export default function Hero() {
  const handleScrollDown = () => {
    const el = document.getElementById("videos");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="hero" aria-label="Hero Abó Filmes">
      {/* Vídeo de fundo */}
      <video
        className="hero-video"
        src="/abo_reels.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay escuro */}
      <div className="overlay" />

      {/* Conteúdo central */}
      <div className="hero-content">
        <h1>Abó Filmes</h1>
      </div>

      {/* Seta no bottom */}
      <button
        className="scroll-indicator"
        onClick={handleScrollDown}
        aria-label="Ir para vídeos"
      >
        ↓
      </button>
    </section>
  );
}
