// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./css/WeekPage.css";
// import axios from "axios";
// import { BsCloudSun } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";
// import "moment-timezone";
// import { URL_DATA } from "../redux/slices/Api";
// import { fetchWeather7Action } from "../redux/slices/weatherslices";

// const Week = () => {

//   const state = useSelector((state) => state);
//   const { weather, loading, error } = state;
//   return (
//     <div className="component-week">
//       <div className="right-week">
//         <nav>
//           <ul>
//             <li>
//               <Link to="/Today">Today</Link>
//             </li>
//             <li>
//               <Link to="/Week">Week</Link>
//             </li>
//             <li>
//               <Link to="/Hour">Hour</Link>
//             </li>
//           </ul>
//         </nav>

//         <div className="content">
//           <ul className="list-ul">
//             <li className="list-li">
//               <p>{weather?.main.temp}</p>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// function getTime(time) {
//   var date = new Date(time * 1000);
//   var day = date.getDay();
//   const options = { weekday: "long" };
//   var day = new Intl.DateTimeFormat("en-US", options).format(date);

//   return (
//     day +
//     ", " +
//     date.toLocaleString("en-US", {
//       //hour: "numeric",
//       //minute: "numeric",
//       day: "numeric",
//       month: "numeric",
//       //hour12: true,
//     })
//   );
// }
// export default Week;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/WeekPage.css";
import "../DailyItemDetails/DailyItemDetails"
import { useDispatch, useSelector } from "react-redux";
import "moment-timezone";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

const Week = () => {
  const [dataWeather, setDataWeather] = useState(null);
  const state = useSelector((state) => state);
  const { weather, loading, error, direct } = state;
  console.log(weather);

  const clickEvent = () => {
    alert("helu");
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
  };
  return (
    <div className="component-week">
      <div className="right-week">
        <nav>
          <ul>
            <li>
              <Link to="/Today">Today</Link>
            </li>
            <li>
              <Link to="/Week">Week</Link>
            </li>
            <li>
              <Link to="/Hour">Hour</Link>
            </li>
          </ul>
        </nav>

        <div className="content-week">
          <ul className="list-ul">
            {weather
              ? weather.daily.map((item, index) => (
                  <li className="uv-index-week" onClick={() => clickEvent()}>
                    <p className="icon-week">{getTime(item.dt)}</p>

                    <p className="l">
                      {/* weather logo */}
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt="/"
                      />
                    </p>
                    <div className="temp-fells">
                      <p className="l">
                        {Math.ceil(Number(item.temp.min - 275.15))}{" "}
                        <span>°</span>-
                        {/* {Math.round((item.temp.day = (32 * 5) / 9))}&deg;C{" "} */}
                        <p>
                          {Math.ceil(Number(item.temp.max - 275.15))}{" "}
                          <span>°</span>
                          {/* {Math.round((item.feels_like.day = (32 * 5) / 9))} */}
                        </p>
                      </p>
                    </div>
                  </li>
                  
                ))
              : null}

              
          </ul>    
        </div>
      </div>
    </div>
  );
};

function getTime(time) {
  var date = new Date(time * 1000);
  var dayy = date.getDay();
  const options = { weekday: "long" };
  var dayy = new Intl.DateTimeFormat("en-US", options).format(date);

  return (
    dayy +
    ", " +
    date.toLocaleDateString("en-US", {
      //hour: "numeric",
      //minute: "numeric",
      
      dayy: "numeric",
      month: "numeric",
      // year:"2-digit"
    
    })
  );
}
export default Week;
