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

/*<h2 className="d-flex justify-content-center align-item-center pt-3">
          Welcome to <span style={{ color: "orangered", fontSize: "1.5rem", fontStyle:"italic"}}>Zopope</span> rent
        </h2>*/



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
              path="/altasalones"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <AltaSalones></AltaSalones>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/altareservas"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <AltaReservas></AltaReservas>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/calendarioreservas"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <CalendarioReservas></CalendarioReservas>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/listadoreservas"
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
              path="/estadisticasreservas"
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

/*
function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <Router>
      <nav>
        
        <Link to="/alta-salones">Alta de Salones</Link>
        <Link to="/calendario-reservas">Calendario de Reservas</Link>
        <Link to="/listado-reservas">Listado de Reservas</Link>
        <Link to="/alta-reservas">Alta de Reservas</Link>
      </nav>

      <Route path="/" component={Login} />
      <Route path="/alta-salones" component={AltaSalones} />
      <Route path="/calendario-reservas" component={CalendarioReservas} />
      <Route path="/listado-reservas" component={ListadoReservas} />
      <Route path="/alta-reservas" component={AltaReservas} user={user} />
    </Router>
  );
}
  */


