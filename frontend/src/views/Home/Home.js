import React from "react";

import Landing from "./Sections/Landing/Landing";
import WhatIs from "./Sections/WhatIs/WhatIs";
import WhatDo from "./Sections/WhatDo/WhatDo";

import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Landing />
      <WhatIs />
      <div className={styles.line}></div>
      <WhatDo />
    </div>
  );
};

export default Home;
