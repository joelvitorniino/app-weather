import React, { useState } from 'react'
import "./Weather.css";
import { Link } from 'react-router-dom';
require('dotenv').config()

function Weather() {
    const [weatherData, setWeatherData] = useState([{}]);
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState(true);

    let json = require('./recents.json');

    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', "October", 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${month} ${date}, ${year}`
    }

    const search = event => {
        if (event.key === 'Enter' && city !== '') {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`).then(
                response => response.json()
            ).then(
                data => {
                    setWeatherData(data);
                    setCity('')

                    // This conditional will add the location to the json array if it exists
                    if (data.cod !== '404' && data.main !== 'undefined') {
                        let newData = json['recents'].push({ city: data.name })
                    }
                }
            )
        }
    }


    return (
        <div className={(typeof weatherData.main != 'undefined') ? ((weatherData.main.temp > 50) ? 'app warm' : 'app') : 'app'}>
            <main>
                <div className='search-box'>
                    <input type='p'
                        className='search-bar'
                        placeholder='Enter City...'
                        onChange={e => setCity(e.target.value)}
                        value={city}
                        onKeyPress={search}
                    />
                </div>

                {(weatherData.cod === '404') ? (
                    <p class='error'>No city found. Maybe try just putting the city name?</p>
                ) : ('')}
                <br></br>
                {(typeof weatherData.main != 'undefined') ? (
                    <div>
                        <div className='location-box'>
                            <div className='location'>{weatherData.name}, {weatherData.sys.country}</div>
                            <div className='date'>{dateBuilder(new Date())}</div>
                        </div>

                        <div className='weather-box'>
                            <div className='temp' onClick={() => unit ? setUnit(false) : setUnit(true)}>{unit ? <p>{Math.round(weatherData.main.temp)}ºF</p> : <p>{Math.round((weatherData.main.temp - 32) * 5 / 9)}ºC</p>}</div>
                            {unit ? <p className='min-max'>Min: {Math.round(weatherData.main.temp_min)}ºF / Max: {Math.round(weatherData.main.temp_max)}ºF</p> : <p className='min-max'>Min: {Math.round((weatherData.main.temp_min - 32) * 5 / 9)}ºC / Max: {Math.round((weatherData.main.temp_max - 32) * 5 / 9)}ºC</p>}
                            <div className='weather'>{weatherData.weather[0].main}</div>
                        </div>


                    </div>
                ) : (
                    <div>
                        <div className='location-box'>
                            <div className='location'>Weather Wizard</div>
                            <div className='date'>{dateBuilder(new Date())}</div>
                        </div>

                        <div className='weather-box'>
                            <div className='weather'></div>
                        </div>


                    </div>
                )}

                <div className='credit'>
                    <p className='my-name'>Developed by <a href="https://arpanneupane.com" target="__blank">Arpan Neupane</a></p>
                </div><br></br>

                <div className='recents'>
                    <Link to='/recents' style={{ textDecoration: 'none', color: '#fff', fontSize: '1.2em' }}>View Recent Searches</Link>
                </div>





            </main>

        </div >

    )
}

export default Weather;
