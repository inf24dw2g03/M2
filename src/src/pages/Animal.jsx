import React, { useState, useEffect } from "react";
import { AnimalCard } from "../components/AnimalCard";
import '../css/Recursos.css';
import api from "../service/api";
import { Link } from 'react-router-dom';


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [animais, setAnimais] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [idade, setIdade] = useState('');
  const [jaulaId, setJaulaId] = useState('');
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

  const fetchAnimais = async (search = "") => {
    try {
      const response = await api.get('/Animal', {
        params: { search },
        withCredentials: true,
      });
      setAnimais(response.data);
    } catch (error) {
      console.error("Erro ao buscar animais:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchAnimais();
  }, [isAuthenticated]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      fetchAnimais(searchQuery);
    }
  };

  const handleCreateAnimal = async (e) => {
  e.preventDefault();

  try {
    await api.post('/Animal', {
      name,
      especie,
      idade: parseInt(idade),
      jaulaId
    });

    // Recarregar animais
    fetchAnimais();

    setShowModal(false);

    // Limpar os campos
    setNome('');
    setEspecie('');
    setIdade('');
    setJaulaId('');
  } catch (error) {
    console.error("Erro ao criar animal:", error);
    alert("Erro ao criar animal.");
  }
};

  const handleDeleteAnimal = async (id) => {
    try {
      await api.delete(`/Animal/${id}`, { withCredentials: true });
      fetchAnimais(searchQuery);
    } catch (error) {
      console.error("Erro ao apagar animal:", error);
      alert("Erro ao apagar animal.");
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

      <h1 className="main-title" >Animais</h1>
      <div className="navigation-box">
        <h2 className="navigation-title">Ir para:</h2>
        <div className="top-buttons">
          <Link to="/Funcionario" className="nav-button">Funcionários</Link>
          <Link to="/Jaula" className="nav-button">Jaulas</Link> 
        </div>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for the animal"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toString())}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {isAdmin && (
  <>
            <button onClick={() => setShowModal(true)}className="add-button">Adicionar Animal</button>

            {showModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h2>Novo Animal</h2>
                  <form onSubmit={handleCreateAnimal} className="animal-form">
                    <input
                      type="text"
                      placeholder="Nome"
                      value={name}
                      onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Espécie"
                      value={especie}
                      onChange={(e) => setEspecie(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Idade"
                      value={idade}
                      onChange={(e) => setIdade(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="ID da Jaula"
                      value={jaulaId}
                      onChange={(e) => setJaulaId(e.target.value)}
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
        {animais.map((animal) => (
          <AnimalCard
          animal={animal}
          key={animal.id}
          onDelete={() => handleDeleteAnimal(animal.id)}
          isAdmin={isAdmin}/>
        ))}
      </div>
    </div>
    );
  }
}
   
