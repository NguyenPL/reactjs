import React, {useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import "./TodayPage.css"
import {FiSun, FiWind, FiPercent, FiClock} from 'react-icons/fi';
import axios from 'axios';
import{FaTemperatureLow} from 'react-icons/fa'
import{WiSunrise, WiSunset} from 'react-icons/wi'
const Today = () => {
   
   const [lat, setLat] = useState('21.0294498');
   const [lon, setLon] = useState('105.8544441');
   const [dataWeather, setDataWeather] = useState([]);
   const [location, setLocation] = useState('Thai Nguyen');
   const [city, setCity] = useState('');
   //const url = `https://api.openweathermap.org/data/2.5/onecall?q=${location}&appid=e911bb8ccf5c4eb0b3a863b5cc6aa4a8` 
   //const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b8e7450258e4f07d5bf213472684b242`
   const url_location = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=b8e7450258e4f07d5bf213472684b242`;
   const url_data = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=e911bb8ccf5c4eb0b3a863b5cc6aa4a8`

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
   <div className='component'>
         <div className="left">
            <div >
               <input value={location} onChange={event => setLocation(event.target.value)}
               onKeyPress = {searchLocation}
               className='search' type="text" placeholder='search'/>
               
              <p><img className='icon' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMYTNaisA0GJu7VNW8xK_pX3r7r46wo__ihA&usqp=CAU" alt="" /></p>
            </div>
           
               <div className="weather">
                  <div className='Name'>
                     <p className='boll'>{city}</p>
                  </div>
                 <div>
                  <p className='boll'>{dataWeather.current ? dataWeather.current.temp :  null} °F</p>
                  
                  </div>
                  <div>
                     <p></p>
                  </div>
                  <p>Overcast  Clouds</p>
                  <p> Clouds: {dataWeather.current ? dataWeather.current.clouds : null}</p>

                  <img className='IMG' src="http://media.dulich24.com.vn/diemden/ha-noi-9/ddffeb6a-ea3b-480b-acb8-a0394fba6599-2.JPG" alt="" />
               </div>
         </div>
      <div className="right">
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
         <div className="content">
            <ul className='list-ul'>
               <li className='uv-index'>
                  <h3>UV -index</h3>
                  <p className='P'><FiSun size={50} color='orange'/></p>
                  <h1>{dataWeather.current ? dataWeather.current.uvi : null}</h1>
               </li>
               <li className='uv-index'>
                  <h3>Wind -Status</h3>
                  <p className='P'><FiWind size={50} color='#6699FF'/></p>
                  <h1>{dataWeather.current ? dataWeather.current.wind_speed : null} Km/h</h1>
               </li>
               <li className='uv-index'>
                  <h3>Sunrise & Sunset</h3>
                  <p className='PP'><WiSunrise size={50} color='orange'/></p>
                  <h5>{dataWeather.current ? dataWeather.current.sunrise : null}</h5>
                  
                  <p className='FF'><WiSunset size={50} color='orange'/></p>
                  <h5>{dataWeather.current ? dataWeather.current.sunset : null}</h5>
               </li>
               <li className='uv-index'>
                  <h3>humidity</h3>
                  <p className='P'><FiPercent size={50} color='#6699FF'/></p>
                  <h1>{dataWeather.current ? dataWeather.current.humidity : null}</h1>
               </li>
               <li className='uv-index'>
                  <h3>visibility</h3>
                  <p className='P'><FiClock size={50} color='orange'/></p>
                  <h1>{dataWeather.current ? dataWeather.current.visibility : null}</h1>

               </li>
               <li className='uv-index'>
                  <h3>pressure</h3> 
                  <p className='P'><FaTemperatureLow size={50} color='#6699FF'/></p>
                  <h1>{dataWeather.current ? dataWeather.current.pressure : null}</h1>
               </li>
            </ul>
            
         </div>
      </div>
   </div>
   );
};

export default Today;