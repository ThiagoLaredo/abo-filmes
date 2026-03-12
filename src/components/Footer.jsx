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
          <Link to="/contato">Contato</Link>
          <Link to="/still">Still</Link>
        </nav>

        {/* <div className="footer-col footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" aria-label="Vimeo"><FaVimeo /></a>
        </div> */}
      </div>
    </footer>
  );
}