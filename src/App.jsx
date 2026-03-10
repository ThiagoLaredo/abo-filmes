import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from "./components/Hero";
import MovieGrid from "./components/MovieGrid";
import Brands from "./components/Brands";
import MoviePage from "./components/MoviePage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import LabCriativoPage from "./components/LabCriativoPage";
import Footer from "./components/Footer";
import SideHeader from "./components/SideHeader";
import SiteLogo from "./components/SiteLogo";

function App() {
  return (
    <Router>
      <SiteLogo />
      <SideHeader />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <MovieGrid />
            <Brands />
          </>
        } />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/manifesto" element={<AboutPage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/labcriativo" element={<LabCriativoPage />} />
        <Route path="/filme/:id" element={<MoviePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
