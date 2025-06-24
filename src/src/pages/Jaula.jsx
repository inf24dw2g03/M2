import React, { useState, useEffect } from "react";
import { JaulaCard } from "../components/JaulaCard";
import '../css/Recursos.css';
import api from "../service/api";
import { Link } from 'react-router-dom';

export default function Jaula() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jaulas, setJaulas] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/auth/check', { withCredentials: true });
        setIsAuthenticated(res.data.authenticated);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const fetchJaulas = async (search = "") => {
    try {
      const response = await api.get('/Jaula', {
        params: { search },
        withCredentials: true,
      });
      setJaulas(response.data);
    } catch (error) {
      console.error("Erro ao buscar jaulas:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchJaulas();
  }, [isAuthenticated]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      fetchJaulas(searchQuery);
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

  return (
    <div className="home">

        <h1 className="main-title" >Jaulas</h1>
        <div className="navigation-box">
          <h2 className="navigation-title">Ir para:</h2>
          <div className="top-buttons">
              <Link to="/Animal" className="nav-button">Animais</Link>
              <Link to="/Funcionario" className="nav-button">Funcionários</Link> 
          </div>
        </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for the jaula"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toString())}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="animal-grid">
        {jaulas.map((jaula) => (
          <JaulaCard jaula={jaula} key={jaula.id} />
        ))}
      </div>
    </div>
  );
}