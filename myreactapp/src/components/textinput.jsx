// import e from "cors";
import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";

class Textinput extends Component {
  constructor(props) {
    super(props);
    var err = false;
    var file;
    this.state = {
      firstName: "",
      lastName: "",
      Email: "",
      Description: "",
      cvPath: "",
    };
    this.hundelSubmit = this.hundelSubmit.bind(this);
  }

  hundelSubmit(e) {
    // e.preventDefault(); // To avoid refreching the page
    e.preventDefault();
    const inpArr = ["firstName", "lastName", "Email", "Description", "cvPath"];
    if (this.err) {
      e.preventDefault();
      for (var i = 0; i < 5; i++) {
        if (document.getElementById(inpArr[i]).style.borderColor === "red") {
          document.getElementById(inpArr[i]).style.animation =
            "shake 0.2s ease-in-out 0s 2";
        }
      }
    } else {
      const data = new FormData();
      data.append("file", this.file);
      axios
        .post("/upload", data)
        .then((e) => {
          console.log("file uploaded!");
        })
        .catch((e) => {
          console.error("Upload Error : ", e);
        });
      const { firstName, lastName, Email, Description, cvPath } = this.state;
      console.log(firstName, lastName, Email, Description, cvPath);
      fetch("/candidate", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          Email,
          Description,
          cvPath,
        }),
      })
        .then((res) => console.log(res))
        .then(() => window.location.replace("/submit"));
    }
  }

  render() {
    const handlError = (e) => {
      let iv = document.getElementById(e.target.name).value;
      if (iv.length === 0) {
        document.getElementById(e.target.name).style.borderColor = "red";
        this.err = true;
      } else {
        if (e.target.id === "cvPath") {
          if (
            e.target.files[0].type === "application/pdf" ||
            e.target.files[0].type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ) {
            this.err = false;
            document.getElementById(e.target.name).style.borderColor = "white";
            this.file = e.target.files[0];
            this.setState({
              [e.target.name]: `/cv/${Date.now()}_${e.target.files[0].name}`,
            });
            console.log(e.target.files[0]);
          } else {
            document.getElementById(e.target.name).style.borderColor = "red";
            this.err = true;
          }
        } else {
          this.err = false;
          document.getElementById(e.target.name).style.borderColor = "white";
          this.setState({ [e.target.name]: e.target.value });
          console.log(e.target.value);
          console.log(e.target.name);
        }
      }
    };

    return (
      <div>
        <div className="form-div">
          <form onSubmit={this.hundelSubmit}>
            <div className="form-head">
              <h1>Job Application</h1>
            </div>
            <div className="form-inp">
              <input
                id="firstName"
                className="form-item"
                type="text"
                placeholder="First name"
                name="firstName"
                // onChange={(e) => this.setState({ firstName: e.target.value })}
                onChange={handlError}
                onFocus={handlError}
              />
              <br />
              <input
                id="lastName"
                className="form-item"
                type="text"
                placeholder="Last name"
                name="lastName"
                // onChange={(e) => this.setState({ lastName: e.target.value })}
                onChange={handlError}
                onFocus={handlError}
              />
              <br />
              <input
                id="Email"
                className="form-item"
                type="email"
                placeholder="Email"
                name="Email"
                // onChange={(e) => this.setState({ Email: e.target.value })}
                onChange={handlError}
                onFocus={handlError}
              />
              <br />
              <textarea
                id="Description"
                placeholder="About you"
                name="Description"
                cols="30"
                rows="2"
                // onChange={(e) => this.setState({ Description: e.target.value })}
                onChange={handlError}
                onFocus={handlError}
              ></textarea>
            </div>
            <div className="form-file">
              <input
                id="cvPath"
                className="form-item"
                type="file"
                name="cvPath"
                accept=".pdf, .docx"
                onChange={handlError}
                onFocus={handlError}
              />
            </div>
            <div className="form-btn">
              <button id="form-btn">SUBMIT</button>
            </div>
          </form>
        </div>
        <div id="cv-img-div">
          <img id="cv-img" src="../cv.png" alt="cv_img" />
        </div>
      </div>
    );
  }
}

export default Textinput;
