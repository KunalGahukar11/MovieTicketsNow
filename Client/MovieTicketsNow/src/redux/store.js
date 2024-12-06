import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import loaderReducer from "./slices/loaderSlice";

const store = configureStore({
  reducer: {
    loaders: loaderReducer,
    users: userReducer,
  },
});

export default store;
