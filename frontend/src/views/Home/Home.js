import React from "react";

import Landing from "./Sections/Landing/Landing";
import WhatIs from "./Sections/WhatIs/WhatIs";
import WhatDo from "./Sections/WhatDo/WhatDo";
import Subscription from "./Sections/Subscription/Subscription";
import About from "./Sections/About/About";

import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Landing />
      <Subscription />
      <WhatIs />
      <div className={styles.line}></div>
      <WhatDo />
      <About />
    </div>
  );
};

export default Home;
