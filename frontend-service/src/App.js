import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import { getUserData } from './services/userServices';
import AboutUs from './pages/AboutUs';
import HowToBuy from './pages/HowToBuy';
import Proyects from './pages/Projects';
import ProjectDetail from "./pages/ProjectDetail";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword'; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');
    if (token) {
      // Obtener los datos del usuario
      getUserData()
        .then((userData) => {
          setIsAuthenticated(true);
          setUser(userData);
        })
        .catch((error) => {
          console.error('Error al obtener los datos del usuario:', error);
          setIsAuthenticated(false);
          setUser(null);
        });
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} onLogin={handleLogin} />
      <Routes>
        <Route exact path="/" element={<Home user={user}/>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/howtobuy" element={<HowToBuy />} />
        <Route path="/projects" element={<Proyects user={user}/>} />
        <Route path="/projects/:projectId" element={<ProjectDetail user={user}/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" component={ResetPassword} /> {/* Agrega la ruta */}
      </Routes>
    </Router>
  );
};

export default App;