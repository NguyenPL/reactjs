import "./css/pageleft.css";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import weatherSVG from "../img/weather.svg";
import {
  fetchWeather7Action,
  fetchWeatherAction,
} from "../redux/slices/weatherslices";
import axios from "axios";
import { URL_Location, apiURL, apiKey, API_KEY } from "../redux/slices/Api";
import { text } from "@fortawesome/fontawesome-svg-core";
import { type } from "@testing-library/user-event/dist/type";
//import { Autocomplete } from "@mui/material";



const PageLeft = ({dataSearch, placeholder}) => {
  const state = useSelector((state) => state);
  const { weather, loading, error } = state;
  const [location, setLocation] = useState("Thai Nguyen");
  const [city, setCity] = useState([]);
  //console.log(city);
  const dispatch = useDispatch();
  const  weatherIcon  = weather?.current;
  const [textSearch, setText] = useState('');
  const [showSearch, setshowSearch] = useState("");
  const [test,setTest] =useState('');
  const [open, setOpen] = useState(false);
  const [iplocation, setIpLocation] = useState('');
  const [country, setCountry] = useState('');
  const [Error,setError] = useState('');
  const [responseCity, setResponseCity] = useState('');
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
  
  const apiURL = 'https://ipgeolocation.abstractapi.com/v1/?api_key=38f51875d91d4feba0321adf68205f44';
 useEffect(
  (data)=> {
     axios.get(apiURL,{
      params: {
        q: location,
        units: "Metric",
        lang: "en",
      },
     }).then(function(response){   
      if(response.data) 
            console.log("data",response.data);
            setResponseCity(response.data.city);
            setCountry(response.data.country_code)
          });
     
 },[]);
    
  


// const locate =() => {
//   const posStatus = document.querySelector('#posStatus');
//   const locInfo = document.querySelector('#locInfo'); 
//   posStatus.innerHTML = 'Đang lấy vị trí...'
//   if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//           const lat = position.coords.latitude;
//           const long = position.coords.longitude; posStatus.innerHTML = 'Vị Trí Của Bạn:';// Display Latitude and Logitude
//           locInfo.innerHTML = `Lat: ${lat}, Lon: ${long}`;      // Create the link. Use map=15-19 for zooming out and in
//           // Pass lat and long to openstreetmap 
//           locInfo.href = `https://www.openstreetmap.org/#map=19/${lat}/${long}`;
//           //locInfo.href = `http://api.openweathermap.org/data/2.5/weather?&appid=${lat}/${long}`;

//           console.log(locInfo);
//       });
//   }
// }


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
    setText(event.target.value);
    //console.log("dâta", setText);
   
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
          //setCountry(response.data.sys.country)
          console.log(response.data);
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
      <div className={`dropdown-menu ${open?'active' : 'inactive'}`}>
      { showSearch.length != 0 && (
          <div className="dataSearch"> 
              {showSearch.slice(0,10).map((item, index)=>{
                return  <p className="boder-buttom" 
                onClick={()=>{
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
                    "@4x.png"} 
              />
            ): null}    
 
          </div>
          <div className="left-flex">
                <h2 className="name-city">{city}</h2>
                <h3 className="name-city">
                  {Math.ceil(Number(weather?.current.temp - 275.15))} <span>°C</span>
                </h3>
                <p className="p-left-1">{getTime(weather?.current.dt)}</p>
                {Array.isArray(weatherIcon?.weather) ? (
                  <p className="p-left-2">{weatherIcon.weather[0].description}</p>
                  ): null}
                <p className="p-left-3"> clouds: {weather?.current.clouds} %</p>
          </div>

        </div>
        <div className="address">
            <span>Vị Trí Của Bạn:  <span className="name-text" >{responseCity}</span>,<span className="name-text" >{country}</span> </span>
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
    date.toLocaleTimeString("en-US",{
      hour: "numeric",
      minute: "numeric",
      //day: "numeric",
      //month: "numeric"
    })
  );
}

export default PageLeft;
