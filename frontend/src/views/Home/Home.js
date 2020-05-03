import React from "react";

import Landing from "./Sections/Landing/Landing";
import WhatIs from "./Sections/WhatIs/WhatIs";

import styles from "./Home.module.scss";

const Home = () => {
  return (
    <>
      <Landing />
      <WhatIs />
      <div className={styles.line}></div>
    </>
  );
};

export default Home;
