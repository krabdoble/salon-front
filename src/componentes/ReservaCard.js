import React from 'react';
import dayjs from 'dayjs';

const ReservaCard = ({ reserva }) => {
  if (!reserva) return null;

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <p>
        <strong>Salón:</strong> {reserva.Salon?.nombre || 'N/A'}
      </p>
      <p>
        <strong>Fecha:</strong>{' '}
        {dayjs(reserva.fechaInicio).format('YYYY-MM-DD HH:mm')} -{' '}
        {dayjs(reserva.fechaFin).format('HH:mm')}
      </p>
    </div>
  );
};

export default ReservaCard;
