import '../css/AnimalCard.css';
import jaulaI from '../images/jaula.png';

export function JaulaCard({ jaula }) {
  return (
    <div className="animal-card">
      <div className="animal-poster">
        <img src={jaulaI} alt={jaula.name} />
        <div className="animal-overlay"></div>
      </div>
      <div className="animal-info">
        <h3>{jaula.localizacao}</h3>
        <p><strong>Tamanho:</strong> {jaula.tamanho}</p>
        <p><strong>Funcionário ID:</strong> {jaula.funcionarioId}</p>
      </div>
    </div>
  );
}