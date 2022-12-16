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
import LocationBox from "../DailyItemDetails/LocationBox";


//display icon https://openweathermap.org/img/wn/${icon}.png
const PageLeft = () => {
  const state = useSelector((state) => state);
  const { weather, loading, error } = state;
  const [lat, setLat] = useState("21.0294498");
  const [lon, setLon] = useState("105.8544441");
  
  const [location, setLocation] = useState("Ho Chi Minh");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const  weatherIcon  = weather?.current;
  //const image = useState(weather?.Prototype?.__proto__);
  //console.log("image", image);
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
          console.log(response.data); 
        });
    },
    [location]
  );
  const sideBar=({})=>{
    
  }
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
            {Array.isArray(weatherIcon?.weather) ? (
              <img className="sizeImg" 
                src={
                    "http://openweathermap.org/img/wn/" +
                    weatherIcon.weather[0].icon + 
                    "@2x.png"} 
              />
            ): null}    
 
          </div>
          <div className="left-flex">
                <h2 className="name-city">{city}</h2>
                <h3 className="name-city">
                  {Math.ceil(Number(weather?.current.temp - 275.15))} <span>°C</span>
                </h3>
                <p className="p-left">{getTime(weather?.current.dt)}</p>
                {Array.isArray(weatherIcon?.weather) ? (
                  <p className="p-left">{weatherIcon.weather[0].description}</p>
                  ): null}
                <p className="p-left"> Clouds: {weather?.current.clouds} %</p>
          </div>
          

            
        </div>
        <div className="image">
                <img
                    className="img-fix-city"
                    src="https://nemtv.vn/wp-content/uploads/2019/01/ha-noi-ve-dem-8.jpg"
                    alt=""
                  />
                  {/* <LocationBox
                    image={image}
                   >

                   </LocationBox> */}
                   <p>{}</p>
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
