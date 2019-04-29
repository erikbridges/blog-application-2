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
  faCheck,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
/* === REQUESTS === */
import { getBlogsFromAuthor } from "../store/actions/actions";
/* === STYLE === */
import styles from "../CSS/users.styl";
import { Tooltip } from "antd";
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
      blogList: [],
      blogListFilter: [],
      current: "blogs"
    };
  }
  componentDidMount() {
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
        const blogList = await this.props.getBlogsFromAuthor();
        console.log(blogList);
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
      console.log(err);
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
  getInput = e => this.setState({ [e.target.name]: e.target.value });
  renderFeed = () => {
    const { blogList } = this.state;
    if (blogList.length !== 0) {
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
    } else {
      return (
        <div className={styles["blog__not-found"]}>
          <h2>No Blog Post Found. Please search another query.</h2>
        </div>
      );
    }
  };
  renderUnauthorizedUser = () => (
    <div className={styles["session-main"]}>
      <h1>Your Session Has Ended.</h1>
      <Link to="/">Click here to login in.</Link>
    </div>
  );
  getBlogsByTitle = async e => {
    e.preventDefault();
    const { input } = this.state;
    const blogList = await this.props.getBlogsFromAuthor();
    const filterBlogList = blogList.value.data.filter(
      blogItem => blogItem.title === input
    );
    this.setState({
      blogList: input == "" ? blogList.value.data : filterBlogList
    });
  };
  render() {
    const { _id, session, username, email, followers, title } = this.state;
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
              <Link to={`/user/${_id}/create`}>
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
          <h2 className={styles["feed__title"]}> Blogs Posts </h2>
          <div className={styles["feed__input"]}>
            <input
              placeholder="Search"
              name="input"
              onChange={e => this.getInput(e)}
            />
            <button
              className={styles["btn-search"]}
              onClick={e => this.getBlogsByTitle(e)}
            >
              <FontAwesomeIcon icon={faSearch} size="lg" />
            </button>
          </div>
          {this.renderFeed()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {
  getBlogsFromAuthor
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(User);
