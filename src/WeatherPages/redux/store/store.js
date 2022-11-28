import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../slices/weatherslices";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
