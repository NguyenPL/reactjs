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
  const state = useSelector((state) => state);
  const { weather, loading, error } = state;
  const [dataChart, setDataChart] = useState([state]);
  console.log(weather);
  useEffect(() => {
    setDataChart({
      //labels: weather?.hourly.map((item) => getTime(item.dt)),
      datasets: [
        {
          labels: "dt",
          //weather: weather?.hourly.map((item) => item.temp),
          fill: true,
          boderClor: "rbg(255,99, 132)",
          backgroudColor: "rbg(255,99, 132)",
        },
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
              <Link to="/Hour">Hour</Link>
            </li>
          </ul>
        </nav>
        <div className="chart">
          <Line data={dataChart} />
        </div>
      </div>
    </div>
  );
};

function getTime(time) {
  var date = new Date(time * 1000);
  //var dayy = date.getDay();
  const options = { weekday: "long" };
  var dayy = new Intl.DateTimeFormat("en-US").format(date);

  return (
    dayy +
    ", " +
    date.toLocaleDateString("en-US", {
      hour: "numeric",
      minute: "numeric",

      // dayy: "numeric",
      // month: "numeric",
      // year:"2-digit"
    })
  );
}
export default Hour;
