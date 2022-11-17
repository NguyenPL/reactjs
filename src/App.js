import {Routes, Route} from 'react-router-dom';
import './App.css';
import React, {useState} from 'react';
import HourPage from './WeatherPages/page/HourPage'
import TodayPage from './WeatherPages/page/TodayPage'
import WeekPage from './WeatherPages/page/WeekPage'
import PageLeft from './WeatherPages/page/PageLeft'
function App() {

  return (
    <div className="App"> 
    <PageLeft />
       <Routes>
        <Route path='/' element={<TodayPage />}/>
        <Route path='/Today' element={<TodayPage />}/>
        <Route path='/Week' element={<WeekPage />}/>
        <Route path='/Hour' element={<HourPage />}/> 
      </Routes>
    </div>
  );
}

export default App;
