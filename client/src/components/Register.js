import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../CSS/register.styl";
import { Link } from "react-router-dom";
import { Form, Input, Button, Tooltip, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
import classNames from "classnames";
import {
  validateUsername,
  validateEmail,
  validatePass
} from "../validators/validators";
const recaptchaRef = React.createRef();
import { connect } from "react-redux";
import { addUser } from "../store/actions/actions";

class Register extends Component {
  static propTypes = {
    addUser: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: false,
      success: false,
      errorMessage: ""
    };
  }
  changeInput = e => this.setState({ [e.target.name]: e.target.value });

  invalidInput = errorMessage => {
    window.grecaptcha.reset();
    message.error(errorMessage);
    this.setState({ error: true, errorMessage });
  };

  onSubmit = async e => {
    const { addUser } = this.props;
    const { username, email, password } = this.state;
    e.preventDefault();
    const recaptchaValue = recaptchaRef.current.getValue();
    /* Validate Inputs
    ________________________*/
    /* === USERNAME === */
    const isValidUsername = validateUsername(username);
    if (isValidUsername.error) {
      return this.invalidInput(isValidUsername.errorMessage);
    }
    /* === EMAIL === */
    const isValidEmail = validateEmail(email);
    if (isValidEmail.error) {
      return this.invalidInput(isValidEmail.errorMessage);
    }
    /* === PASSWORD === */
    const isValidPass = validatePass(password);
    if (isValidPass.error) {
      return this.invalidInput(isValidPass.errorMessage);
    }
    /* Submit to Server
    __________________________________*/
    try {
      const registerUser = await addUser({
        username,
        email,
        password,
        captcha: recaptchaValue
      });

      if (registerUser.value.data.code == 200) {
        this.setState({
          username: "",
          email: "",
          password: "",
          // eslint-disable-next-line react/no-unused-state
          captcha: "",
          success: true
        });
        message.success("User registered successful.");
      }
    } catch (error) {
      message.error(error.response.data.message);
      this.invalidInput(error.response.data.message);
    }
  };

  render() {
    const { error, errorMessage, success } = this.state;
    return (
      <div className={styles["blog__reg"]}>
        <img
          className={styles["blog__img"]}
          src="../../public/images/banner.jpg"
        />
        <div className={styles["blog__login"]}>
          <h1>Sign In</h1>
          <p> Already Registered? Sign In.</p>
          <Button size="large" ghost type="primary">
            <Link to="/"> Login </Link>
          </Button>
        </div>
        <div className={styles["reg__box"]}>
          <div className={styles["reg__form"]}>
            <div className={styles["reg__header"]}>
              <h1>Register</h1>
            </div>
            {error ? (
              <div className={styles["reg__error"]}>
                <p>{errorMessage}</p>
              </div>
            ) : null}
            <div>
              {success ? (
                <div>
                  <p>
                    Form Submitted Successfully.{" "}
                    <Link to="/">Please Login.</Link>
                  </p>
                </div>
              ) : (
                <Form>
                  <Form.Item>
                    <label htmlFor="username" className={styles["input-label"]}>
                      Username
                    </label>
                    <Tooltip
                      title="Min 8 Max 30 cannot contain a _ or . at the beginning, middle nor the end. letters and numbers are allowed"
                      placement="left"
                    >
                      <FontAwesomeIcon
                        icon={faQuestionCircle}
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          color: "#DDD"
                        }}
                      />
                    </Tooltip>
                    <Input
                      placeholder="username"
                      name="username"
                      size="large"
                      type="text"
                      onChange={e => this.changeInput(e)}
                      className={classNames({
                        [styles["error__input"]]: error
                      })}
                    />
                  </Form.Item>
                  <Form.Item>
                    <label htmlFor="email" className={styles["input-label"]}>
                      Email
                    </label>
                    <Tooltip
                      title="Please enter a valid email address. Make sure to include the '@' symbol."
                      placement="right"
                    >
                      <FontAwesomeIcon
                        icon={faQuestionCircle}
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          color: "#DDD"
                        }}
                      />
                    </Tooltip>
                    <Input
                      placeholder="email"
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
                    <Tooltip
                      title="Minimum eight and maximum 100 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
                      placement="left"
                    >
                      <FontAwesomeIcon
                        icon={faQuestionCircle}
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          color: "#DDD"
                        }}
                      />
                    </Tooltip>
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
                  <Form.Item>
                    <div className={styles["form__btn"]}>
                      <Button
                        size="large"
                        type="primary"
                        onClick={e => this.onSubmit(e)}
                      >
                        Register
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              )}
            </div>
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
  addUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Register);
