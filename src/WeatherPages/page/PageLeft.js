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

//import { Autocomplete } from "@mui/material";



const PageLeft = ({dataSearch, placeholder}) => {
  const state = useSelector((state) => state);
  const { weather, loading, error } = state;
  const [lat, setLat] = useState("21.0294498");
  const [lon, setLon] = useState("105.8544441");
  
  const [location, setLocation] = useState("Ho Chi Minh");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const  weatherIcon  = weather?.current;
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered ,setWordEntered] =useState("");
  const [textSearch, setText] = useState([]);
  console.log("search",textSearch);
  const hanldFilter = (event) =>{
    const searchWord = event.target.value;
    const newFilter = dataSearch.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
  
    if(searchWord === ""){
      setFilteredData([]);
    }else{
      setFilteredData(newFilter);
    }
  };
  const clearInput =()=>{
    setFilteredData([]);
    setWordEntered("");
  }
  
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
  return (
    <div className="Container">
      <section className="Page-left">
        <div className="search-input">
          <input className="search-Left" type="text" 
          placeholder={placeholder} 
          onChange={hanldFilter}
          value={textSearch}
            onKeyPress={(event) =>{
              if (event.key === "Enter") {
                setLocation(event.target.value);
                dispatch(fetchWeather7Action());
              }
            }}
          />
         
          {/* <input
            className="search-left"
            type="text"
            //{...params.InputProps}
            
            placeholder={placeholder}
            onChange={hanldFilter}
            value={}
            //options={dataSearch}
            //autoFocus="true"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                setLocation(event.target.value);
                dispatch(fetchWeather7Action());
              }
            }}
          > 
          </input>  */}

      </div>
      <div >
      { filteredData.length != 0 && (
          <div className="dataSearch">
              {filteredData.slice(0,15).map((value, index)=>{     
                return  <p onClick={()=>{
                  setText(value);
                }} key={index}>{value.name}</p>
                
              })}
          </div>
          )}
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
