import React, { useState } from "react";
import "./Recents.css";
import Modal from "./Modal";
import { Link } from "react-router-dom";
require("dotenv").config();

let json = require("./recents.json");

function Recents() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [weatherData, setWeatherData] = useState([{}]);

  // this function will both show the modal and also get the weather.
  const showModal = (city) => {
    setIsModalVisible(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        if (weatherData.main !== "undefined") {
          console.log(data.name);
        }
      });
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="app warm">
      {isModalVisible ? (
        <div className="backdrop" onClick={closeModal}></div>
      ) : null}
      <main>
        <div className="header">Recents</div>
        <div className="recents">
          {json.recents.map((item, i) => (
            <div className="recent" key={i}>
              {item.city !== "Your recent searches will be here." ? (
                <div onClick={() => showModal(item.city)}>
                  <p className="city" style={{ cursor: "pointer" }}>
                    {item.city}
                  </p>
                </div>
              ) : (
                <p className="city">{item.city}</p>
              )}
            </div>
          ))}
        </div>
        <div className="credit">
          <p className="my-name">
            Developed by{" "}
            <a href="https://arpanneupane.com" target="__blank">
              Arpan Neupane
            </a>
          </p>
        </div>
        <br></br>
        <div className="recents">
          <Link
            to="/"
            style={{ textDecoration: "none", color: "#fff", fontSize: "1.2em" }}
          >
            Back To Weather
          </Link>
        </div>
        <Modal
          location={
            typeof weatherData.main !== "undefined"
              ? `${weatherData.name}, ${weatherData.sys.country}`
              : "Oops!"
          }
          temp={
            typeof weatherData.main !== "undefined"
              ? `${weatherData.main.temp}`
              : "Trying to retrieve temperature..."
          }
          min={
            typeof weatherData.main !== "undefined"
              ? `${weatherData.main.temp_min}`
              : "Trying to retrieve temperature..."
          }
          max={
            typeof weatherData.main !== "undefined"
              ? `${weatherData.main.temp_max}`
              : "Trying to retrieve temperature..."
          }
          weather={
            typeof weatherData.main !== "undefined"
              ? `${weatherData.weather[0].main}`
              : "Trying to retrieve weather..."
          }
          showModal={isModalVisible}
          closeModal={closeModal}
        />
      </main>
    </div>
  );
}

export default Recents;
