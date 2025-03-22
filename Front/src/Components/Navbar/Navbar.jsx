import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ImAirplane } from "react-icons/im";

import "./Navbar.css";

export function Navbar({ showItems, setShowItems }) {
  const navigate = useNavigate();
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken"));
  const [logOutIn, setLogOutIn] = useState(jwtToken ? "Log Out" : "Login");

  useEffect(() => {
    setLogOutIn(jwtToken ? "Log Out" : "Login");
  }, [jwtToken]);

  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    setJwtToken(null);
    navigate("/login");
  };

  const handleLogIn = () => {
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <div className="app-name-container">
        <figure className="logo-container">
          <img src="/nala-Photoroom.png" alt="Logo" />
        </figure>
        <p>10s Flights </p>
      </div>

      <ul className="links-container">
        <li>
          <Link to="/vuelos">Vuelos</Link>
        </li>
        <li onClick={jwtToken ? handleLogOut : handleLogIn}>{logOutIn}</li>
      </ul>
    </div>
  );
}
