import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/HourPage.css";
import "moment-timezone";
import { URL_Location, URL_Data } from "../redux/slices/Api";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
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
  const state = useSelector((state) => state);
  const { weather, loading, error } = state;
  const [dataChart, setDataChart] = useState({state});
  console.log(weather);
  console.log(dataChart);

  useEffect(() => {
    setDataChart({
      labels: weather?.hourly.map((item) => getTime(item.dt)),
      datasets: [
        {
          label: "Temp °C",
          data: weather?.hourly.map(item => Math.ceil(Number(item.temp - 275.15))),
          fill: true,
          backgroundColor: "yellow",
          borderColor: "pink",
          tension: 0.4,
        },

        {
          label: "Feels_Like",
          data: weather?.hourly.map(item => Math.ceil(Number(item.feels_like - 275.15))),
          fill: true,
          backgroundColor: "yellow",
          borderColor: "green",
          tension: 0.4,
        }
      ],
    });
  }, []);
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
              <Link className="bdbtn-hour" to="/Hour">Hour</Link>
            </li>
          </ul>
        </nav>
        <div className="chart">
          {dataChart && dataChart.datasets && (
            <Line 
              data={dataChart}
              options={{
                responsive:true,
                plugins: {
                  legend:{position: "top"},
                  title: {display: true,}
                }
              }}
          />
          )}
        </div>
      </div>
    </div>
  );
};

function getTime(time) {
  var date = new Date(time * 1000);
  var dayy = date.getDay();
  const options = { weekday: "long" };
  var dayy = new Intl.DateTimeFormat("en-US").format(date);

  return (
    
    "" +
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",

      // dayy: "numeric",
      // month: "numeric",
      // year:"2-digit"
    })
  );
}
export default Hour;
