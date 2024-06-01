import "./MeteoCard.css";
import React from "react";
import icons from "../assets/icons";
import { dateOptions, timeToString } from "../assets/utils";

export default function MeteoCard({ weatherDatas }) {
  const { city, country, temp, icon } = weatherDatas;

  const date = new Date();
  const day = date.toLocaleDateString("fr-FR", dateOptions);
  const hoursString = timeToString(date.getHours());
  const minutesString = timeToString(date.getMinutes());
  const hour = `${hoursString}:${minutesString}`;

  return (
    <div className='meteo-card-wrapper'>
      <div className='card'>
        <div className='card-header'>
          <span className='date'>
            <small>{day}</small>
          </span>
          <span className='time'>{hour}</span>
        </div>
        <div className='card-body'>
          <div className='city-infos'>
            <h4>
              {city}, {country}
            </h4>
            <h3>{temp}°C</h3>
          </div>
          <div
            className='card-img'
            style={{
              background: "linear-gradient(45deg, #a544ff 0%, #5d2cfe 100%)",
            }}
          >
            <img src={`/icons/${icon}.svg`} alt='weather' />
          </div>
        </div>
        <div className='card-footer'>
          <p>{icons[icon]}.</p>
        </div>
      </div>
    </div>
  );
}
