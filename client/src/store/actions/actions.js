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
// Add Blog To Author
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

// Get All Blogs from id
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

// Get all blogs from all users
export function getBlogsAll() {
  return {
    type: "GET_ALL_BLOGS_SEARCH",
    payload: axios.get("http://localhost:5000/api/blogs/all")
  };
}
// Get  blog from user id
export function getBlogById(id) {
  return {
    type: "GET_BLOG_BY_ID",
    payload: axios.get(`http://localhost:5000/api/blogs/${id}`)
  };
}

// Get blogs from user id
export function getBlogsFromAuthor() {
  return {
    type: "GET_BLOG",
    payload: axios.get("http://localhost:5000/api/blogs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  };
}
