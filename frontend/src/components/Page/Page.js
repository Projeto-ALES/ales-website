import React from "react";

import styles from "./Page.module.scss";

const Page = ({ children }) => {
  return <div className={styles.page}>{children}</div>;
};

export default Page;
