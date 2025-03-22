import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "../../Components/Modal/Modal";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { GiAirplaneArrival } from "react-icons/gi";
import { GiAirplaneDeparture } from "react-icons/gi";

import axios from "axios";

import "./Vuelos.css";

export function Vuelos() {
  const [arrivalsData, setArrivalsData] = useState([]);
  const [departuresData, setDeparturesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeparturesModal, setShowDeparturesModal] = useState(false);
  const [showUpdateArrivalModal, setShowUpdateArrivalModal] = useState(false);
  const [showUpdateDeparturesModal, setShowUpdateDeparturesModal] =
    useState(false);
  const [showDeleteArrivalModal, setShowDeleteArrivalModal] = useState(false);
  const [showDeleteDeparturesModal, setShowDeleteDeparturesModal] =
    useState(false);
  const jwtToken = localStorage.getItem("jwtToken");
  const [newArrivals, setNewArrivals] = useState({
    time: "",
    origin: "",
    flight: "",
    remarks: "",
  });
  const [newDepartures, setNewDepartures] = useState({
    time: "",
    destiny: "",
    flight: "",
    gate: "",
    remarks: "",
  });
  const [messageError, setMessageError] = useState("");
  const [showMessageError, setShowMessageError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newArrivalsData, setNewArrivalsData] = useState({});
  const [newDeparturesData, setNewDeparturesData] = useState({});

  const handleInputChange = (event) => {
    setNewArrivals({
      ...newArrivals,
      [event.target.name]: event.target.value,
    });
  };
  const handleInputUpdateArrival = (event) => {
    console.log(event.target.value)
    setNewArrivalsData({
      ...newArrivalsData,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputUpdateDepartures = (event) => {
    
    setNewDeparturesData({
      ...newDeparturesData,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputDeparturesChange = (event) => {
    setNewDepartures({
      ...newDepartures,
      [event.target.name]: event.target.value,
    });
  };

  const fetchArrivals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api-flights/v1/arrivals"
      );
      setArrivalsData(response.data.data);
    } catch (error) {
      console.error("Error fetching arrivals:", error);
    }
  };

  const fetchDepartures = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api-flights/v1/departures"
      );
      setDeparturesData(response.data.data);
    } catch (error) {
      console.error("Error fetching departures:", error);
    }
  };

  const checkToken = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api-flights/v1/users/chk-tkn",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (response.status && response.status === 200) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Error checkeando el token:", error);
    }
  };

  useEffect(() => {
    checkToken();
    fetchArrivals();
    fetchDepartures();
  }, []);

  const createArrivalsAxiosRequest = async () => {
    try {
      if (
        newArrivals.time === "" ||
        newArrivals.origin === "" ||
        newArrivals.flight === "" ||
        newArrivals.remarks === ""
      ) {
        setMessageError("Todos los campos son obligatorios");
        setShowMessageError(true);
        return;
      }

      const apiCall = await axios.post(
        "http://localhost:3001/api-flights/v1/arrivals",
        newArrivals
      );
      console.log(apiCall);
      if (apiCall.data.statusCode === 201) {
        setNewArrivals({
          time: "",
          origin: "",
          flights: "",
          remarks: "",
        });
        setShowModal(false)
      }
      fetchArrivals();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteArrivals = async () => {
    try {
      console.log(newArrivalsData.flight)
      const apiCall = await axios.delete(
        `http://localhost:3001/api-flights/v1/arrivals/${newArrivalsData.flight}`
      );
      console.log(apiCall);
      if (apiCall.data.statusCode === 200) {
        setNewArrivalsData({
          time: "",
          origin: "",
          flights: "",
          remarks: "",
        })
        setShowDeleteArrivalModal(false)
        fetchArrivals()
      }
      if (apiCall.data.statusCode !== 200) {
        setMessageError("No fue posible eliminar este vuelo");
        setShowMessageError(true);
        return;
      }
      fetchArrivals();
    } catch (error) {
      setMessageError("Ocurrio un error al eliminar el vuelo");
      setShowMessageError(true);
      return;
    }
  };

  const updateArrivals = async () => {
    try {
      const apiCall = await axios.patch(
        `http://localhost:3001/api-flights/v1/arrivals/${newArrivalsData.flight}`,
        newArrivalsData
      );

      console.log(apiCall);
      if (apiCall.data.statusCode === 200) {
        setShowUpdateArrivalModal(false)
        fetchArrivals()
        setNewArrivalsData({})
      }
      if (apiCall.data.statusCode !== 200) {
        setMessageError("No fue posible actualizar este vuelo");
        setShowMessageError(true);
        return;
      }
      fetchArrivals();
    } catch (error) {
      setMessageError("Ocurrio un error al actualizar el vuelo");
      setShowMessageError(true);
      return;
    }
  };

  const createDeparturesAxiosRequest = async () => {
    try {
      if (
        newDepartures.time === "" ||
        newDepartures.destiny === "" ||
        newDepartures.flight === "" ||
        newDepartures.gate === "" ||
        newDepartures.remarks === ""
      ) {
        setMessageError("Todos los campos son obligatorios");
        setShowMessageError(true);
        return;
      }

      const apiCall = await axios.post(
        "http://localhost:3001/api-flights/v1/departures",
        newDepartures
      );
      console.log(apiCall);
      if (apiCall.data.statusCode === 201) {
        
        setNewDepartures({
          time: "",
          destiny: "",
          flights: "",
          gate: "",
          remarks: "",
        });
      }
      setShowDeparturesModal(false);
      fetchDepartures();
    } catch (error) {
      console.error(error);
    }
  };

  const updateDepartures = async () => {
    try {
      const apiCall = await axios.patch(
        `http://localhost:3001/api-flights/v1/departures/${newDeparturesData.flight}`,
        newDeparturesData
      );

      console.log(apiCall);
      if (apiCall.data.statusCode === 200) {
        setShowUpdateDeparturesModal(false)
        fetchDepartures()
        setNewDeparturesData({})
      }
      if (apiCall.data.statusCode !== 200) {
        setMessageError("No fue posible actualizar este vuelo");
        setShowMessageError(true);
        return;
      }
      fetchDepartures();
    } catch (error) {
      setMessageError("Ocurrio un error al actualizar el vuelo");
      setShowMessageError(true);
      return;
    }
  };

  const deleteDepartures = async () => {
    try {
      const apiCall = await axios.delete(
        `http://localhost:3001/api-flights/v1/departures/${newDeparturesData.flight}`
      );
      console.log(apiCall);
      if (apiCall.data.statusCode === 200) {
        setNewDeparturesData({
          time: "",
          destiny: "",
          flights: "",
          gate: "",
          remarks: "",
        })
        setShowDeleteDeparturesModal(false)
        fetchDepartures()
      }
      if (apiCall.data.statusCode !== 200) {
        setMessageError("No fue posible eliminar este vuelo");
        setShowMessageError(true);
        return;
      }
      fetchDepartures();
    } catch (error) {
      setMessageError("Ocurrio un error al eliminar el vuelo");
      setShowMessageError(true);
      return;
    }
  };

  return (
    <div className="vuelos-container">
      <main className="tablas-container">
        <section>
          <div className="title-buttons-container">
            <h2>
              Arrivals <GiAirplaneArrival />{" "}
            </h2>

            {isAdmin && (
              <button
                className="v-button-add-arrivals"
                onClick={() => setShowModal(true)}
              >
                Crear Arrival
              </button>
            )}
          </div>
          <div className="table-vuelos">
            <table>
              <thead>
                <tr>
                  <th>Flight</th>
                  <th>Time</th>
                  <th>Origin</th>
                  <th>Remarks</th>
                  {isAdmin && <th></th>}
                </tr>
              </thead>
              <tbody>
                {arrivalsData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="nohayna-container">
                      No hay arrivals que mostrar
                    </td>
                  </tr>
                ) : (
                  arrivalsData.map((arrival) => (
                    <tr key={arrival.id}>
                      <td>{arrival.flight}</td>
                      <td>{arrival.time}</td>
                      <td>{arrival.origin}</td>
                      <td>{arrival.remarks}</td>
                      {isAdmin && (
                        <td  style={{display:"flex", justifyContent:"space-evenly"}}>
                          {
                            <BiSolidEditAlt
                              onClick={() => {
                                setShowUpdateArrivalModal(true),
                                setNewArrivalsData(arrival) }
                              }
                            />
                          }
                          {<FaTrashCan onClick={() => {setShowDeleteArrivalModal(true), setNewArrivalsData(arrival)}} 
                            />
                          }
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <div className="title-buttons-container">
            <h2>
              Departures <GiAirplaneDeparture />
            </h2>
            {isAdmin && (
              <button
                className="v-button-add-departures"
                onClick={() => setShowDeparturesModal(true)}
              >
                Crear Departure
              </button>
            )}
          </div>
          <div className="table-vuelos">
            <table>
              <thead>
                <tr>
                  <th>Flight</th>
                  <th>Time</th>
                  <th>Destiny</th>
                  <th>Gate</th>
                  <th>Remarks</th>
                  {isAdmin && <th></th>}
                </tr>
              </thead>
              <tbody>
                {departuresData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="nohayna-container">
                      No hay departures que mostrar
                    </td>
                  </tr>
                ) : (
                  departuresData.map((departure) => (
                    <tr key={departure.id}>
                      <td>{departure.flight}</td>
                      <td>{departure.time}</td>
                      <td>{departure.destiny}</td>
                      <td>{departure.gate}</td>
                      <td>{departure.remarks}</td>
                      {isAdmin && (
                        <td style={{display:"flex", justifyContent:"space-evenly"}}  >
                          {
                            <BiSolidEditAlt
                              onClick={() =>{
                                setShowUpdateDeparturesModal(true),
                                setNewDeparturesData(departure) }
                              }
                            />
                          }
                          {
                            <FaTrashCan
                              onClick={ () => {setShowDeleteDeparturesModal(true), setNewDeparturesData(departure)} }
                            />
                          }
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      {showModal && (
        <Modal
          title={"Registrar Arrival"}
          primaryButton={{
            primaryLabel: "Aceptar",
            onPrimaryClick: createArrivalsAxiosRequest,
          }}
          secondaryButton={{
            secondaryLabel: "Cancelar",
            onSecondaryClick: setShowModal,
          }}
        >
          {showMessageError && <span>{messageError}</span>}
          <div className="form-input-container">
            <input
              type="text"
              placeholder="Tiempo de llegada"
              name={"time"}
              value={newArrivals.time}
              onChange={handleInputChange}
            />

            <input
              type="text"
              placeholder="Origen del vuelo"
              name={"origin"}
              value={newArrivals.origin}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Numero de vuelo"
              name={"flight"}
              value={newArrivals.flight}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Remarks"
              name={"remarks"}
              value={newArrivals.remarks}
              onChange={handleInputChange}
            />
          </div>
        </Modal>
      )}

      {showDeparturesModal && (
        <Modal
          title={"Registrar Departure"}
          primaryButton={{
            primaryLabel: "Aceptar",
            onPrimaryClick: createDeparturesAxiosRequest,
          }}
          secondaryButton={{
            secondaryLabel: "Cancelar",
            onSecondaryClick: setShowDeparturesModal,
          }}
        >
          {showMessageError && <span>{messageError}</span>}
          <div className="form-input-container">
            <input
              type="text"
              placeholder="Tiempo de partida"
              name={"time"}
              value={newDepartures.time}
              onChange={handleInputDeparturesChange}
            />

            <input
              type="text"
              placeholder="Destino"
              name={"destiny"}
              value={newDepartures.destiny}
              onChange={handleInputDeparturesChange}
            />
            <input
              type="text"
              placeholder="Numero de vuelo"
              name={"flight"}
              value={newDepartures.flight}
              onChange={handleInputDeparturesChange}
            />
            <input
              type="text"
              placeholder="Puerta"
              name={"gate"}
              value={newDepartures.gate}
              onChange={handleInputDeparturesChange}
            />
            <input
              type="text"
              placeholder="Remarks"
              name={"remarks"}
              value={newDepartures.remarks}
              onChange={handleInputDeparturesChange}
            />
          </div>
        </Modal>
      )}

      {showUpdateDeparturesModal && (
        <Modal
          title={"Actualizar departure"}
          primaryButton={{
            primaryLabel: "Aceptar",
            onPrimaryClick: () => updateDepartures(newDeparturesData),
          }}
          secondaryButton={{
            secondaryLabel: "Cancelar",
            onSecondaryClick: setShowUpdateDeparturesModal,
          }}
        >
          {showMessageError && <span>{messageError}</span>}
          <div className="form-input-container">
            <input
              type="text"
              placeholder="Tiempo de llegada"
              name={"time"}
              value={newDeparturesData.time}
              onChange={handleInputUpdateDepartures}
            />

            <input
              type="text"
              placeholder="Destino"
              name={"destiny"}
              value={newDeparturesData.destiny}
              onChange={handleInputUpdateDepartures}
            />
            
            <input
              type="text"
              placeholder="Puerta"
              name={"gate"}
              value={newDeparturesData.gate}
              onChange={handleInputUpdateDepartures}
            />
            <input
              type="text"
              placeholder="Remarks"
              name={"remarks"}
              value={newDeparturesData.remarks}
              onChange={handleInputUpdateDepartures}
            />
          </div>
        </Modal>
      )}

      {showUpdateArrivalModal && (
        <Modal
          title={"Actualizar arrival"}
          primaryButton={{
            primaryLabel: "Aceptar",
            onPrimaryClick: () => updateArrivals(newArrivalsData),
          }}
          secondaryButton={{
            secondaryLabel: "Cancelar",
            onSecondaryClick: setShowUpdateArrivalModal,
          }}
        >
          {showMessageError && <span>{messageError}</span>}
          <div className="form-input-container">
            <input
              type="text"
              placeholder="Tiempo de llegada"
              name={"time"}
              value={newArrivalsData.time}
              onChange={handleInputUpdateArrival}
            />

            <input
              type="text"
              placeholder="origen"
              name={"origin"}
              value={newArrivalsData.origin}
              onChange={handleInputUpdateArrival}
            />

            <input
              type="text"
              placeholder="Remarks"
              name={"remarks"}
              value={newArrivalsData.remarks}
              onChange={handleInputUpdateArrival}
            />
          </div>
        </Modal>
      )}

      {showDeleteArrivalModal && (
        <Modal
          title={"Eliminar arrival"}
          primaryButton={{
            primaryLabel: "Aceptar",
            onPrimaryClick: () => deleteArrivals(newArrivalsData),
          }}
          secondaryButton={{
            secondaryLabel: "Cancelar",
            onSecondaryClick: setShowDeleteArrivalModal,
          }}
        >
          {showMessageError && <span>{messageError}</span>}
          <p>
            Estas seguro de que deseas eliminar el vuelo numero
            {newArrivalsData.flight} con origen {newArrivalsData.origin}
          </p>
        </Modal>
      )}

      {showDeleteDeparturesModal && (
        <Modal
          title={"Eliminar vuelo"}
          primaryButton={{
            primaryLabel: "Aceptar",
            onPrimaryClick: () => deleteDepartures(newDeparturesData),
          }}
          secondaryButton={{
            secondaryLabel: "Cancelar",
            onSecondaryClick: setShowDeleteDeparturesModal,
          }}
        >
          {showMessageError && <span>{messageError}</span>}
          <p>
            Estas seguro de que deseas eliminar el vuelo numero
            {newDeparturesData.flight} con origen {newDeparturesData.destiny}
          </p>
        </Modal>
      )}
    </div>
  );
}
