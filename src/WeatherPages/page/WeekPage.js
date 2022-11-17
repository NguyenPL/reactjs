
import React, {useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import "./css/WeekPage.css"
import axios from 'axios';
import {BsCloudSun} from 'react-icons/bs'

import 'moment-timezone';

const Week = () => {
   const [lat, setLat] = useState('21.0294498');
   const [lon, setLon] = useState('105.8544441');
   const [temp, setTemp] = useState('298.03');
   const [dataWeather, setDataWeather] = useState({});
   const [location, setLocation] = useState('Thai Nguyen');
   const [city, setCity] = useState('');
   const [max, setMax] = useState();
   
    const url_location = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=b8e7450258e4f07d5bf213472684b242`;
    const url_data = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ac2e59088cbe65dddd76cc799a3f7efb`

   const searchLocation = (event) =>{
      if(event.key === "Enter") {
         axios.get(url_location).then((Response)=>{

            setLat(Response.data[0].lat);
            setLon(Response.data[0].lon);
            setCity(Response.data[0].name);
            setTemp(Response.data[0].temp);
         })
      }
    }
    useEffect(() => {
      axios.get(url_location).then((Response)=>{
         setLat(Response.data[0].lat);
         setLon(Response.data[0].lon);
         setCity(Response.data[0].name);
         setTemp(Response.data[0].temp);
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
      })
    }, []);  


   
   return (
      <div className='component-week'>
         <div className="right-week">
            <nav>
               <ul>
                  <li><Link to="/Today">Today</Link></li> 
                  <li><Link to="/Week">Week</Link></li>
                  <li><Link to="/Hour">Hour</Link></li>  
               </ul>
            </nav>

      <div className="content">
         <ul className='list-ul'>
            {dataWeather.daily ? dataWeather.daily.map((item, index, temp)=>(
                    <li className='uv-index-week'>
                        <p className='icon-week'>{getTime(item.dt)}</p> 
                        <p><BsCloudSun className='icon-weather' color='green' size={50}/> </p>
                        
                        <div className='temp-fells'>
                           <p className='l'>{Math.round(item.temp.day=32*5/9)}&deg;C - <p>{Math.round(item.feels_like.day=32*5/9)}&deg;C</p></p>
                           
                        </div>   
                        
                        
                     </li>          
            )): null}
        
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
   var day = new Intl.DateTimeFormat("en-US", options).format(date);
 
   return (
      day +
     ", " +
     date.toLocaleString("en-US", {
       //hour: "numeric",
       //minute: "numeric",
       day: "numeric",
       month: "numeric"
       //hour12: true,
     })
   );
 }
export default Week;


