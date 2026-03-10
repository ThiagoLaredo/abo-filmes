import { Link } from 'react-router-dom';
import './SiteLogo.css';

const SiteLogo = () => {
  return (
    <Link to="/" className="site-logo" aria-label="Ir para a página inicial">
      Abó Filmes
    </Link>
  );
};

export default SiteLogo;
