import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

function Submitpage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="thank" id="thank-div">
        <h2 id="thank-head2">Thank you!</h2>
        <h3 id="thank-head3">Your application has been submitted.</h3>
        <div id="thank-btn-div">
          <button
            id="thank-btn"
            onClick={() => {
              navigate("/candidate");
            }}
          >
            Back to job application
          </button>
        </div>
      </div>
      <div id="thank-img-div">
        <img id="thank-img" src="../check.png" alt="" />
      </div>
    </div>
  );
}

export default Submitpage;
