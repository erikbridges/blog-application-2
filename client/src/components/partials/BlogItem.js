import React from "react";
import styles from "../../CSS/users.styl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, Tag, Button } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import Interweave from "interweave";
const BlogItem = ({ title, desc, date, hidden, _id }) => {
  return (
    <div className={styles["main__blog-box"]}>
      <div className={styles["main__blog-header"]}>
        <h1>{title}</h1>
        <div>
          <span> {moment(new Date(date)).format("MMMM D, YYYY")} </span>
          <span style={{ display: "block", marginRight: "auto" }}>
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
      </div>
      <div className={styles["main__blog-para"]}>
        <Interweave content={JSON.parse(desc).substring(0, 15) + "..."} />
      </div>
      <div className={styles["main__blog-settings"]}>
        <div className={styles["main__blog-link"]}>
          <Link to={`/blog/post/${_id}`}>
            <Button type="primary">Visit Blog</Button>
          </Link>
        </div>
        <Tooltip title="Edit Blog">
          <span>
            <FontAwesomeIcon icon={faEdit} />
          </span>
        </Tooltip>
        <Tooltip title="Delete Blog" placement="bottom">
          <span>
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default BlogItem;
