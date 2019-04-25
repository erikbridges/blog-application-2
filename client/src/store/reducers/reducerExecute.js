import { combineReducers } from "redux";

import registerReducer from "../reducers/userReducers/registerReducer";
import loginReducer from "../reducers/userReducers/loginReducer";
import addBlogReducer from "../reducers/blogReducers/addBlogReducers";
import getAllBlogsReducers from "../reducers/blogReducers/getAllBlogsReducers";
import getBlogReducers from "../reducers/blogReducers/getBlogReducers";

export default combineReducers({
  registerUser: registerReducer,
  loginUser: loginReducer,
  addBlog: addBlogReducer,
  getBlogs: getAllBlogsReducers,
  blogPost: getBlogReducers
});
