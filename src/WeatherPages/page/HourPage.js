
import React, {useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import "./WeekPage.css"
import axios from 'axios';
import {FiSun, FiWind, FiPercent, FiClock} from 'react-icons/fi';
import {BsCloudSun} from 'react-icons/bs'
import{FaTemperatureLow} from 'react-icons/fa'
import{WiSunrise, WiSunset} from 'react-icons/wi'
import 'moment-timezone';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, LineElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
//import {doughnut} from 'react-chartjs-2'


ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   
)

const Hour = () => {
   const [lat, setLat] = useState('21.0294498');
   const [lon, setLon] = useState('105.8544441');
   const [temp, setTemp] = useState('298.03');
   const [dataWeather, setDataWeather] = useState({});
   const [location, setLocation] = useState('Thai Nguyen');
   const [city, setCity] = useState('');
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

   var data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  }
  var options = {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
    
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
            <p className='boll'>{dataWeather.current ? dataWeather.current.temp-273.15.toFixed(0) :  null}&deg;C</p>
            <p>{getTime(dataWeather.current ? dataWeather.current.dt : null)}</p>
            <p>Overcast  Clouds</p>
            <p>Clouds 100%</p>
            <img className='IMG' src="http://media.dulich24.com.vn/diemden/ha-noi-9/ddffeb6a-ea3b-480b-acb8-a0394fba6599-2.JPG" alt="" />
         </div>
      </div>

   <div className="right">
      <nav>
         <ul>
            <li><Link to="/Today">Today</Link></li> 
            <li><Link to="/Week">Week</Link></li>
            <li><Link to="/Hour">Hour</Link></li>  
         </ul>
      </nav>

      <div className="chart">
         <Bar
            data={data}
            options ={options}

         />
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
export default Hour;


