import React, { Component } from "react";
import { Navigate } from "react-router-dom";

function Redirectpage() {
  return (
    <div>
      <Navigate to="/candidate" />
    </div>
  );
}

export default Redirectpage;
