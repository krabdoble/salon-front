/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const ReservasPasadas = ({ usuarioId }) => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchReservasPasadas = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/reservaspasadas/${usuarioId}`);
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
      <h2>Reservas Pasadas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {reservas.length > 0 ? (
        reservas.map((reserva) => (
          <div key={reserva.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <p>
              <strong>Salón:</strong> {reserva.Salon?.nombre || 'N/A'}
            </p>
            <p>
              <strong>Fecha:</strong>{' '}
              {moment(reserva.fechaInicio).format('YYYY-MM-DD HH:mm')} -{' '}
              {moment(reserva.fechaFin).format('HH:mm')}
            </p>
          </div>
        ))
      ) : (
        <p>No hay reservas pasadas disponibles.</p>
      )}
    </div>
  );
};

export default ReservasPasadas;*/

// CON RESERVASCARD Y DAY.JS

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


