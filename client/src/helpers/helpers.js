import axios from "axios";
export const checkToken = async () => {
  // Login User By Token.
  try {
    const getUser = await axios.get("http://localhost:5000/api/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (getUser.data.code == 200) {
      return {
        session: true,
        _id: getUser.data._id,
        username: getUser.data.username,
        title: getUser.data.title === null ? "" : getUser.data.title,
        email: getUser.data.email,
        followers: JSON.parse(getUser.data.followers)
      };
    }
  } catch (ex) {
    localStorage.removeItem("token");
    return {
      session: false
    };
  }
};
