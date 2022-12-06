import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/WeekPage.css";
import "../DailyItemDetails/DailyItemDetails"
import { useDispatch, useSelector } from "react-redux";
import "moment-timezone";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import ItemDetails from "../DailyItemDetails/DailyItemDetails";

const Week = () => {
  const [dataWeather, setDataWeather] = useState(null);
  const state = useSelector((state) => state);
  const { weather, loading, error, direct } = state;
  console.log(weather);

  // const hanldClick =(props)=>{
    
  // }

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

        <div className="content-week">
          <ul className="list-ul">
            {weather
              ? weather.daily.map((item, index ) => (
                  <div className="uv-index-week" onClick={() => {
                    console.log(item);
                    
                  }}>
                    <p className="icon-week">{getTime(item.dt)}</p>
                    <p className="l">
                      {/* weather logo */}
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt="/"
                      />
                    </p>
                    <div className="temp-fells">
                      <p className="l">
                        {Math.ceil(Number(item.temp.min - 275.15))}{" "}
                        <span>°</span>-
                        {/* {Math.round((item.temp.day = (32 * 5) / 9))}&deg;C{" "} */}
                        <p>
                          {Math.ceil(Number(item.temp.max - 275.15))}{" "}
                          <span>°</span>
                          {/* {Math.round((item.feels_like.day = (32 * 5) / 9))} */}
                        </p>
                      </p>
                    </div>
                  </div> 
                ),)

              : null}
          </ul>  
          <div className="div-dailist">
                <h1>hello</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

function getTime(time) {
  var date = new Date(time * 1000);
  var dayy = date.getDay();
  const options = { weekday: "long" };
  var dayy = new Intl.DateTimeFormat("en-US", options).format(date);

  return (
    dayy +
    ", " +
    date.toLocaleDateString("en-US", {
      //hour: "numeric",
      //minute: "numeric",
      
      dayy: "numeric",
      month: "numeric",
      // year:"2-digit"
    
    })
  );
}
export default Week;
