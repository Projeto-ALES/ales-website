import React from "react";

import Landing from "./Sections/Landing/Landing";
import WhatIs from "./Sections/WhatIs/WhatIs";
import WhatDo from "./Sections/WhatDo/WhatDo";
import About from "./Sections/About/About";
import Testimonials2 from "./Sections/Testimonials2/Testimonials2";

import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <Landing />
      <WhatIs />
      <div className={styles.line}></div>
      <WhatDo />
      <div className={styles.line}></div>
      <Testimonials2/>
      <About />
    </div>
  );
};

export default Home;
