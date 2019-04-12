import { combineReducers } from "redux";

import registerReducer from "../reducers/userReducers/registerReducer";
import loginReducer from "../reducers/userReducers/loginReducer";

export default combineReducers({
  registerUser: registerReducer,
  loginUser: loginReducer
});
