import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import { checkToken } from "../helpers/helpers";
import { getBlogById } from "../store/actions/actions";
import { connect } from "react-redux";
import { Tag } from "antd";
import moment from "moment";
import {
  faArrowLeft,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import styles from "../CSS/posts.styl";
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      post: "<p>Loading...</p>",
      authorized: false,
      hidden: false,
      date: ""
    };
  }
  componentDidMount() {
    this.authorizeUser();
    this.getPost();
  }
  getPost = async () => {
    try {
      // Get Blog By Id
      const post = await this.props.getBlogById(this.props.match.params.id);
      // Check if this blog is private
      if (post.value.data.hidden == true && this.state.authorized !== true) {
        // You cannot view this content
        this.setState({
          title: "Private Content",
          date: post.value.data.datecreated,
          hidden: post.value.data.hidden,
          post:
            "<p>This content is private. If you are the author please login to view.</p>"
        });
      } else {
        this.setState({
          title: post.value.data.title,
          date: post.value.data.datecreated,
          hidden: post.value.data.hidden,
          post: JSON.parse(post.value.data.post)
        });
      }
    } catch (err) {
      console.error(err);
      this.setState({
        title: "Error",
        post:
          "<p style='color: red'>This blog post cannot be viewed due to an unexpected error.</p>"
      });
    }
  };
  authorizeUser = async () => {
    try {
      const token = await checkToken();
      if (!token.session) {
        return this.setState({
          authorized: false
        });
      } else if (token.session) {
        return this.setState({
          authorized: true
        });
      }
    } catch (err) {
      localStorage.removeItem("token");
    }
  };
  goBack = () => {
    if (this.state.authorized) {
      return this.props.history.push("/");
    } else {
      return this.props.history.push("/search");
    }
  };
  render() {
    const { authorized, title, post, date, hidden } = this.state;
    return (
      <div>
        <div className={styles["panel__main"]}>
          <span className={styles["panel__icon"]}>
            {authorized ? (
              <React.Fragment>
                <span onClick={() => this.goBack()}>
                  <Tooltip title="Go Back">
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </Tooltip>
                </span>
                <div className={styles["panel__settings"]}>
                  <span>
                    <Tooltip title="Edit blog post">
                      <FontAwesomeIcon icon={faEdit} />
                    </Tooltip>
                  </span>
                  <span>
                    <Tooltip title="Delete blog post">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Tooltip>
                  </span>
                </div>
              </React.Fragment>
            ) : (
              <span>
                <Tooltip title="Back to Search">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={() => this.goBack()}
                  />
                </Tooltip>
              </span>
            )}
          </span>
          <span className={styles["panel__title"]}>{title}</span>
          <span style={{ margin: "10px" }}>
            {hidden ? (
              <Tooltip title="This post is only visible to you">
                <Tag color="purple">Private</Tag>
              </Tooltip>
            ) : (
              <Tooltip title="This post is visible to everyone.">
                <Tag color="blue">Public</Tag>
              </Tooltip>
            )}
          </span>
        </div>
        <div className={styles["post"]}>
          <div className={styles["post__title"]}>
            <span>{title}</span>
            <span>Username</span>
            <span>{moment(new Date(date)).format("MMMM D, YYYY")}</span>
          </div>
          <div className={styles["post__main"]}>{ReactHtmlParser(post)}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {
  getBlogById
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Post);
