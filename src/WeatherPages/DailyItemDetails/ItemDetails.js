import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./ItemDetails.css";
import { DailyWeatherDetailsModel } from "./ItemDetails";

const ItemDetails = ({ data }) => {
  const state = useSelector((state) => state);
  const { weather, loading, error, direct } = state;
  //console.log(data);
  return (
    <div className="dataDailist">
      {data.clouds != null ? (
        ((<h2>{data.clouds}</h2>),
        (
          <div>
            <p>
              {new Date(data.dt * 1000).toLocaleString("en-GB", {
                weekday: "long",
              })}
            </p>
            <div className="listP">
              <label className="lb">
                Temp current {Math.ceil(Number(weather?.current.temp - 275.15))}{" "}
                &deg; C{" "}
              </label>
              <label className="lb">Clouds: {data.clouds} %</label>
              <label className="lb">Humidity: {data.humidity}%</label>
              <label className="lb">Wind speed: {data.wind_speed}</label>
              <label className="lb">Sunrice: {getTime(data.sunrise)}</label>
              <label className="lb">Sunset: {getTime(data.sunset)}</label>
              <label className="lb">wind_gust: {data.wind_gust}</label>
              <label className="lb">wind_deg: {data.wind_deg}</label>
            </div>
          </div>
        ))
      ) : (
        <div className="listDailist">
          <p className="pp">
            {new Date(weather?.current.dt * 1000).toLocaleString("en-GB", {
              weekday: "long",
            })}
          </p>

          <div className="listP">
            <label className="lb">
              Temp current: {Math.ceil(Number(weather?.current.temp - 275.15))}{" "}
              &deg; C
            </label>

            <label className="lb">Clouds: {weather?.current.clouds} %</label>
            <label className="lb">
              Humidity: {weather?.current.humidity} %
            </label>
            <label className="lb">
              Wind speed: {weather?.current.wind_speed}
            </label>
            <label className="lb">
              Sunrice: {getTime(weather?.current.sunrise)}
            </label>
            <label className="lb">
              Sunset: {getTime(weather?.current.sunset)}
            </label>
            <label className="lb">
              wind_gust: {weather?.current.wind_gust}
            </label>
            <label className="lb">wind_deg: {weather?.current.wind_deg}</label>
          </div>
        </div>
      )}
    </div>
  );
};
function getTime(time) {
  var date = new Date(time * 1000);
  var dayy = date.getDay();
  const options = { weekday: "long" };
  //var dayy = new Intl.DateTimeFormat("en-US", options).format(date);

  return (
    ": " +
    date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      //  dayy: "numeric",
      //  month: "numeric",
      //hour12: true,
    })
  );
}
export default ItemDetails;
