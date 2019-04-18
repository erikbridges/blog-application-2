import axios from "axios";

// Register User
export function addUser(user) {
  const { username, email, password, captcha } = user;
  return {
    type: "ADD_USER",
    payload: axios.post("http://localhost:5000/api/register", {
      username,
      email,
      password,
      captcha
    })
  };
}

// Login User
export function loginUser(user) {
  const { email, password, captcha } = user;
  return {
    type: "LOGIN_USER",
    payload: axios.post("http://localhost:5000/api/login", {
      email: email === undefined ? "" : email,
      password: password === undefined ? "" : password,
      captcha
    })
  };
}

export function addBlog(blog) {
  const { title, hidden, content } = blog;
  return {
    type: "ADD_BLOG",
    payload: axios.post(
      "http://localhost:5000/api/blogs/new",
      {
        title: title === undefined ? "" : title,
        hidden,
        post: content === undefined ? "" : content
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
  };
}

export function getBlogs() {
  return {
    type: "GET_ALL_BLOGS",
    payload: axios.get("http://localhost:5000/api/blogs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  };
}
