import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../providers/AuthProvider";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // Cierra sesión
    navigate("/"); // Redirige a la ventana principal
  };
  /* return (
    <div className="bg-dark">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/altasalones">
                  Add Lounge
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/calendarioreservas">
                  Booking Calendar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/listadoreservas">
                  ReservationList
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/altareservas">
                  Add Reservation
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/reservaspasadas">
                  Reservas Pasadas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/estadisticasreservas">
                  Statistics
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
            <h1 className="nav-link text-light"><span style={{ color: "orangered", fontSize: "1.5rem", fontStyle:"italic"}}>Welcome,</span> {user?.displayName.split(" ")[0]}</h1>
            <button
                className="btn btn-outline-light ms-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
        
          </div>
        </div>
      </nav>
    </div>
  );
}*/
  /*return (
    <div className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link text-light"
                id="navbarDropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menu
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="/altasalones">
                    Add Lounge
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/calendarioreservas">
                    Booking Calendar
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/listadoreservas">
                    Reservation List
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/altareservas">
                    Add Reservation
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/reservaspasadas">
                    Reservas Pasadas
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/estadisticasreservas">
                    Statistics
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <h1 className="nav-link text-light">
              <span
                style={{
                  color: "orangered",
                  fontSize: "1.5rem",
                  fontStyle: "italic",
                }}
              >
                Welcome,
              </span>{" "}
              {user?.displayName.split(" ")[0]}
            </h1>
            <button
              className="btn btn-outline-light ms-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  <li>
            <Link className="dropdown-item" to="/reservaspasadas">
              Reservas Pasadas
            </Link>
          </li>
}*/

return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      {/* Logo o título */}
      <Link className="navbar-brand" to="/">
        <span style={{ color: "orangered", fontSize: "1.5rem", fontStyle: "italic" }}>Zopope</span> Rent
      </Link>

      {/* Dropdown para enlaces */}
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="navbarDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Menu
        </button>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link className="dropdown-item" to="/altasalones">
              Add Lounge
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/calendarioreservas">
              Booking Calendar
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/listadoreservas">
              Reservation List
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/altareservas">
              Add Reservation
            </Link>
          </li>
          
          <li>
            <Link className="dropdown-item" to="/estadisticasreservas">
              Statistics
            </Link>
          </li>
        </ul>
      </div>

      {/* Texto de bienvenida */}
      <div className="mx-auto">
        <h2>
          Welcome to{" "}
          <span style={{ color: "orangered", fontSize: "1.5rem", fontStyle: "italic" }}>Zopope</span> rent
        </h2>
      </div>

      {/* Información del usuario y botón de logout */}
      <div className="d-flex align-items-center">
        <h1 className="nav-link text-light">
          <span style={{ color: "orangered", fontSize: "1.5rem", fontStyle: "italic" }}>Welcome,</span>{" "}
          {user?.displayName.split(" ")[0]}
        </h1>
        <button className="btn btn-outline-light ms-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  </nav>
);
};

export default Navbar;
