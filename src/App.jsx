import "./App.css";
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Hero from "./components/Hero";
import MovieGrid from "./components/MovieGrid";
import Brands from "./components/Brands";
import MoviePage from "./components/MoviePage";
import AboutPage from "./components/AboutPage";
import ServicosPage from "./components/ServicosPage";
import EntretenimentoPage from "./components/EntretenimentoPage";
import ContactPage from "./components/ContactPage";
import StillPage from "./components/StillPage";
import Footer from "./components/Footer";
import SideHeader from "./components/SideHeader";
import SiteLogo from "./components/SiteLogo";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    const targetId = location.hash.replace('#', '');

    const scrollToTarget = () => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    requestAnimationFrame(scrollToTarget);
    const fallbackTimeout = setTimeout(scrollToTarget, 350);

    return () => clearTimeout(fallbackTimeout);
  }, [location.pathname, location.hash]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="app-shell">
        <ScrollToHash />
        <SiteLogo />
        <SideHeader />
        <main className="app-content">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <MovieGrid />
                <Brands />
              </>
            } />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/servicos" element={<ServicosPage />} />
            <Route path="/entretenimento" element={<EntretenimentoPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/still" element={<StillPage />} />
            <Route path="/filmes/:slug" element={<MoviePage />} />
            <Route path="/filme/:id" element={<MoviePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
