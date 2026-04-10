import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaVimeo } from 'react-icons/fa';
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col footer-col-logo"><strong>Abó</strong> Filmes</div>

        <nav className="footer-col footer-menu" aria-label="Menu do rodapé">
          <a href="/#filmes">Filmes</a>
          <Link to="/sobre">Sobre</Link>
          <Link to="/servicos">Serviços</Link>
          <Link to="/fotografia">Fotografia</Link>
          <Link to="/entretenimento">Entretenimento</Link>
          <Link to="/contato">Contato</Link>
        </nav>

      </div>
    </footer>
  );
}