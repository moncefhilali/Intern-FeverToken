import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Textinput from "./textinput";
import Submitpage from "./submitpage";
import Redirectpage from "./redirectpage";

function Mainpage() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Redirectpage />} />
          <Route path="/candidate" element={<Textinput />} />
          <Route path="/submit" element={<Submitpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Mainpage;
