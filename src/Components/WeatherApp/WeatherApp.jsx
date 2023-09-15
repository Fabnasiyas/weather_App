import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../../Assets/search.png';
import clear_icon from '../../Assets/clear.png';
import cloud_icon from '../../Assets/cloud.png';
import drizzle_icon from '../../Assets/drizzle.png';
import rain_icon from '../../Assets/rain.png';
import snow_icon from '../../Assets/snow.png';
import wind_icon from '../../Assets/wind.png';
import humidity_icon from '../../Assets/humidity.png';

const WeatherApp = () => {
    let api_key = '528969fe0325ea5e1403d7b5efee4012';
    const [wicon, setWicon] = useState(cloud_icon);
    const [error, setError] = useState('');

    const search = async () => {
        const element = document.getElementsByClassName('cityInput');
        const location = element[0].value;

        if (!location) {
            setError(<div className="error-message" style={{ color: 'white', paddingTop: '50px', fontWeight: 'bold' }}>Please enter a location.</div>);

            return;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&&appid=${api_key}`;
        let response = await fetch(url);

        if (!response.ok) {
            setError(<div className="error-message" style={{ color: 'white', paddingTop: '60px', fontWeight: 'bold' }}>Location not found or unavailable.</div>);
            return;
        }


        setError('');

        let data = await response.json();
        const humidity = document.getElementsByClassName('humidity-percent');
        const wind = document.getElementsByClassName('wind-rate');
        const temperature = document.getElementsByClassName('weather-temp');
        const locationElement = document.getElementsByClassName('weather-location');

        humidity[0].innerHTML = data.main.humidity + ' %';
        wind[0].innerHTML = Math.floor(data.wind.speed) + ' km/h';
        temperature[0].innerHTML = Math.floor(data.main.temp) + '°C ';
        locationElement[0].innerHTML = data.name;

        // Set the weather icon based on the weather condition
        if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
            setWicon(clear_icon);
        } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
            setWicon(cloud_icon);
        } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
            setWicon(drizzle_icon);
        } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
            setWicon(drizzle_icon);
        } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
            setWicon(rain_icon);
        } else if (data.weather[0].icon === '010d' || data.weather[0].icon === '010n') {
            setWicon(rain_icon);
        } else if (data.weather[0].icon === '013d' || data.weather[0].icon === '013n') {
            setWicon(snow_icon);
        } else {
            setWicon(clear_icon);
        }
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="search" />
                <div className="search_icon" onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
