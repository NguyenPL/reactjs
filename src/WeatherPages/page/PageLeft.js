import "./css/pageleft.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import weatherSVG from "../img/weather.svg";
import {
  fetchWeather7Action,
  fetchWeatherAction,
} from "../redux/slices/weatherslices";
import axios from "axios";
import { URL_Location } from "../redux/slices/Api";
import { current } from "@reduxjs/toolkit";

//display icon https://openweathermap.org/img/wn/${icon}.png
export const PageLeft = () => {
  const [lat, setLat] = useState("21.0294498");
  const [lon, setLon] = useState("105.8544441");
  const [dataWeather, setDataWeather] = useState([]);
  const [location, setLocation] = useState("Ho Chi Minh");
  const [city, setCity] = useState("");

  const state = useSelector((state) => state);
  const { weather, loading, error } = state;
  const dispatch = useDispatch();

  useEffect(
    (data) => {
      axios
        .get(URL_Location, {
          params: {
            q: location,
            units: "Metric",
            lang: "en",
          },
        })
        .then(function (response) {
          if (response.data.coord) {
            dispatch(fetchWeather7Action(response.data.coord));
          }
          setCity(response.data.name);
          //console.log(response.data);
          //console.log(weather);
        });
    },
    [location]
  );

  return (
    <div className="Container">
      <section className="Page-left">
        <div className="input-buttom">
          {/* Input */}
          <input
            className="search-left"
            type="text"
            placeholder="Search City"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                setLocation(event.target.value);
                dispatch(fetchWeather7Action());
                //dispatch(fetchWeatherAction(location));
              }
            }}
          ></input>
        </div>
        <div className="flex-list">
          <div className="forecast-icon">
            <img
              className="img-fix"
              src={`https://www.pngall.com/wp-content/uploads/11/Weather-PNG-Background.png,`}
              alt=""
            />
            {/* {weather ? (
              <img
                className="img-fix"
                src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                alt=""
              />
            ) : null} */}
          </div>

          <h2 className="name-city">{city}</h2>
          <h3 className="tempp">
            {Math.ceil(Number(weather?.current.temp - 275.15))} <span>°C</span>
          </h3>
          <p>{getTime(weather?.current.dt)}</p>
          {/* <p className="main">{weather?.weather.main}</p>{" "} */}
          {/* <p className="description">{weather?.current?.country}</p> */}
          <p> clouds: {weather?.current.clouds} %</p>

          <img
            className="img-fix-city"
            src="https://nemtv.vn/wp-content/uploads/2019/01/ha-noi-ve-dem-8.jpg"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

function getTime(time) {
  var date = new Date(time * 1000);
  var day = date.getDay();
  const options = { weekday: "long" };
  //var day = new Intl.DateTimeFormat("en-US", options).format(day);
  var day = new Intl.DateTimeFormat("en-US", options).format(date.Now);
  return (
    day +
    ",  " +
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      //day: "numeric",
      //month: "numeric"
    })
  );
}

export default PageLeft;
