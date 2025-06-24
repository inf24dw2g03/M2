import { Link } from 'react-router-dom';
import '../css/Home.css';
import zooImage from '../images/zoo.jpg';

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-titulo">Bem-vindo ao Zoológico</h1>

      <div className="button-box">
        <Link to="/Animal" className="nav-button">Animais</Link>
        <Link to="/Funcionario" className="nav-button">Funcionários</Link>
        <Link to="/Jaula" className="nav-button">Jaulas</Link>
      </div>

      <div className="image-container">
        <img src={zooImage} alt="Zoológico" />
      </div>
    </div>
  );
}