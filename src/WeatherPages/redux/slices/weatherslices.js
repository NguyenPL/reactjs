// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { zz, URL_Data, URL_Location } from "./Api";

// export const fetchWeatherAction = createAsyncThunk(
//   "weather/fetch",
//   async (location, { rejectWithValue, getState, dispatch }) => {
//     try {
//       const { data } = await axios.get(URL_Location, {
//         params: {
//           q: location,
//           units: "Metric",
//           lang: "en",
//         },
//       });
//       console.log(data);
//       return data;
//     } catch (error) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// export const fetchWeather7Action = createAsyncThunk(
//   "weather7day/fetchdata",
//   async ({ lat, lon }, { rejectWithValue, getState, dispatch }) => {
//     try {
//       const { data } = await axios.get(URL_Data, {
//         params: {
//           lat,
//           lon,
//         },
//       });

//       console.log(data);
//       return data;
//     } catch (error) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );
// // //slice

// // const initialState = {
// //   data: {},
// //   location: [],
// //   mode: "F",
// // };

// // const SHOW_WEATHER_DATA = "SHOW_WEATHER_DATA";
// // const TOGGLE_MODE = "TOGGLE_MODE";

// // const showWeatherData = (data, location) => {
// //   return {
// //     type: SHOW_WEATHER_DATA,
// //     payload: data,
// //     location: location,
// //   };
// // };

// // export const toggleMode = (unit) => ({
// //   type: TOGGLE_MODE,
// //   mode: unit,
// // });

// // export const fetchWeatherAction = (lat, lng, location) => {
// //   return async (dispatch) => {
// //     try {
// //       // let lat = null;
// //       // let lng = null;
// //       // console.log("Location", location);
// //       let currentLocation = [];

// //       if (lat === null && lng === null) {
// //         const { data } = await axios.get(
// //           `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=b8e7450258e4f07d5bf213472684b242`
// //         );
// //         console.log("DATA HERE", data);

// //         lat = data.results[0].geometry.location.lat;
// //         lng = data.results[0].geometry.location.lng;
// //         currentLocation.push(
// //           data.results[0].address_components[0].long_name,
// //           data.results[0].address_components[2].short_name
// //         );
// //       }

// //       if (location === null) {
// //         const { data } = await axios.get(
// //           `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=ac2e59088cbe65dddd76cc799a3f7efb`
// //         );

// //         currentLocation.push(
// //           data.results[0].address_components[3].short_name,
// //           data.results[0].address_components[5].short_name
// //         );
// //         console.log("City, State and other location data", data.results);
// //       }

// //       const weatherData = await axios.get(
// //         `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=ac2e59088cbe65dddd76cc799a3f7efb`
// //       );

// //       dispatch(showWeatherData(weatherData, currentLocation));
// //     } catch (err) {
// //       console.log("Error in Weather Fetch", err);
// //     }
// //   };
// // };

// // export const rootReducer = (state = initialState, action) => {
// //   switch (action.type) {
// //     case SHOW_WEATHER_DATA:
// //       return { ...state, data: action.payload, location: action.location };
// //     case TOGGLE_MODE:
// //       return { ...state, mode: action.mode };
// //     default:
// //       return state;
// //   }
// // };

// // export default rootReducer;

// const weatherSlice = createSlice({
//   name: "weather",
//   initialState: {},
//   extraReducers: (builder) => {
//     //pending
//     builder.addCase(fetchWeatherAction.pending, (state, action) => {
//       state.loading = true;
//     });

//     //rejected
//     builder.addCase(fetchWeatherAction.rejected, (state, action) => {
//       state.loading = false;
//       state.weather = undefined;
//       state.error = action?.payload;
//     });
//     //fulfilled
//     builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
//       state.weather = action?.payload;
//       state.loading = false;
//       state.error = undefined;
//     });
//     //weather 7day

//     //pending
//     builder.addCase(fetchWeather7Action.pending, (state, action) => {
//       state.loading = true;
//     });

//     //rejected
//     builder.addCase(fetchWeather7Action.rejected, (state, action) => {
//       state.loading = false;
//       state.weather7day = undefined;
//       state.error = action?.payload;
//     });
//     //fulfilled
//     builder.addCase(fetchWeather7Action.fulfilled, (state, action) => {
//       state.weather7day = action?.payload;
//       state.loading = false;
//       state.weather7day = undefined;
//     });
//   },
// });

