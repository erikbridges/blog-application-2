import React, { Component } from "react";
// import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTools,
  faEdit,
  faTrash,
  faBlog
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "../CSS/users.styl";
import axios from "axios";
class User extends Component {
  constructor() {
    super();
    this.state = {
      session: false,
      username: "",
      email: "",
      followers: [],
      current: "blog"
    };
  }
  async componentDidMount() {
    const token = localStorage.getItem("token");
    this.loginToken(token);
  }
  loginToken = async token => {
    console.log(token);
    // Login User By Token.
    try {
      const getUser = await axios.get("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (getUser.data.code == 200) {
        this.setState({
          session: true,
          username: getUser.data.username,
          email: getUser.data.email,
          followers: JSON.parse(getUser.data.followers)
        });
      }
    } catch (ex) {
      localStorage.removeItem("token");
      this.setState({
        session: false
      });
    }
  };
  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  renderUnauthorizedUser = () => (
    <div>
      <h1>Your Session Has Ended.</h1>
      <Link to="/login">Click here to login in.</Link>
    </div>
  );
  render() {
    const { session, username, email, followers } = this.state;
    return !session ? (
      this.renderUnauthorizedUser()
    ) : (
      <div className={styles["main"]}>
        <div className={styles["menu__main"]}>
          <h1 className={styles["menu__user"]}>{username}</h1>
          <div className={styles["menu__nav"]}>
            <span>
              <FontAwesomeIcon icon={faTools} />
              Settings
            </span>
            <span>
              <FontAwesomeIcon icon={faBlog} />
              Blog
            </span>
          </div>
        </div>
        <div>
          <div className={styles["blog__box"]}>
            <div className={styles["blog__header"]}>
              <h1>Blog Title</h1>
            </div>
            <div className={styles["blog__para"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque fuga, mollitia delectus consequuntur esse autem odio,
              incidunt molestias perspiciatis ab aliquam dolorum accusamus quas
              quos quod. Exercitationem ratione asperiores quam. Provident illo
              sit sint quidem itaque vel. Officiis perferendis est, facilis
              earum culpa ipsa non iusto voluptatum magnam. Quos, et vitae!
              Officiis suscipit quibusdam veniam omnis ipsam deleniti ducimus
              alias? Id doloribus explicabo aspernatur reiciendis totam
              deleniti.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default User;
