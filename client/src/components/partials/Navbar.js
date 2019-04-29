import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../CSS/navbar.styl";
import classNames from "classnames";

function Navbar() {
  const [state, setState] = useState({
    active: false
  });
  const { active } = state;

  const toggleActive = () => setState({ ...state, active: !state.active });
  return (
    <React.Fragment>
      <div className={styles["navbar"]}>
        <div
          className={styles["navbar__collapse"]}
          onClick={() => toggleActive()}
        >
          <span />
          <span />
          <span />
        </div>
        <div className={styles["navbar__header"]}>
          <h1>PV Blogs</h1>
        </div>
        <div
          className={classNames({
            [styles["navbar__wrapper"]]: true,
            [styles["navbar__active"]]: active
          })}
        >
          <div className={styles["navbar__nav"]}>
            <NavLink to="/" onClick={() => toggleActive()}>
              Home
            </NavLink>
            <NavLink to="/search" onClick={() => toggleActive()}>
              Blog Search
            </NavLink>
          </div>
        </div>
      </div>
      <div
        className={classNames({
          [styles["navbar__footer"]]: true,
          [styles["navbar__active"]]: active
        })}
      >
        <p>&copy; 2019 Blog Application 2.0. Created By Erik Bridges.</p>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
