import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useAuth } from "../providers/AuthProvider"

const ListadoReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [filtroSalon, setFiltroSalon] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroPersona, setFiltroPersona] = useState('');


  const { user} = useAuth();

  // Cargar reservas al montar el componente
  useEffect(() => {
    const fetchReservas = async () => {
      const response = await axios.get('https://lounge-project-production.up.railway.app/api/reserva',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        });
      setReservas(response.data);
    };

    fetchReservas();
  }, []);

  // Filtrar las reservas
  const reservasFiltradas = reservas.filter(reserva => {
    const coincideSalon = filtroSalon
      ? reserva.Salon.nombre.toLowerCase().includes(filtroSalon.toLowerCase())
      : true;
    const coincideFecha = filtroFecha
      ? moment(reserva.fechaInicio).isSame(filtroFecha, 'day')
      : true;
    const coincidePersona = filtroPersona
      ? reserva.Usuario.nombre.toLowerCase().includes(filtroPersona.toLowerCase())
      : true;

    return coincideSalon && coincideFecha && coincidePersona;
  });

  /*const eliminarReserva = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/reserva/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
        }
      });
      reservas();
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };*/

  return (
    <div className="container">
      <h2 className='text-center'>Filters</h2>
      <div className="mt-4">
      <div className="form-group mb-3"><input
        type="text"
        className="form-control"
          placeholder="Filtrar por el nombre del salón"
          onChange={e => setFiltroSalon(e.target.value)}
        /></div>
        <div className="form-group mb-3"><input
        type="date"
      className="form-control"
          placeholder="Filtrar por fecha (YYYY-MM-DD)"
          onChange={e => setFiltroFecha(e.target.value)}
        /></div>
        <div className="form-group mb-3"><input
        type="text"
      className="form-control"
          placeholder="Filtrar por el nombre del cliente"
          onChange={e => setFiltroPersona(e.target.value)}
        /></div>
      </div>

      <h2 className='text-center'>List of Reservations</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {reservasFiltradas.map(reserva => (
          <div
            key={reserva.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '10px',
              maxWidth: '300px',
            }}
          >

            <h3><strong>Client Name:</strong>{user?.displayName}</h3>
            
            <p>
              <strong>Lounge:</strong> {reserva.Salon.nombre}
            </p>
            <p>
              <strong>Date:</strong>{' '}
              {moment(reserva.fechaInicio).format('YYYY-MM-DD')} {''} <strong>{' Start'}</strong> {''}
              {moment(reserva.fechaInicio).format('HH:mm')} {''}-<strong>{' End'}</strong> {''}
              {moment(reserva.fechaFin).format('HH:mm')}
            </p>
            
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default ListadoReservas;

/*
{user?.displayName}
<img
              src={user?.photoURL}
              alt={user?.displayName}
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />

            <h3>{user?.displayName}</h3>

            <button onClick={() => eliminarReserva(reserva.id)}>
                      Delete
                    </button>

                    <img
              src={user?.imagen}
              alt={user?.displayName}
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            */
