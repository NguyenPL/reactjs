// import React, {useEffect, useState} from 'react';
// import "./css/pageleft.css"
// import axios from 'axios';

// const PageLeft = () => {

//    const [lat, setLat] = useState('21.0294498');
//    const [lon, setLon] = useState('105.8544441');
//    const [dataWeather, setDataWeather] = useState([]);
//    const [location, setLocation] = useState('Thai Nguyen');
//    const [city, setCity] = useState('');

//    const url_location = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=b8e7450258e4f07d5bf213472684b242`;
//    const url_data = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ac2e59088cbe65dddd76cc799a3f7efb`

//    const searchLocation = (event) =>{
//       if(event.key === "Enter") {
//          axios.get(url_location).then((Response)=>{
//             setLat(Response.data[0].lat);
//             setLon(Response.data[0].lon);
//             setCity(Response.data[0].name);
//       })
//       }
//     }
//     useEffect(() => {
//       axios.get(url_location).then((Response)=>{
//          setLat(Response.data[0].lat);
//          setLon(Response.data[0].lon);
//          setCity(Response.data[0].name);
//       })
//     }, []);
//     useEffect(() => {
//       axios.get(url_data).then((Response)=>{
//          setDataWeather(Response.data);
//          console.log(Response.data);
//       })
//     }, [lat, lon]);
//    return (
//    <div className='Component'>
//          <div className="left">
//             <div >
//                <input value={location} onChange={event => setLocation(event.target.value)}
//                onKeyPress = {searchLocation}
//                className='search' type="text" placeholder='search'/>

//               <p><img className='icon' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMYTNaisA0GJu7VNW8xK_pX3r7r46wo__ihA&usqp=CAU" alt="" /></p>
//             </div>

//             <div className="weather">
//                <p className='bolll'>{city}</p>
//                <p className='bolll'>{dataWeather.current ? Math.round(dataWeather.current.temp-273.15) : null}&deg;C</p>
//                <p className='time'>{getTime(dataWeather.current ? dataWeather.current.dt : null)}</p>

//                <p>Overcast  Clouds</p>
//                <p> Clouds: {dataWeather.current ? dataWeather.current.clouds : null}</p>

//                <div className="img">
//                   <img className='img-city' src="http://media.dulich24.com.vn/diemden/ha-noi-9/ddffeb6a-ea3b-480b-acb8-a0394fba6599-2.JPG" alt="" />
//                </div>
//             </div>
//          </div>

//    </div>
//    );
// };

// function getTime(time) {
//    var date = new Date(time * 1000);
//    var day = date.getDay();
//    const options = { weekday: "long" };
//    var day = new Intl.DateTimeFormat("en-US", options).format(date);

//    return (
//       day + "," +
//       date.toLocaleString("en-US", {
//          hour: "numeric",
//          minute: "numeric",
//        //day: "numeric",
//        //month: "numeric"
//        //hour12: true,
//      })
//    );
//  }

// export default PageLeft;
// import "./css/pageleft.css";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import weatherSVG from "../img/weather.svg";
// import {
//   fetchWeather7Action,
//   fetchWeatherAction,
// } from "../redux/slices/weatherslices";
// import axios from "axios";
// import { URL_Location, URL_Data } from "../redux/slices/Api";

// //display icon https://openweathermap.org/img/wn/${icon}.png
// export const Search = () => {
//   const [lat, setLat] = useState("21.0294498");
//   const [lon, setLon] = useState("105.8544441");
//   const [dataWeather, setDataWeather] = useState([]);
//   const [location, setLocation] = useState("Thai Nguyen");

//   const state = useSelector((state) => state);
//   const { weather, loading, error } = state;

//   const dispatch = useDispatch();
//   console.log();

//   // const searchLocation = (event) => {
//   //   if (event.key === "Enter") {
//   //     axios.get(URL_Location).then((Response) => {
//   //       setLat(Response.data[0].lat);
//   //       setLon(Response.data[0].lon);
//   //       setLocation(Response.data[0].name);
//   //     });
//   //   }
//   // };

