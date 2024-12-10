import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import loaderReducer from "./slices/loaderSlice";
import modalReducer from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    loaders: loaderReducer,
    users: userReducer,
    modal: modalReducer,
  },
});

export default store;
