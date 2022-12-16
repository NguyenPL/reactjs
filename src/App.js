import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./App.css";
import { Provider } from "react-redux";
// import Search from "./WeatherPages/page/PageLeft";
import store from "./WeatherPages/redux/store/store";
// import HourPage from "./WeatherPages/page/HourPage";
// import TodayPage from "./WeatherPages/page/TodayPage";
// import WeekPage from "./WeatherPages/page/WeekPage";
const Search = lazy(() => import("./WeatherPages/page/PageLeft"));
const TodayPage = lazy(() => import("./WeatherPages/page/TodayPage"));
const HourPage = lazy(() => import("./WeatherPages/page/HourPage"));
const WeekPage = lazy(() => import("./WeatherPages/page/WeekPage"));

function App() {
  return (
    <div className="container-T">
      <div className="App">
        <Provider store={store}>
          <Suspense fallback={<div>Loading...</div>}>
            <Search />
            <Routes>
              <Route path="/" element={<TodayPage />} />
              <Route path="/Today" element={<TodayPage />} />s
              <Route path="/Week" element={<WeekPage />} />
              <Route path="/Hour" element={<HourPage />} />
            </Routes>
          </Suspense>
        </Provider>
      </div>
    </div>
  );
}

export default App;
