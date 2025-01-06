import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from './componentes/Login';
import Home from './componentes/Home'
import AltaSalones from './componentes/AltaSalones';
import CalendarioReservas from './componentes/CalendarioReservas';
import ListadoReservas from './componentes/ListadoReservas';
import AltaReservas from './componentes/AltaReservas';
import EstadisticasReservas from './componentes/EstadisticasReservas';
import ReservasPasadas from './componentes/ReservasPasadas';
import Navbar from './componentes/Navbar';
import { useAuth } from './providers/AuthProvider';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";



function App() {
  const { user } = useAuth();

  return (
    <div className="miApp">
      <div >
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Navbar/>
                  <Home></Home>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/addlounge"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <AltaSalones></AltaSalones>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/addreservation"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <AltaReservas></AltaReservas>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <CalendarioReservas></CalendarioReservas>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/reservationlist"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <ListadoReservas></ListadoReservas>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/reservaspasadas"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <ReservasPasadas usuarioId={user?.id} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/statistic"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <EstadisticasReservas></EstadisticasReservas>
                </ProtectedRoute>
              }
            ></Route>
            <Route path="*" element={<div>404: Página no encontrada</div>} />
            
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

const ProtectedRoute = ({ redirectPath = "/", children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("fireBaseToken");

    if (!token) {
      navigate(redirectPath);
    }
  }, []);

  return children;
};

export default App;

