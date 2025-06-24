import React, { useState, useEffect } from "react";
import { FuncionarioCard } from "../components/FuncionarioCard";
import '../css/Recursos.css';
import api from "../service/api";
import { Link } from 'react-router-dom';

export default function Funcionario() {
  const [searchQuery, setSearchQuery] = useState("");
  const [funcionarios, setFuncionarios] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');
  const [datacontrato, setDataContrato] = useState('');
  const [user, setUser] = useState(null);
  const isAdmin = user?.cargo?.toLowerCase() === 'admin';



  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/auth/check', { withCredentials: true });
        console.log("Resposta de /auth/check:", res.data);
        setIsAuthenticated(res.data.authenticated);
        setUser(res.data.user);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  

  const fetchFuncionarios = async (search = "") => {
    try {
      const response = await api.get('/Funcionario', {
        params: { search },
        withCredentials: true,
      });
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchFuncionarios();
  }, [isAuthenticated]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      fetchFuncionarios(searchQuery);
    }
  };

  const handleCreateFuncionario = async (e) => {
  e.preventDefault();

  try {
    await api.post('/Funcionario', {
      name,
      cargo,
      salario,
      datacontrato
    });

    // Recarregar funcionários
    fetchFuncionarios();

    setShowModal(false);

    // Limpar os campos
    setNome('');
    setCargo('');
    setSalario('');
    setDataContrato('');
  } catch (error) {
    console.error("Erro ao criar funcionario:", error);
    alert("Erro ao criar funcionario.");
  }
};

  const handleDeleteFuncionario = async (id) => {
    try {
      await api.delete(`/Funcionario/${id}`, { withCredentials: true });
      fetchFuncionarios(searchQuery);
    } catch (error) {
      console.error("Erro ao apagar funcionário:", error);
      alert("Erro ao apagar funcionário.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="home" style={{ padding: "2rem", textAlign: "center" }}>
        <h2>O utilizador não está autenticado</h2>
        <p>Por favor faça login.</p>
        {loading && <small>Verificando autenticação...</small>}
      </div>
    );
  }

  if (isAuthenticated) {
  return (
    <div className="home">

      <h1 className="main-title" >Funcionários</h1>
      <div className="navigation-box">
        <h2 className="navigation-title">Ir para:</h2>
        <div className="top-buttons">
          <Link to="/Animal" className="nav-button">Animais</Link>
          <Link to="/Jaula" className="nav-button">Jaulas</Link> 
        </div>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for the funcionário"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toString())}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {isAdmin && (
  <>
            <button onClick={() => setShowModal(true)}className="add-button">Adicionar Funcionário</button>

            {showModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h2>Novo Funcionário</h2>
                  <form onSubmit={handleCreateFuncionario} className="funcionario-form">
                    <input
                      type="text"
                      placeholder="Nome"
                      value={name}
                      onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Cargo"
                      value={cargo}
                      onChange={(e) => setCargo(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Salário"
                      value={salario}
                      onChange={(e) => setSalario(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Data contrato"
                      value={datacontrato}
                      onChange={(e) => setDataContrato(e.target.value)}
                    />
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                      <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
                      <button type="submit">Criar</button>
                    </div>
                  </form>
                </div>
              </div>
              )}
          </>
      )}
      <div className="animal-grid">
        {funcionarios.map((funcionario) => (
          <FuncionarioCard
          funcionario={funcionario}
          key={funcionario.id}
          onDelete={() => handleDeleteFuncionario(funcionario.id)}
          isAdmin={isAdmin}/>
        ))}
        </div>
    </div>
  );
}
}
