import React, {useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import "./WeekPage.css"
import axios from 'axios';
import {FiSun, FiWind, FiPercent, FiClock} from 'react-icons/fi';
import {BsCloudSun} from 'react-icons/bs'
import{FaTemperatureLow} from 'react-icons/fa'
import{WiSunrise, WiSunset} from 'react-icons/wi'
import moment from 'moment/moment';


const Week = () => {

   const [lat, setLat] = useState('21.0294498');
   const [lon, setLon] = useState('105.8544441');
   const [dataWeather, setDataWeather] = useState([]);
   const [location, setLocation] = useState('Thai Nguyen');
   const [city, setCity] = useState('');
   const [temp, setTemp] = useState();
   const [max, setMax] = useState();
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
            setTemp(Response.data[0].temp);
            setMax(Response.data[0].max);
      })
      }
    }
    useEffect(() => {
      axios.get(url_location).then((Response)=>{
         setLat(Response.data[0].lat);
         setLon(Response.data[0].lon);
         setCity(Response.data[0].name);
         //setTemp(Response.data[0].temp.array);

      })
    }, []);  
    useEffect(() => {
      axios.get(url_data).then((Response)=>{
         setDataWeather(Response.data);
         console.log(Response.data);
      })
    }, [lat, lon]);  

    useEffect(() => {
      axios.get(url_data).then((Response)=>{
         setDataWeather(Response.data);
         console.log(Response.data);
      })
    }, [temp]);  

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
            <p className='boll'>{city}</p>   
            <p className='boll'>{dataWeather.current ? dataWeather.current.temp :  null} °F</p>
               <p>Monday, 11h59 PM</p>
               <p>Overcast  Clouds</p>
               <p>Clouds 100%</p>

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

            <li className='uv-index-week'>
               {/* <p>{dataWeather.current ? dataWeather.current.daily : null}</p> */}
               <p></p>
               <p className='icon-week'><BsCloudSun color='green' size={50}/> </p>
               <p className='icon-week'> {dataWeather.daily ? dataWeather.daily.temp : null}</p>
            </li>

            <li className='uv-index-week'>
               <p>Tue, 17/05</p>
               <p className='icon-week'><BsCloudSun color='green' size={50}/> </p>
               <p className='icon-week'> {dataWeather.current ? dataWeather.current.temp : null}</p>
            </li>

            <li className='uv-index-week'>
               <p>Wed, 18/05</p>
               <p className='icon-week'><BsCloudSun color='green' size={50}/> </p>
               <p className='icon-week'> {dataWeather.current ? dataWeather.current.temp : null}</p>
            </li>

            <li className='uv-index-week'>
                  <p>Thu, 19/05</p>
               <p className='icon-week'><BsCloudSun color='green' size={50}/> </p>
               <p className='icon-week'> {dataWeather.current ? dataWeather.current.temp : null}</p>
            </li>

            <li className='uv-index-week'>
                  <p>Fri, 20/05</p>
               <p className='icon-week'><BsCloudSun color='green' size={50}/> </p>
               <p className='icon-week'> {dataWeather.current ? dataWeather.current.temp : null}</p>
            </li>

            <li className='uv-index-week'>
                  <p>Sat, 21/05</p>
               <p className='icon-week'><BsCloudSun color='green' size={50}/> </p>
               <p className='icon-week'> {dataWeather.current ? dataWeather.current.temp : null}</p>
            </li>

            <li className='uv-index-week'>
                  <p>Sun, 22/05</p>
               <p className='icon-week'><BsCloudSun color='green' size={50}/> </p>
               <p className='icon-week'> {dataWeather.current ? dataWeather.current.temp : null}</p>
            </li>

            <li className='uv-index-week'>
                  <p>Mon, 23/05</p>
               <p className='icon-week'><BsCloudSun color='green' size={50}/> </p>
               <p className='icon-week'> {dataWeather.current ? dataWeather.current.temp : null}</p>
            </li>
         </ul>
         
      </div>

      <div className="weather-details">
         <h3>Mon, 16/05</h3>

         <p>Tem current : 21 °C</p>
      </div>
   </div>
</div>
   );
};

export default Week;