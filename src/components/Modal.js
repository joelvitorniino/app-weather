import React, { useState } from "react";
import "./Modal.css";

function Modal({ location, temp, min, max, weather, showModal, closeModal }) {
  const [unit, setUnit] = useState(true);
  return (
    <div
      className="modal-container"
      style={{
        visibility: showModal ? "visible" : "hidden",
        opacity: showModal ? 1 : 0,
      }}
    >
      <div className="modal-header">
        <p>{location}</p>
        <span onClick={closeModal} className="close-modal-btn">
          &times;
        </span>
      </div>
      <hr></hr>
      <div className="modal-content">
        <div className="temperatures">
          <div
            className="normal-temp"
            onClick={() => (unit ? setUnit(false) : setUnit(true))}
          >
            {unit ? (
              <p style={{ cursor: "pointer" }}>Temp: {Math.round(temp)}ºF</p>
            ) : (
              <p style={{ cursor: "pointer" }}>
                Temp: {Math.round(((temp - 32) * 5) / 9)}ºC
              </p>
            )}
          </div>
          <div className="min">
            {unit ? (
              <p>
                Min: {Math.round(min)}ºF / Max: {Math.round(max)}ºF
              </p>
            ) : (
              <p>
                Min: {Math.round(((min - 32) * 5) / 9)}ºC / Max:{" "}
                {Math.round(((max - 32) * 5) / 9)}ºC
              </p>
            )}
          </div>
        </div>
        <div className="weather">Weather: {weather}</div>
      </div>
    </div>
  );
}

export default Modal;