// export default weatherSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL_Data, URL_Location } from "./Api";

export const fetchWeather7Action = createAsyncThunk(
  "weather7day/fetch",
  async (dataLatLon, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(URL_Data, {
        params: {
          lat: dataLatLon.lat,
          lon: dataLatLon.lon,
        },
      });

      console.log(data);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// export const fetchWeatherAction = createAsyncThunk(
//   "weather/fetch",
//   async (location, { rejectWithValue, getState, dispatch }) => {
//     try {
//       const { data } = await axios
//         .get(URL_Location, {
//           params: {
//             q: location,
//             units: "Metric",
//             lang: "en",
//           },
//         })

//         .then(function (response) {
//           if (response.data.coord) {
//             dispatch(fetchWeather7Action(response.data.coord));
//           }
//           console.log(response.data);
//         });

//       return data;
//     } catch (error) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );
// export const fetchWeather7Action = createAsyncThunk(
//   "weather7day/fetchdata",
//   async ({ rejectWithValue, getState, dispatch }) => {
//     try {
//       const { data } = await axios.get(URL_Data);

//       console.log(data);
//       return data;
//     } catch (error) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );
// //slice

// const initialState = {
//   data: {},
//   location: [],
//   mode: "F",
// };

// const SHOW_WEATHER_DATA = "SHOW_WEATHER_DATA";
// const TOGGLE_MODE = "TOGGLE_MODE";

// const showWeatherData = (data, location) => {
//   return {
//     type: SHOW_WEATHER_DATA,
//     payload: data,
//     location: location,
//   };
// };

// export const toggleMode = (unit) => ({
//   type: TOGGLE_MODE,
//   mode: unit,
// });

// export const fetchWeatherAction = (lat, lng, location) => {
//   return async (dispatch) => {
//     try {
//       // let lat = null;
//       // let lng = null;
//       // console.log("Location", location);
//       let currentLocation = [];

//       if (lat === null && lng === null) {
//         const { data } = await axios.get(
//           `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=b8e7450258e4f07d5bf213472684b242`
//         );
//         console.log("DATA HERE", data);

//         lat = data.results[0].geometry.location.lat;
//         lng = data.results[0].geometry.location.lng;
//         currentLocation.push(
//           data.results[0].address_components[0].long_name,
//           data.results[0].address_components[2].short_name
//         );
//       }

//       if (location === null) {
//         const { data } = await axios.get(
//           `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=ac2e59088cbe65dddd76cc799a3f7efb`
//         );

//         currentLocation.push(
//           data.results[0].address_components[3].short_name,
//           data.results[0].address_components[5].short_name
//         );
//         console.log("City, State and other location data", data.results);
//       }

//       const weatherData = await axios.get(
//         `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=ac2e59088cbe65dddd76cc799a3f7efb`
//       );

//       dispatch(showWeatherData(weatherData, currentLocation));
//     } catch (err) {
//       console.log("Error in Weather Fetch", err);
//     }
//   };
// };

// export const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SHOW_WEATHER_DATA:
//       return { ...state, data: action.payload, location: action.location };
//     case TOGGLE_MODE:
//       return { ...state, mode: action.mode };
//     default:
//       return state;
//   }
// };

// export default rootReducer;

const weatherSlice = createSlice({
  name: "weather",
  initialState: {},
  extraReducers: (builder) => {
    //pending
    builder.addCase(fetchWeather7Action.pending, (state, action) => {
      state.loading = true;
    });

    //rejected
    builder.addCase(fetchWeather7Action.rejected, (state, action) => {
      state.loading = false;
      state.weather = undefined;
      state.error = action?.payload;
    });
    //fulfilled
    builder.addCase(fetchWeather7Action.fulfilled, (state, action) => {
      state.weather = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    //weather 7day

    // //pending
    // builder.addCase(fetchWeatherAction.pending, (state, action) => {
    //   state.loading = true;
    // });

    // //rejected
    // builder.addCase(fetchWeatherAction.rejected, (state, action) => {
    //   state.loading = false;
    //   state.weather7day = undefined;
    //   state.error = action?.payload;
    // });
    // //fulfilled
    // builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
    //   state.weather7day = action?.payload;
    //   state.loading = false;
    //   state.weather7day = undefined;
    // });
  },
});

export default weatherSlice.reducer;
