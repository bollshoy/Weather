import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Weather.css';
import sunriseImg from '../../img/sunrise.png'
const API_KEY = '7a55c69f277626c4683a7466bb09574d';

const Weather = () => {
    const [cityInput, setCityInput] = useState('Kiev');
    const [cityData, setCityData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput},ua&appid=${API_KEY}&units=metric`)
            .then(response => {
                setCityData(response.data);
                setError(null);
            })
            .catch(error => {
                setError(error);
                setCityData(null);
            });
    }, [cityInput]);

    const handleChange = (e) => {
        setCityInput(e.target.value);
    };

    return (
        <div className='content'>
            <input
                type="text"
                placeholder="Enter city"
                value={cityInput}
                onChange={handleChange}
            />
            {error && <div>Error: {error.message}</div>}
            {cityData ? (
                <div>
                    <div className="city__title">
                        <h1 className='city'>{cityData.name}</h1>
                        <img src={sunriseImg} alt="img" className='sunImg'/>
                    </div>
                    <p>Temperature: {cityData.main.temp} °C</p>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Weather;
