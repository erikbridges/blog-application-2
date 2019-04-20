/* === DEPENDANCIES  === */
import React, { Component } from "react";
// import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkToken } from "../helpers/helpers";
import {
  faTools,
  faBlog,
  faUserFriends,
  faPlusCircle,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
/* === REQUESTS === */
import { getBlogs } from "../store/actions/actions";
/* === STYLE === */
import styles from "../CSS/users.styl";
import { Tooltip, Pagination } from "antd";
import { connect } from "react-redux";
/* === COMPONENTS === */
import BlogItem from "../components/partials/BlogItem";
class User extends Component {
  constructor() {
    super();
    this.state = {
      session: false,
      _id: 0,
      username: "",
      email: "",
      title: "",
      followers: [],
      current: "blogs"
    };
  }
  async componentDidMount() {
    this.authorizeUser();
  }
  authorizeUser = async () => {
    try {
      const token = await checkToken();
      if (!token.session) {
        return this.setState({
          session: false
        });
      } else if (token.session) {
        const blogList = await this.props.getBlogs();
        this.setState({
          session: true,
          _id: token._id,
          username: token.username,
          title: token.title,
          email: token.email,
          followers: token.followers,
          blogList: blogList.value.data
        });
      }
    } catch (err) {
      localStorage.removeItem("token");
      this.setState({ session: false });
    }
  };
  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  renderFeed = () => {
    const { blogList } = this.state;
    console.log(blogList);
    // Render Blogs from user
    return blogList.map(blogItem => (
      <BlogItem
        key={blogItem.blog_id}
        _id={blogItem.blog_id}
        title={blogItem.title}
        desc={blogItem.post}
        date={blogItem.datecreated}
        hidden={blogItem.hidden}
      />
    ));
  };
  renderUnauthorizedUser = () => (
    <div className={styles["session-main"]}>
      <h1>Your Session Has Ended.</h1>
      <Link to="/">Click here to login in.</Link>
    </div>
  );
  render() {
    const { session, username, email, followers, title } = this.state;
    return !session ? (
      this.renderUnauthorizedUser()
    ) : (
      <div className={styles["main"]}>
        <div className={styles["menu__main"]}>
          <div className={styles["menu__img"]}>
            <img
              src="../../public/images/image-background.jpg"
              alt="background image"
            />
          </div>
          <div className={styles["img-wrapper"]}>
            <img src="https://via.placeholder.com/200" />
          </div>
          <div>
            <h1 className={styles["menu__user"]}>
              {username}
              <span> {email} </span>
              <span>{title == "" ? "Title goes here..." : title}</span>
            </h1>
            <div className={styles["menu__followers"]}>
              <Tooltip title="Followers" placement="left">
                <span>
                  <FontAwesomeIcon icon={faUserFriends} /> 0
                </span>
              </Tooltip>
              <Tooltip title="Following" placement="right">
                <span>
                  <FontAwesomeIcon icon={faCheck} /> 0
                </span>
              </Tooltip>
            </div>
            <div className={styles["menu__nav"]}>
              <span>
                <FontAwesomeIcon icon={faTools} style={{ marginRight: 10 }} />
                Settings
              </span>

              <span>
                <FontAwesomeIcon icon={faBlog} style={{ marginRight: 10 }} />
                Blogs
              </span>
              <Link to={`/user/${this.state._id}/create`}>
                <span>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ marginRight: 10 }}
                  />
                  Create
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles["main__blog"]}>
          <h2 className={styles["feed__title"]}> Blogs Posted </h2>
          {this.renderFeed()}
          <div className={styles["main__blog-pagination"]}>
            <Pagination simple defaultCurrent={1} total={50} />
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
  getBlogs
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(User);
