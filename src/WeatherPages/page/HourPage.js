import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/HourPage.css";
import axios from "axios";
import { FiSun, FiWind, FiPercent, FiClock } from "react-icons/fi";
import { BsCloudSun } from "react-icons/bs";
import { FaTemperatureLow } from "react-icons/fa";
import { WiSunrise, WiSunset } from "react-icons/wi";
import "moment-timezone";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
//import {doughnut} from 'react-chartjs-2'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const Hour = () => {
  // const url_location = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=b8e7450258e4f07d5bf213472684b242`;
  // const url_data = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ac2e59088cbe65dddd76cc799a3f7efb`;

  // const searchLocation = (event) => {
  //   if (event.key === "Enter") {
  //     axios.get(url_location).then((Response) => {
  //       setLat(Response.data[0].lat);
  //       setLon(Response.data[0].lon);
  //       setCity(Response.data[0].name);
  //       setTemp(Response.data[0].temp);
  //     });
  //   }
  // };
  // //   useEffect(() => {
  // //     axios.get(url_location).then((Response) => {
  // //       setLat(Response.data[0].lat);
  // //       setLon(Response.data[0].lon);
  // //       setCity(Response.data[0].name);
  // //       setTemp(Response.data[0].temp);
  // //     });
  // //   }, []);

  // useEffect(() => {
  //   axios.get(url_data).then((Response) => {
  //     setDataWeather(Response.data);
  //     console.log(Response.data);
  //   });
  // }, [lat, lon]);

  // useEffect(() => {
  //   axios.get(url_data).then((Response) => {
  //     setDataWeather(Response.data);
  //   });
  // }, []);

  const [data, setData] = useState({
    labels: [
      "Jan",
      "Fed",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Oct",
      "Now",
      "Dec",
    ],
    datasets: [
      {
        label: "First Dataset",
        data: [10, 20, 30, 42, 51, 82, 331, 59, 61, 73, 91, 58],
        backgroundColor: "yellow",
        borderColor: "pink",
        tension: 0.1,
        fill: true,
      },
      {
        label: "First Dataset1",
        data: [200, 204, 235, 242, 251, 282, 421, 259, 261, 273, 291, 258],
        backgroundColor: "yellow",
        borderColor: "green",
        tension: 0.1,
        fill: true,
      },
    ],
  });

  return (
    <div className="component-hour">
      <div className="right-hour">
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

        <div className="chart">
          <Line data={data} />
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
    ",   " +
    date.toLocaleString("en-US", {
      //hour: "numeric",
      //minute: "numeric",
      day: "numeric",
      month: "numeric",
      //hour12: true,
    })
  );
}
export default Hour;
