import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialstate = {};

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,

}
  /*rootReducer,
  initialstate,
  applyMiddleware(...middleware)*/
);

export default store;
