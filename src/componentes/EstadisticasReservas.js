import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EstadisticasReservas = () => {
  const [reservasPorDia, setReservasPorDia] = useState({ labels: [], datasets: [] });
  const [reservasPorSalon, setReservasPorSalon] = useState({ labels: [], datasets: [] });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEstadisticas = async () => {
      setCargando(true);
      setError('');

      try {
        const response = await axios.get('https://lounge-project-production.up.railway.app/api/estadisticas/reservas',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
            },
          });
        const { dias, reservasPorDia: dataPorDia, salones, reservasPorSalon: dataPorSalon  } = response.data;

        setReservasPorDia({
          labels: dias,
          datasets: [
            {
              label: 'Reservations per day',
              data: dataPorDia,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });

        setReservasPorSalon({
          labels: salones,
          datasets: [
            {
              label: 'Reservations by Lounge',
              data: dataPorSalon,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        setError('Maintenance issue. Statistics could not be loaded. Try again later.');
        console.error('Error al cargar estadísticas:', err);
      } finally {
        setCargando(false);
      }
    };

    fetchEstadisticas();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Booking Statistics</h2>

      {cargando ? (
        <p className="text-center">Loading data...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <div>
          <div className="mb-5">
            <h4 className="text-center">Reservations per day</h4>
            <Bar
              data={reservasPorDia}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>

          <div>
            <h4 className="text-center">Reservations by Lounge</h4>
            <Bar
              data={reservasPorSalon}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EstadisticasReservas;

