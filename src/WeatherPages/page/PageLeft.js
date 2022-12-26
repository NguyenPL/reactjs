import "./css/pageleft.css";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import weatherSVG from "../img/weather.svg";
import {
  fetchWeather7Action,
  fetchWeatherAction,
} from "../redux/slices/weatherslices";
import axios from "axios";
import { URL_Location } from "../redux/slices/Api";
import { text } from "@fortawesome/fontawesome-svg-core";
import { type } from "@testing-library/user-event/dist/type";
//import { Autocomplete } from "@mui/material";



const PageLeft = ({dataSearch, placeholder}) => {
  const state = useSelector((state) => state);
  const { weather, loading, error } = state;
  const [location, setLocation] = useState("Ho Chi Minh");
  const [city, setCity] = useState([]);
  //console.log(city);
  const dispatch = useDispatch();
  const  weatherIcon  = weather?.current;
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered ,setWordEntered] =useState("");
  const [textSearch, setText] = useState([]);
  const [showSearch, setshowSearch] = useState("");
  const [test,setTest] =useState('');
  const [open, setOpen] = useState(false);
  let menuRef = useRef();
  // console.log(showSearch);
  // console.log(test);
  // console.log("search",textSearch);
  // const hanldFilter = (event) =>{
  //   const searchWord = event.target.value;
  //   const newFilter = dataSearch.filter((value) => {
  //     return value.name.toLowerCase().includes(searchWord.toLowerCase());
  //   });
  
  //   if(searchWord === ""){
  //     setFilteredData([]);
  //   }else{
  //     setFilteredData(newFilter);
  //   }
  // };
  

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };
    document.addEventListener("mousedown", handler);
    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  });
  const onSearch=(searchValue)=>{
    setTest(searchValue)
  }

  const handlSearchHeader = (event) =>{
    const showSearch = [];
    
   
    if(event.target.value.length != 0){
      dataSearch.filter((value) =>{
        const searchValue = event.target.value.toLowerCase();
        //  console.log("sadasd",searchValue); 
        const searchDataHeader = value.name.toLowerCase();
        return(searchValue && searchDataHeader.startsWith(searchValue) && searchDataHeader!== searchValue); 
      }).map((value, index)=>{
        showSearch[index] = value;
      });
      setshowSearch(showSearch);
    }else{
      setshowSearch([])
    }
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
          //console.log(response.data);
        });
    },
    [location]
  );
  return (
    <div className="Container" ref={menuRef}>
      <section className="Page-left">
        <div className="search-input" onClick={()=>{setOpen(!open)}}>
          <input className="search-Left"
            type="text"
            placeholder={placeholder}
            onChange={handlSearchHeader}
            value={textSearch}
            
            onKeyPress={(event) =>{
              if (event.key === "Enter") {
                setLocation(event.target.value);
                dispatch(fetchWeather7Action());
              }
            }}
          />  
         
      </div>
      <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
      { showSearch.length != 0 && (
          <div className="dataSearch"> 
              {showSearch.slice(0,15).map((item, index)=>{
                return  <p onClick={()=>{
                  setText(item.name);
                }} key={index}>{item.name}</p>
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
