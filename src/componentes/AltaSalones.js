import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";


const AltaSalones = () => {
  const [nombre, setNombre] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [error, setError] = useState("");
  const [salonList, setSalonList] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);


  useEffect(() => {
    obtenerSalones();
  }, []);

  const obtenerSalones = async () => {
    try {
      const res = await axios.get("https://lounge-project-production.up.railway.app/api/salon",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        });
      setSalonList(res.data);
    } catch (error) {
      console.error("Error when getting the lounges:", error);
    }
  };

  const crearSalon = async (e) => {
    e.preventDefault();
    setError("");
    // Validación de los campos
    if (!nombre.trim() || !capacidad.trim() || !direccion.trim()) {
      setError("Please fill in all the fields..");
      return;
    }
    if (isNaN(capacidad) || capacidad <= 0) {
      setError("The capacity must be a number greater than 0.");
      return;
    }
    try {
      if (editando) {
        await axios.put(`https://lounge-project-production.up.railway.app/api/salon/${idEditando}`, {
          nombre,
          capacidad,
          direccion,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        });
        setEditando(false);
        setIdEditando(null);
      } else {
        await axios.post("https://lounge-project-production.up.railway.app/api/salon", {
          nombre,
          capacidad,
          direccion,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        });
      }
      alert("Lounge successfully created");
      
      obtenerSalones();
      setNombre("");
      setCapacidad("");
      setDireccion("");
    } catch (err) {
      console.error(err);
      setError(
        "An error occured while creating the lounge. Please, try again."
      );
    }
  };

  const editarSalon = (salon) => {
    setNombre(salon.nombre);
    setCapacidad(salon.capacidad);
    setDireccion(salon.direccion);
    setIdEditando(salon.id);
    setEditando(true);
  };

  const eliminarSalon = async (id) => {
    try {
      await axios.delete(`https://lounge-project-production.up.railway.app/api/salon/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("firebaseToken")}`,
          },
        });
      obtenerSalones();
    } catch (error) {
      console.error("Error deleting Lounge:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center">Lounge</h2>
        <form onSubmit={crearSalon}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              <strong>Lounge Name</strong> *
            </span>
            <input
              type="text"
              placeholder="Enter the name of the lounge, please"
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              <strong>Capacity</strong> *
            </span>
            <input
              placeholder="Enter the capacity of the lounge, please"
              type="number"
              onChange={(e) => setCapacidad(e.target.value)}
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              <strong>Address</strong> *
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the address of the lounge, please"
              onChange={(e) => setDireccion(e.target.value)}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="text-center mt-3">
            <button className="btn btn-primary btn-lg px-4" type="submit">
              Create Lounge
            </button>
          </div>
        </form>
      </div>
      <div>
        <DataTable value={salonList}>
          <Column field="id" header="Id" />
          <Column field="nombre" header="Lounge Name" />
          <Column field="capacidad" header="Capacity" />
          <Column field="direccion" header="Address" />
          <Column
            header="Actions"
            body={(rowData) => (
              <div>
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-success"
                  onClick={() => editarSalon(rowData)}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-danger"
                  onClick={() => eliminarSalon(rowData.id)}
                />
              </div>
            )}
          />
        </DataTable>
      </div>
    </>
  );
};

export default AltaSalones;

