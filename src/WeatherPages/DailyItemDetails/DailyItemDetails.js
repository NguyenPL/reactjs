
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./DailyItemDetails.css"


const ItemDetails = () =>{
const [dataWeather, setDataWeather] = useState(null);
  const state = useSelector((state) => state);
  const { weather, loading, error, direct } = state;

   return(
      <div className="dataDailist">
         <div className="listDailist">
             <p>{new Date(weather?.current.dt * 1000).toLocaleString("en-GB", {weekday: "long",})}</p><br />
               <div className="listP">
               <label>Temp current{Math.ceil(Number(weather?.current.temp - 275.15))}  &deg; C</label>
               
               <label>Clouds: {weather?.current.clouds}</label>
               <label>Humidity: {weather?.current.humidity}</label>
               <label>Wind speed: {weather?.current.wind_speed}</label>
               <label>Sunrice: {getTime(weather?.current.sunrise)}</label>
               <label>Sunset: {getTime(weather?.current.sunset)}</label>
               <label>wind_gust: {weather?.current.wind_gust}</label>
               <label>wind_deg: {weather?.current.wind_deg}</label>
               </div>
         </div>
      </div>   
   )
}
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