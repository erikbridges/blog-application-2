import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../CSS/create.styl";
export default function StyleButton({ icon, sizes, action }) {
  return (
    <span onClick={action} className={styles["style-btn"]}>
      <FontAwesomeIcon icon={icon} size={sizes} />
    </span>
  );
}
