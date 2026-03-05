import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from "./components/Hero";
import MovieGrid from "./components/MovieGrid";
import MoviePage from "./components/MoviePage";
import Footer from "./components/Footer";
import SideHeader from "./components/SideHeader";

function App() {
  return (
    <Router>
      <SideHeader />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <MovieGrid />
            <Footer />
          </>
        } />
        <Route path="/filme/:id" element={<MoviePage />} />
      </Routes>
    </Router>
  );
}

export default App;
