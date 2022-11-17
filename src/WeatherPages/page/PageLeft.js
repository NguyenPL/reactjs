import React, {useEffect, useState} from 'react';
import "./css/pageleft.css"
import axios from 'axios';


const PageLeft = () => {
   
   const [lat, setLat] = useState('21.0294498');
   const [lon, setLon] = useState('105.8544441');
   const [dataWeather, setDataWeather] = useState([]);
   const [location, setLocation] = useState('Thai Nguyen');
   const [city, setCity] = useState('');
   
   const url_location = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=b8e7450258e4f07d5bf213472684b242`;
   const url_data = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ac2e59088cbe65dddd76cc799a3f7efb`

   const searchLocation = (event) =>{
      if(event.key === "Enter") {
         axios.get(url_location).then((Response)=>{
            setLat(Response.data[0].lat);
            setLon(Response.data[0].lon);
            setCity(Response.data[0].name);
      })
      }
    }
    useEffect(() => {
      axios.get(url_location).then((Response)=>{
         setLat(Response.data[0].lat);
         setLon(Response.data[0].lon);
         setCity(Response.data[0].name);
      })
    }, []);  
    useEffect(() => {
      axios.get(url_data).then((Response)=>{
         setDataWeather(Response.data);
         console.log(Response.data);
      })
    }, [lat, lon]);  
   return (
   <div className='Component'>
         <div className="left">
            <div >
               <input value={location} onChange={event => setLocation(event.target.value)}
               onKeyPress = {searchLocation}
               className='search' type="text" placeholder='search'/>
               
              <p><img className='icon' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMYTNaisA0GJu7VNW8xK_pX3r7r46wo__ihA&usqp=CAU" alt="" /></p>
            </div>
           
            <div className="weather">
               <p className='bolll'>{city}</p>
               <p className='bolll'>{dataWeather.current ? Math.round(dataWeather.current.temp-273.15) : null}&deg;C</p>       
               <p className='time'>{getTime(dataWeather.current ? dataWeather.current.dt : null)}</p>
               
               <p>Overcast  Clouds</p>
               <p> Clouds: {dataWeather.current ? dataWeather.current.clouds : null}</p>

               <div className="img">
                  <img className='img-city' src="http://media.dulich24.com.vn/diemden/ha-noi-9/ddffeb6a-ea3b-480b-acb8-a0394fba6599-2.JPG" alt="" />
               </div>
            </div>
         </div>

   </div>
   );
};

function getTime(time) {
   var date = new Date(time * 1000);
   var day = date.getDay();
   const options = { weekday: "long" };
   var day = new Intl.DateTimeFormat("en-US", options).format(date);
 
   return (
      day + "," +
      date.toLocaleString("en-US", {
         hour: "numeric",
         minute: "numeric",
       //day: "numeric",
       //month: "numeric"
       //hour12: true,
     })
   );
 }

export default PageLeft;