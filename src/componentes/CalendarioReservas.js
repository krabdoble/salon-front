import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

const CalendarioReservas = () => {
  const [eventos, setEventos] = useState([]);

  // Cargar las reservas desde el backend
  const cargarReservas = async () => {
    try {
      const response = await axios.get("https://lounge-project-production.up.railway.app/api/reserva",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        });
      const reservas = response.data.map((reserva) => ({
        id: reserva.id,
        title: `${reserva.Salon.nombre}`, // Título del evento (puedes personalizarlo)
        start: reserva.fechaInicio,
        end: reserva.fechaFin,
        extendedProps: {
          usuario: reserva.usuario, // Otros detalles, como el usuario
        },
      }));
      setEventos(reservas);
    } catch (error) {
      console.error("Error al cargar las reservas:", error);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  // Manejar la edición de eventos al hacer clic
  const manejarEventoClick = async (clickInfo) => {
    const nuevaFechaInicio = prompt(
      "Nueva fecha de inicio (YYYY-MM-DD HH:mm)",
      clickInfo.event.start.toISOString().slice(0, 16)
    );
    const nuevaFechaFin = prompt(
      "Nueva fecha de fin (YYYY-MM-DD HH:mm)",
      clickInfo.event.end.toISOString().slice(0, 16)
    );

    if (nuevaFechaInicio && nuevaFechaFin) {
      try {
        await axios.put(`https://lounge-project-production.up.railway.app/api/reserva/${clickInfo.event.id}`, {
          fechaInicio: nuevaFechaInicio,
          fechaFin: nuevaFechaFin,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        });
        cargarReservas(); // Recargar las reservas después de editar
        alert("Reserva actualizada correctamente.");
      } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        alert("No se pudo actualizar la reserva.");
      }
    }
  };

  return (
    <div className="container"><FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={eventos}
      editable={true}
      eventClick={manejarEventoClick}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
    /></div>
  );
};

export default CalendarioReservas;

