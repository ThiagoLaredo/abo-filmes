// src/components/Footer.jsx
import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Abó Filmes — Todos os direitos reservados.</p>
    </footer>
  );
}
