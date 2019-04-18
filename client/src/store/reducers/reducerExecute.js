import { combineReducers } from "redux";

import registerReducer from "../reducers/userReducers/registerReducer";
import loginReducer from "../reducers/userReducers/loginReducer";
import addBlogReducer from "../reducers/blogReducers/addBlogReducers";

export default combineReducers({
  registerUser: registerReducer,
  loginUser: loginReducer,
  addBlog: addBlogReducer
});
