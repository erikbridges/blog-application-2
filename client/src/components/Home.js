import React from "react";
import styles from "../CSS/home.styl";
import { Button } from "antd";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className={styles["main__wrap"]}>
      <div className={styles["main"]}>
        <div className={styles["main__header"]}>
          <h1>Make Your Own Blog</h1>
        </div>
        <div className={styles["main__block"]}>
          <ul>
            <li>Create Your Own Blog.</li>
            <li>Share it with others.</li>
            <li>Update and Delete At Anytime.</li>
          </ul>
        </div>
        <div className={styles["btn__main"]}>
          <Button type="primary" size="large">
            Login
          </Button>
          <Link to="/register">New User? Register Here.</Link>
        </div>
      </div>
    </div>
  );
}
export default Home;
