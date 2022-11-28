import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/WeekPage.css";
import axios from "axios";
import { BsCloudSun } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import "moment-timezone";
import { URL_DATA } from "../redux/slices/Api";
import { fetchWeather7Action } from "../redux/slices/weatherslices";

const Week = () => {

  const state = useSelector((state) => state);
  const { weather, loading, error } = state;
  return (
    <div className="component-week">
      <div className="right-week">
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
          <ul className="list-ul">
            <li className="list-li">
              <p>{weather?.main.temp}</p>
            </li>
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
      month: "numeric",
      //hour12: true,
    })
  );
}
export default Week;
