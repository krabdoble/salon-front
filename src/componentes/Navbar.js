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
   return (
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
                <Link className="nav-link text-light" to="/addlounge">
                  Add Lounge
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/calendar">
                  Booking Calendar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/reservationlist">
                  ReservationList
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/addreservation">
                  Add Reservation
                </Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link text-light" to="/statistic">
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
}
export default Navbar;