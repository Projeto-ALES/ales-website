import React from "react";

import SideBar from "components/SideBar/SideBar";
import Footer from "components/Footer/Footer";

import Home from "views/Home/Home";

function App() {
  return (
    <div>
      <SideBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
