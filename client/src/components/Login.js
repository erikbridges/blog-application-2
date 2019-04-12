import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../CSS/login.styl";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../store/actions/actions";
import { Form, Input, message, Button } from "antd";
import axios from "axios";
import classNames from "classnames";
import ReCAPTCHA from "react-google-recaptcha";
const recaptchaRef = React.createRef();
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      triggered: false,
      error: false,
      errorMessage: "",
      loginUser: props.loginUser
    };
  }
  async componentDidMount() {
    // Skip login if token is provided already.
    const token = localStorage.getItem("token");
    console.log(token);
    // Login User By Token.
    this.loginToken(token);
  }
  loginToken = async token => {
    // Login User By Token.
    try {
      const getUser = await axios.get("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (getUser.data.code == 200) {
        this.props.history.push(`/user/${getUser.data._id}`);
      }
    } catch (ex) {
      return;
    }
  };

  changeInput = e => this.setState({ [e.target.name]: e.target.value });
  invalidInput = errorMessage => {
    window.grecaptcha.reset();
    message.error(errorMessage);
    this.setState({
      error: true,
      errorMessage,
      triggered: false
    });
  };
  onSubmit = async e => {
    const { email, password, loginUser } = this.state;
    e.preventDefault();
    this.setState({ triggered: true });
    // === LOGIN USER ===
    try {
      // Generate Token if login is successful.
      const recaptchaValue = recaptchaRef.current.getValue();
      const loginAttempt = await loginUser({
        email,
        password,
        captcha: recaptchaValue
      });

      if (loginAttempt.action.payload.data.code == 200) {
        this.setState({
          email: "",
          password: ""
        });

        // Get Login Token.
        localStorage.removeItem("token");
        localStorage.setItem("token", loginAttempt.action.payload.data.token);
        const token = localStorage.getItem("token");

        // Redirect User To User Page.
        this.loginToken(token);
      }
    } catch (error) {
      if (error.response.data.message.includes("Captcha")) {
        return this.invalidInput(
          "Invalid Captcha. Make sure that you check the box."
        );
      }
      return this.invalidInput("Invalid Username or Password");
    }
  };
  render() {
    const { error, errorMessage, triggered } = this.state;
    return (
      <div className={styles["login__main"]}>
        <div className={styles["login__banner"]}>
          <div className={styles["login__img-wrap"]}>
            <img
              className={styles["login__img"]}
              src="../../public/images/banner.jpg"
            />
          </div>

          <div className={styles["login__banner-header"]}>
            <div>
              <h1>Tell Your Own Story.</h1>
              <ul>
                <li>Public Or Private</li>
                <li>Anywhere Anytime</li>
                <li>For Free! No Hidden Fees.</li>
              </ul>
            </div>
          </div>
          <div className={styles["social__main"]}>
            <div>
              <FontAwesomeIcon icon={faFacebook} />
            </div>
            <div>
              <FontAwesomeIcon icon={faTwitter} />
            </div>
            <div>
              <FontAwesomeIcon icon={faInstagram} />
            </div>
          </div>
        </div>
        <div className={styles["login__box"]}>
          <div className={styles["login__form"]}>
            <Form>
              <div className={styles["login__header"]}>
                <h1>Login</h1>
              </div>
              <div className={styles["error__box"]}>
                {error ? <p>{errorMessage}</p> : null}
              </div>
              <Form.Item>
                <label htmlFor="email" className={styles["input-label"]}>
                  Email
                </label>
                <Input
                  placeholder="Email"
                  name="email"
                  size="large"
                  type="email"
                  onChange={e => this.changeInput(e)}
                  className={classNames({
                    [styles["error__input"]]: error
                  })}
                />
              </Form.Item>
              <Form.Item>
                <label htmlFor="password" className={styles["input-label"]}>
                  Password
                </label>
                <Input.Password
                  placeholder="password"
                  name="password"
                  size="large"
                  onChange={e => this.changeInput(e)}
                  type="password"
                  className={classNames({
                    [styles["error__input"]]: error
                  })}
                />
              </Form.Item>
              <Form.Item>
                <ReCAPTCHA
                  sitekey="6LcyvZwUAAAAANW6lEeEd5BppWzouLx0KgNwSODc"
                  ref={recaptchaRef}
                  theme="dark"
                />
              </Form.Item>
              <div className={styles["form__btn-wrapper"]}>
                {triggered ? (
                  <Button color="primary" disabled>
                    Loading...
                  </Button>
                ) : (
                  <Button color="primary" onClick={e => this.onSubmit(e)}>
                    Login
                  </Button>
                )}
                <Link to="/register">Not Signed Up Yet? Register Here.</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {
  loginUser
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Login);
