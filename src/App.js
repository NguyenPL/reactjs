import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import Search from "./WeatherPages/page/PageLeft";
import store from "./WeatherPages/redux/store/store";
import HourPage from "./WeatherPages/page/HourPage";
import TodayPage from "./WeatherPages/page/TodayPage";
import WeekPage from "./WeatherPages/page/WeekPage";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Search />
        <Routes>
          <Route path="/" element={<TodayPage />} />
          <Route path="/Today" element={<TodayPage />} />
          <Route path="/Week" element={<WeekPage />} />
          <Route path="/Hour" element={<HourPage />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
