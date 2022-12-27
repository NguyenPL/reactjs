import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/WeekPage.css";
import "../DailyItemDetails/ItemDetails";
import { useDispatch, useSelector } from "react-redux";
import "moment-timezone";
import ItemDetails from "../DailyItemDetails/ItemDetails";
import { click } from "@testing-library/user-event/dist/click";

const Week = () => {
  const state = useSelector((state) => state);
  const { weather, loading, error, direct } = state;
  const [dataWeathe, setDataWeathe] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const [test, setTest] = useState([]);
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(false);

  var panels = document.querySelectorAll(".uv-index-week");
  panels.forEach((each) => {
    each.onclick = function () {
      panels.forEach((ss) => ss.classList.remove("active")); // removing active from all
      each.classList.add("active"); // assigning active to selected
    };
  });

  return (
    <div className="component-week">
      <div className="right-week">
        <nav>
          <ul>
            <li>
              <Link to="/Today">Today</Link>
            </li>
            <li>
              <Link className="bdbtn-week" to="/Week">
                Week
              </Link>
            </li>
            <li>
              <Link to="/Hour">Hour</Link>
            </li>
          </ul>
        </nav>

        <div className="content-week">
          <ul className="list-ul">
            {weather
              ? weather.daily.map((item, index) => (
                  <div
                    className="uv-index-week"
                    onClick={() => {
                      setTest(item);
                    }}
                    key={index}
                  >
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
                        <a className="l">
                          {Math.ceil(Number(item.temp.min - 275.15))}
                          {""}
                          <span> ° </span>
                        </a>
                        <a className="space">-</a>
                        <a className="l">
                          {Math.ceil(Number(item.temp.max - 275.15))}{" "}
                          <span>°</span>
                        </a>
                      </p>
                    </div>
                  </div>
                ))
              : null}
            <div className="div-dailist">
              <ItemDetails data={test} />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

function getTime(time) {
  var date = new Date(time * 1000);
  var dayy = date.getDay();
  const options = { weekday: "short" };
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
