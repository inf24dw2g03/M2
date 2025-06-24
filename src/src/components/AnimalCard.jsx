
import '../css/AnimalCard.css';
import animalI from '../images/animal.png';

export function AnimalCard({ animal, onDelete, isAdmin }) {
  return (
    <div className="animal-card">
      <div className="animal-poster">
        <img src={animalI} alt={animal.name} />
        <div className="animal-overlay"></div>
      </div>
      <div className="animal-info">
        <h3>{animal.name}</h3>
        <p><strong>Espécie:</strong> {animal.especie}</p>
        <p><strong>Idade:</strong> {animal.idade} anos</p>
        <p><strong>Jaula:</strong> {animal.jaulaId}</p>
      </div>
      <div>
        {isAdmin && (<button onClick={onDelete} style={{ color: "red" }}>Apagar</button>)}
      </div>
    </div>
  );
}