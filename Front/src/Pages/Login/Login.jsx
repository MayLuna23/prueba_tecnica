import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "../../Components/Modal/Modal";

import axios from "axios";

import "./Login.css";

import { useNavigate } from "react-router-dom";

export function Login() {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
  });
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  })
  const [messageError, setMessageError] = useState("");
  const [messageErrorLogin, setMessageErrorLogin] = useState("");
  const [showMessageError, setShowMessageError] = useState(false);
  const [showMessageErrorLogin, setShowMessageErrorLogin] = useState(false);



  const handleInputChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const loginInputChange = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
    console.log(userLogin)
  };

  const fetchApiData = async () => {
    try {
      const apiCall = await axios.get("http://localhost:3001/api-flights/v1/users");
      // console.log(apiCall.data.data);
      setUserData(apiCall.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createUserAxiosRequest = async () => {
    try {
      if (
        newUser.name === 0 ||
        newUser.lastName === "" ||
        newUser.age === "" ||
        newUser.email === "" ||
        newUser.password === ""
      ) {
        setMessageError("Todos los campos son obligatorios");
        setShowMessageError(true);
        return;
      }
      if (newUser.age < 0) {
        setMessageError("La edad del usuario no puede ser menor que 0");
        setShowMessageError(true);
        return;
      }
      const apiCall = await axios.post(
        "http://localhost:3001/api-flights/v1/users",
        newUser
      );
      console.log(apiCall);
      if (apiCall.data.statusCode === 201) {
        setShowCreateUserModal(false)
        setNewUser({
          name: "",
          lastName: "",
          age: "",
          email: "",
          password: "",
        });
      }
      fetchApiData();
    } catch (error) {
      console.error(error);
    }
  };


  const loginAxiosRequest = async () => {
    try {
      if (userLogin.email === "" || userLogin.password === "" ) {
        setMessageErrorLogin("Todos los campos son obligatorios");
        setShowMessageErrorLogin(true);
        return
      }

      const apiCall = await axios.post(
        `http://localhost:3001/api-flights/v1/login`,
        
        userLogin
      );
      console.log(apiCall)
      if (apiCall.data.statusCode === 200) {

        localStorage.setItem("jwtToken", apiCall.data.data) // guarda en localstorage
        navigate("/vuelos")
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="login-container">
  
      <div className="l-buttons-container">
        <button
          className="l-button-add-user"
          onClick={() => setShowLoginModal(true)}
        >
          Login
        </button>

        <button
          className="l-button-add-user"
          onClick={() => setShowCreateUserModal(true)}
        >
          Registrar usuario
        </button>
      </div>

      {showCreateUserModal && (
        <Modal
          title={"Registrar usuario"}
          primaryButton={{
            primaryLabel: "Aceptar",
            onPrimaryClick: createUserAxiosRequest,
          }}
          secondaryButton={{
            secondaryLabel: "Cancelar",
            onSecondaryClick: setShowCreateUserModal,
          }}
        >
          {showMessageError && <span>{messageError}</span>}
          <div className="form-input-container">
            <input
              type="text"
              placeholder="nombre"
              name={"name"}
              value={newUser.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="apellido"
              name={"lastName"}
              value={newUser.lastName}
              onChange={handleInputChange}
            />
            <input
              type="number"
              placeholder="Edad"
              name={"age"}
              value={newUser.age}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="email"
              name={"email"}
              value={newUser.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="password"
              name={"password"}
              value={newUser.password}
              onChange={handleInputChange}
            />
          </div>
        </Modal>
      )}
      
      {showLoginModal && (
        <Modal
          title={"Login"}
          primaryButton={{
            primaryLabel: "Aceptar",
            onPrimaryClick: loginAxiosRequest,
          }}
          secondaryButton={{
            secondaryLabel: "Cancelar",
            onSecondaryClick: setShowLoginModal,
          }}
        >
          {showMessageError && <span>{messageError}</span>}
          {showMessageErrorLogin && <span>{messageErrorLogin}</span>}
          <div className="form-input-container">
            <input
              type="text"
              placeholder="example@mail.com"
              name={"email"}
              value={userLogin.email}
              onChange={loginInputChange}
            />
            <input
              type="password"
              placeholder="password"
              name={"password"}
              value={userLogin.password}
              onChange={loginInputChange}
            />
           
            
          </div>
        </Modal>
      )}

    </div>
  );
}