//   // useEffect(() => {
//   //   axios.get(URL_Location).then((Response) => {
//   //     setLat(Response.data[0].lat);
//   //     setLon(Response.data[0].lon);
//   //     setLocation(Response.data[0].name);
//   //   });
//   // }, []);

//   // useEffect(() => {
//   //   axios.get(URL_Data).then((Response) => {
//   //     setDataWeather(Response.data);
//   //     console.log(Response.data);
//   //     dispatch(fetchWeatherAction(""));
//   //   });
//   // }, [lat, lon]);

//   // useEffect(() => {
//   //   dispatch(fetchWeatherAction(""));
//   // }, []);

//   // const handleChangedata = (e) => {
//   //   setDataWeather(e.target.value);
//   //   console.log(Response.data);
//   // };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   dispatch(fetchWeatherAction(null, null, city));

//   //   console.log("Fetching Weather");
//   // }
//   return (
//     <div className="Container">
//       <section className="Page-left">
//         <div className="input-buttom">
//           {/* Input */}
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             placeholder="Search City"
//             className="search-left"
//           ></input>
//           {/* Button */}
//           <button
//             onClick={() =>
//               dispatch(
//                 fetchWeatherAction(location),
//                 dispatch(fetchWeather7Action())
//               )
//             }
//             type="button"
//             className="buttom"
//           >
//             Search
//           </button>
//         </div>

//         {/* Content goes here */}
//         {loading ? (
//           <h1 className="">Loading please wait...</h1>
//         ) : error ? (
//           <h1 className="">{error?.message}</h1>
//         ) : (
//           <div className="">
//             <span className="img-left">
//               {/* weather logo */}
//               <img
//                 className="w-56 "
//                 src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
//                 alt="/"
//               />
//             </span>
//             <div className="flex-list">
//               <h3 className="city">
//                 {weather?.name}, {weather?.sys?.country}
//               </h3>
//               <p className="temp">
//                 {Math.ceil(Number(weather?.main.temp))} <span>°C</span>
//               </p>
//               <p className="main">{weather?.weather[0].main}</p>{" "}
//               <p className="description">
//                 {weather?.weather[0].description}{" "}
//                 {/* {weather?.name}, {weather?.sys?.country} :{" "} */}
//                 {Math.ceil(Number(weather?.main.temp))}
//               </p>
//               <p> humidity{weather?.main?.humidity} %</p>
//             </div>

//             <a>
//               <span className="">
//                 {/* weather logo */}
//                 <img
//                   className="w-56 "
//                   src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
//                   alt="/"
//                 />
//               </span>
//             </a>
//           </div>
//         )}
//       </section>
//       {/* Footer */}
//     </div>
//   );
// };

// export default Search;

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
  const [location, setLocation] = useState("Thai Nguyen");
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
          setCity(response.data.name)
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
                  
                    <img className="img-fix"
                      src={`https://www.pngall.com/wp-content/uploads/11/Weather-PNG-Background.png,`}
                      alt=""
                    />
               
            </div>
  
            <h2 className="name-city">{city}</h2>
              
            <h3 className="tempp">
              {Math.ceil(Number(weather?.current.temp - 275.15))} <span>°C</span>
            </h3>
            <p>{getTime(weather?.current.dt)}</p>
            {/* <p className="main">{weather?.weather.main}</p>{" "} */}
            {/* <p className="description">{weather?.current?.country}</p> */}
            <p> clouds: {weather?.current.clouds} %</p>

            <img className="img-fix-city" src="https://nemtv.vn/wp-content/uploads/2019/01/ha-noi-ve-dem-8.jpg" alt="" />
          </div>
        </section>
      </div>
    );
  }


  

function getTime(time) {
  var date = new Date(time * 1000);
  var day = date.getDay();
  const options = { weekday: "long" };
  //var day = new Intl.DateTimeFormat("en-US", options).format(day);
  var day = new Intl.DateTimeFormat("en-US", options).format(date.Now);
  return (
    day+
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
