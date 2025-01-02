import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useAuth } from "../providers/AuthProvider"

const AltaReservas = () => {
  const [salones, setSalones] = useState([]);
  const [salonSeleccionado, setSalonSeleccionado] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [error, setError] = useState('');

  const { user} = useAuth();

  // Cargar salones disponibles al montar el componente
  useEffect(() => {
    const fetchSalones = async () => {
      try {
      const response = await axios.get('https://lounge-project-production.up.railway.app/api/salon',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        });
      setSalones(response.data);
    } catch (err) {
      console.error('Error al cargar salones:', err);
      setError('The lounges could not be loaded.');
    }
    };

    fetchSalones();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!user || !user.id) {
    setError('Non-authenticated user.');
    return;
  }

  // Validaciones de campos vacíos
  if (!salonSeleccionado || !fechaInicio || !fechaFin) {
    setError('Please fill in all the fields.');
    return;
  }
  // Validación de fechas
  const hoy = moment().startOf('minute'); // Fecha actual
  if (moment(fechaInicio).isBefore(hoy)) {
    setError('The start date cannot be prior to the current date.');
    return;
  }

  if (moment(fechaInicio).isAfter(moment(fechaFin))) {
    setError('The start date must be before the end date.');
    return;
  }

  try {
    const fechaInicioUTC = new Date(fechaInicio).toISOString();
    const fechaFinUTC = new Date(fechaFin).toISOString();
    const response = await axios.post('https://lounge-project-production.up.railway.app/api/reserva', {
      usuarioId: user.id,
      salonId: salonSeleccionado,
      fechaInicio: fechaInicioUTC,
      fechaFin: fechaFinUTC,

    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
      },
    });

    if (response.status === 201) {
      alert('Reservation created successfully. A confirmation email has been sent');
      setFechaInicio('');
      setFechaFin('');
      setSalonSeleccionado('');
    }
  } catch (err) {
    if (err.response && err.response.data.error) {
      setError(err.response.data.error);
    } else {
      setError('An error occurred while creating the reservation.');
    }
  }
};

  return (
    <div className="container">
      
      <h2 className='text-center'>Make a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <select
          className="form-select" aria-label="Default select example"
            value={salonSeleccionado}
            onChange={(e) => setSalonSeleccionado(e.target.value)}
          >
            <option value="">Select Lounge</option>
            {salones.map((salon) => (
              <option key={salon.id} value={salon.id}>
                {salon.nombre} - {salon.capacidad} - {salon.direccion}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
  <label htmlFor="fechaInicio" className="form-label">
    <strong>Start Date and Time</strong>
  </label>
  <input
    id="fechaInicio"
    type="datetime-local"
    className="form-control"
    value={fechaInicio}
    onChange={(e) => setFechaInicio(e.target.value)}
    min={new Date().toISOString().slice(0, 16)} // Deshabilita fechas pasadas
  />
</div>

        <div className="mb-3">
        <label htmlFor="fechaFin" className="form-label">
        <strong>End Date and Time</strong>
  </label>
          <input
          id="fechaFin"
          className="form-control"
            type="datetime-local"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        
        <div className="text-center mt-3">
  <button className="btn btn-primary btn-lg px-4" type="submit">
    Create Reservation
  </button>
</div>
      </form>
    </div>
  );
};


export default AltaReservas;