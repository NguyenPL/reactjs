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

      //console.log(data);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

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
  },
});

export default weatherSlice.reducer;
