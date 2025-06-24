import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css'

export function NavBar(){
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/" className="nav-link">Zoológico</Link>
        </div>
        <div className="navbar-links">
            <a href="http://localhost:3000/docs" className='nav-link'>API</a>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/Login" className="nav-link">Login</Link>
        </div>
    </nav>
}