import React, {useState} from 'react'
import "./Home.css";

function Home() {

    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', "October", 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day} ${month} ${date}, ${year}`
    }

    
    const [weatherData, setWeatherData] = useState([{}]);
    const apiKey = '23078d05d26dfb3866e6d951ae068ca7';
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState(true);

    const search = event => {
        if (event.key === 'Enter') {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`).then(
                response => response.json()
            ).then(
                data => {
                    setWeatherData(data);
                    setCity('')
                }
            )
        }

    }    

      return (
        <div className={(typeof weatherData.main != 'undefined') ? ((weatherData.main.temp > 50) ? 'app warm' : 'app'): 'app'}>
            <main>
                <div className='search-box'>
                    <input type='text'
                        className='search-bar'
                        placeholder='Enter City...'
                        onChange={e => setCity(e.target.value)}
                        value={city}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weatherData.main != 'undefined') ? (
                    <div>
                        <div className='location-box'>
                            <div className='location'>{weatherData.name}, {weatherData.sys.country}</div>
                            <div className='date'>{dateBuilder(new Date())}</div>
                        </div>
                                
                        <div className='weather-box'>
                            <div className='temp' onClick={()=> unit ? setUnit(false) : setUnit(true)}>{unit ? <p>{Math.round(weatherData.main.temp)}ºF</p> : <p>{Math.round((weatherData.main.temp-32)*5/9)}ºC</p>}</div>
                            <div className='weather'>{weatherData.weather[0].main}</div>
                        </div>

                    </div>
                ): ('')}

                {(weatherData.cod === '404') ? (
                    <p class='error'>No city found. Maybe try just putting the city name?</p>
                ): ('')}

                <div className='credit'>
                    <p className='my-name'>Weather Wizard by <a href="https://arpanneupane.com" target="__blank">Arpan Neupane</a></p>
                </div>


            </main>

        </div>

      )
}

export default Home;
