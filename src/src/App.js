import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  Login  from './pages/Login';
import Funcionario  from './pages/Funcionario';
import Animal from './pages/Animal';
import Home from './pages/Home';
import Jaula from './pages/Jaula';
import { NavBar } from './components/NavBar';
import './css/App.css'

export default function App(){
    return(
        <div>
            <NavBar/>
            <main className='main-content'>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/Login' element={<Login />}></Route>
                    <Route path='/Funcionario' element={<Funcionario />}></Route>
                    <Route path='/Animal' element={<Animal />}></Route>
                    <Route path='/Jaula' element={<Jaula />}></Route>
                </Routes>
            </main>
        </div>
    );
}
