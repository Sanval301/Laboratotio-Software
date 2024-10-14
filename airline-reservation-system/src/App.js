import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ConfiguracionPerfil from "./components/Editperfil";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1>Página de Inicio</h1>} />
        <Route path="/Editperfil" element={<ConfiguracionPerfil />} />
      </Routes>
    </Router>
  );
}

export default App;
