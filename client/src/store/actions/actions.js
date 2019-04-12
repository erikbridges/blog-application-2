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
