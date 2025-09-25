// src/components/Footer.jsx
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";

export default function Footer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".footer p",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer",
          start: "top 90%", // começa quando o footer estiver 80% visível
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Abó Filmes — Todos os direitos reservados.
      </p>
    </footer>
  );
}