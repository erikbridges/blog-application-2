import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBlogsAll } from "../store/actions/actions";
import styles from "../CSS/search.styl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Search extends Component {
  static propTypes = {
    getBlogsAll: PropTypes.func.isRequired
  };
  constructor() {
    super();
    this.state = {
      animation: 1,
      blogList: []
    };
  }
  componentWillMount() {
    this.getBlogs("*");
  }
  getBlogs = async query => {
    const blogList = await this.props.getBlogsAll();
    try {
      console.log(blogList);
      // The * will get all of the blog posts.
      if (query == "*") {
        return this.setState({ blogList: blogList.value.data });
      }
      const filterList = blogList.value.data.filter(
        blogItem => blogItem.title == query
      );
      return this.setState({ blogList: filterList });
    } catch (err) {
      console.error(err);
      return this.setState({
        error: true
      });
    }
  };
  render() {
    return (
      <div className={styles["search__main"]}>
        <div className={styles["search__bar"]}>
          <span>
            <FontAwesomeIcon icon={faSearch} size="2x" />
          </span>
          <input type="text" placeholder="search" />
        </div>
        <div className={styles["search__recent"]}>
          <h3>Recent Searches</h3>
          <ul>
            <li>Test 1</li>
            <li>Result 2</li>
            <li>Result ABC</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {
  getBlogsAll
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Search);
