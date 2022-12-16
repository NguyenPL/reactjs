import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/TodayPage.css";
import { useDispatch, useSelector } from "react-redux";
import { FiSun, FiWind, FiPercent, FiClock } from "react-icons/fi";
import axios from "axios";
import { FaTemperatureLow } from "react-icons/fa";
import { WiSunrise, WiSunset, WiHumidity } from "react-icons/wi";
import {
  fetchWeather7Action,
  fetchWeatherAction,
} from "../redux/slices/weatherslices";

const Today = () => {
  const [dataWeather, setDataWeather] = useState([]);
  const state = useSelector((state) => state);
  const { weather, loading, error } = state;
  //console.log(weather);

  return (
    <div className="component-today">
      <div className="right-today">
        <nav>
          <ul>
            <li>
              <Link className="bdbtn-today" to="/Today">
                Today
              </Link>
            </li>
            <li>
              <Link to="/Week">Week</Link>
            </li>
            <li>
              <Link to="/Hour">Hour</Link>
            </li>
          </ul>
        </nav>

        <div className="content-today">
          <ul className="list-ul-today">
            <li className="uv-index">
              <p>UV -index</p>
              <p className="P">
                <FiSun size={50} color="orange" />
              </p>
              <h1>{weather?.current.uvi}</h1>
            </li>

            <li className="uv-index">
              <p>Wind -Status</p>
              <p className="P">
                <FiWind size={50} color="#6699FF" />
              </p>
              <h1>
                {weather?.current.wind_speed}
                Km/s
              </h1>
            </li>

            <li className="uv-index">
              <p>Sunrise & Sunset</p>
              <div className="flex">
                <p>
                  <WiSunrise className="PP" size={60} color="orange" />
                </p>
                <h6>{getTime(weather?.current.sunrise)}</h6>
              </div>
              <div className="flex-buttom">
                <p>
                  <WiSunset className="FF" size={60} color="orange" />
                </p>
                <h6>{getTime(weather?.current.sunset)}</h6>
              </div>
            </li>

            <li className="uv-index">
              <p>Humidity</p>
              <p className="P">
                <WiHumidity size={50} color="#6699FF" />
              </p>
              <h1>{weather?.current.humidity} %</h1>
            </li>
            <li className="uv-index">
              <p>Visibility</p>
              <p className="P">
                <FiClock size={50} color="orange" />
              </p>
              <h1>{(weather?.current.visibility / 1000).toFixed(0)} km</h1>
            </li>
            <li className="uv-index">
              <p>Pressure</p>
              <p className="P">
                <FaTemperatureLow size={50} color="#6699FF" />
              </p>
              <h1>
                {weather?.current?.pressure}
                <a className="hpa">hPa</a>
              </h1>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

function getTime(time) {
  var date = new Date(time * 1000);
  var day = date.getDay();
  const options = { weekday: "long" };
  //var day = new Intl.DateTimeFormat("en-US", options).format(date);
  //var day = new Intl.DateTimeFormat("en-VN", options).format(date);
  return (
    "" +
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      //day: "numeric",
      //month: "numeric"
      //hour12: true,
    })
  );
}

export default Today;
