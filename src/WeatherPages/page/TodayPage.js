// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./css/TodayPage.css";
// import { useDispatch, useSelector } from "react-redux";
// import { FiSun, FiWind, FiPercent, FiClock } from "react-icons/fi";
// import axios from "axios";
// import { FaTemperatureLow } from "react-icons/fa";
// import { WiSunrise, WiSunset } from "react-icons/wi";

// const Today = () => {
//   // const [lat, setLat] = useState("21.0294498");
//   // const [lon, setLon] = useState("105.8544441");
//   // const [dataWeather, setDataWeather] = useState([]);
//   // const [location, setLocation] = useState("Thai Nguyen");
//   // const [city, setCity] = useState("");
//   const [dataWeather, setDataWeather] = useState([]);
//   const state = useSelector((state) => state);
//   const { weather, loading, error } = state;
//   //   const url_location = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=b8e7450258e4f07d5bf213472684b242`;
//   //   const url_data = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ac2e59088cbe65dddd76cc799a3f7efb`;

//   //   const searchLocation = (event) => {
//   //     if (event.key === "Enter") {
//   //       axios.get(url_location).then((Response) => {
//   //         setLat(Response.data[0].lat);
//   //         setLon(Response.data[0].lon);
//   //         setCity(Response.data[0].name);
//   //       });
//   //     }
//   //   };
//   //   useEffect(() => {
//   //     axios.get(url_location).then((Response) => {
//   //       setLat(Response.data[0].lat);
//   //       setLon(Response.data[0].lon);
//   //       setCity(Response.data[0].name);
//   //     });
//   //   }, []);
//   //   useEffect(() => {
//   //     axios.get(url_data).then((Response) => {
//   //       setDataWeather(Response.data);
//   //       console.log(Response.data);
//   //     });
//   //   }, [lat, lon]);
//   return (
//     <div className="component-today">
//       <div className="right-today">
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
//             <li className="uv-index">
//               <h3>UV -index</h3>
//               <p className="P">
//                 <FiSun size={50} color="orange" />
//               </p>
//               {/* <h1>{weather.current ? weather.current.uvi : null}</h1> */}
//             </li>

//             <li className="uv-index">
//               <h3>Wind -Status</h3>
//               <p className="P">
//                 <FiWind size={50} color="#6699FF" />
//               </p>
//               <h1>
//                 {weather?.wind.speed}
//                 Km/h
//               </h1>
//             </li>
//             <li className="uv-index">
//               <h3>Sunrise & Sunset</h3>
//               <div className="flex">
//                 <p>
//                   <WiSunrise className="PP" size={50} color="orange" />
//                 </p>
//                 <h6>{getTime(weather?.sys.sunrise)}</h6>
//               </div>
//               <div className="flex-buttom">
//                 <p>
//                   <WiSunset className="FF" size={50} color="orange" />
//                 </p>
//                 <h6>{getTime(weather?.sys.sunset)}</h6>
//               </div>
//             </li>
//             <li className="uv-index">
//               <h3>humidity</h3>
//               <p className="P">
//                 <FiPercent size={50} color="#6699FF" />
//               </p>
//               <h1>{weather?.main?.humidity} %</h1>
//             </li>
//             <li className="uv-index">
//               <h3>visibility</h3>
//               <p className="P">
//                 <FiClock size={50} color="orange" />
//               </p>
//               <h1>{weather?.visibility}/m</h1>
//             </li>
//             <li className="uv-index">
//               <h3>pressure</h3>
//               <p className="P">
//                 <FaTemperatureLow size={50} color="#6699FF" />
//               </p>
//               <h1>{weather?.main?.pressure}</h1>
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
//   //var day = new Intl.DateTimeFormat("en-US", options).format(date);
//   //var day = new Intl.DateTimeFormat("en-VN", options).format(date);
//   return (
//     day +
//     "," +
//     date.toLocaleString("en-US", {
//       hour: "numeric",
//       minute: "numeric",
//       //day: "numeric",
//       //month: "numeric"
//       //hour12: true,
//     })
//   );
// }

// export default Today;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/TodayPage.css";
import { useDispatch, useSelector } from "react-redux";
import { FiSun, FiWind, FiPercent, FiClock } from "react-icons/fi";
import axios from "axios";
import { FaTemperatureLow } from "react-icons/fa";
import { WiSunrise, WiSunset } from "react-icons/wi";
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

        <div className="content-today">
          <ul className="list-ul">
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
                Km/h
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
              <p>Pumidity</p>
              <p className="P">
                <FiPercent size={50} color="#6699FF" />
              </p>
              <h1>{weather?.current.humidity} %</h1>
            </li>
            <li className="uv-index">
              <p>Visibility</p>
              <p className="P">
                <FiClock size={50} color="orange" />
              </p>
              <h1>{weather?.current.visibility}/m</h1>
            </li>
            <li className="uv-index">
              <p>Pressure</p>
              <p className="P">
                <FaTemperatureLow size={50} color="#6699FF" />
              </p>
              <h1>{weather?.current?.pressure}</h1>
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
