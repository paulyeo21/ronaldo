import { combineReducers } from "redux";
import userReducer from "./users/reducer.js";

const allReducers = {
  user: userReducer,
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;
