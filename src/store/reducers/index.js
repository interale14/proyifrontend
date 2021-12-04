import { combineReducers } from "redux";

// My Reducer 
import securityReducer from './security';
import messageReducer from "./swot";

const rootReducer = combineReducers(
  {
    //All Reducers
    security: securityReducer,
    message: messageReducer,
  }
)

export default rootReducer;
