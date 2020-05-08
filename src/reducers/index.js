import { combineReducers } from "redux";

// import { authentication } from "./authentication.reducer";
// import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { schedules } from "./schedules.reducer";
import { rooms } from "./rooms.reducer";

const rootReducer = combineReducers({
  users,
  schedules,
  rooms,
});

export default rootReducer;
