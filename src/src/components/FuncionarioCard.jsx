import '../css/AnimalCard.css';
import funcionarioI from '../images/funcionario.png';

export function FuncionarioCard({ funcionario, onDelete, isAdmin }) {
  return (
    <div className="animal-card">
      <div className="animal-poster">
        <img src={funcionarioI} alt={funcionario.name} />
        <div className="animal-overlay"></div>
      </div>
      <div className="animal-info">
        <h3>{funcionario.name}</h3>
        <p><strong>Cargo:</strong> {funcionario.cargo}</p>
        <p><strong>Salário:</strong> {funcionario.salario} €</p>
        <p><strong>Data Contrato:</strong> {funcionario.datacontrato}</p>
      </div>
      <div>
        {isAdmin && (<button onClick={onDelete} style={{ color: "red" }}>Apagar</button>)}
      </div>
    </div>
  );
}