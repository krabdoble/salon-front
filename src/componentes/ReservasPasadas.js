import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReservaCard from './ReservaCard';

const ReservasPasadas = ({ usuarioId }) => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservasPasadas = async () => {
      try {
        const response = await axios.get(`https://lounge-project-production.up.railway.app/api/reservaspasadas/${usuarioId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
            },
          });
        setReservas(response.data);
      } catch (err) {
        console.error('Error al obtener reservas pasadas:', err);
        setError('No se pudieron cargar las reservas pasadas. Por favor, intenta nuevamente.');
      }
    };

    if (usuarioId) {
      fetchReservasPasadas();
    }
  }, [usuarioId]);

  return (
    <div>
      <h2 className='text-center'>Reservas Pasadas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {reservas.length > 0 ? (
        reservas.map((reserva) => <ReservaCard key={reserva.id} reserva={reserva} />)
      ) : (
        <p>No hay reservas pasadas disponibles.</p>
      )}
    </div>
  );
};

export default ReservasPasadas;


/*
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // O donde sea que estés manejando el contexto
import ReservaCard from './ReservaCard';

const ReservasPasadas = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);
  const { usuarioId } = useContext(AuthContext); // Suponiendo que tienes un contexto para el usuario autenticado

  useEffect(() => {
    const fetchReservasPasadas = async () => {
      try {
        const response = await axios.get(`https://app/api/reservaspasadas/${usuarioId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        });
        setReservas(response.data);
      } catch (err) {
        console.error('Error al obtener reservas pasadas:', err);
        setError('No se pudieron cargar las reservas pasadas. Por favor, intenta nuevamente.');
      }
    };

    if (usuarioId) {
      fetchReservasPasadas();
    }
  }, [usuarioId]);

  return (
    <div>
      <h2 className='text-center'>Reservas Pasadas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {reservas.length > 0 ? (
        reservas.map((reserva) => <ReservaCard key={reserva.id} reserva={reserva} />)
      ) : (
        <p>No hay reservas pasadas disponibles.</p>
      )}
    </div>
  );
};

export default ReservasPasadas;

*/


