import React, { useState, useEffect } from "react";

import "./test.css";

const Test = () => {
  const item1 = require("../static/a1.PNG");
  const item2 = require("../static/a2.PNG");
  const item3 = require("../static/a3.PNG");
  const item4 = require("../static/a4.PNG");
  const item5 = require("../static/a5.PNG");
  const item6 = require("../static/a6.PNG");
  const item7 = require("../static/a7.PNG");

  let index = 0;

  const arr = [item1, item2, item3, item4, item5, item6, item7];
  const toNext = () => {
    const imgTag = document.getElementById("imgContainer") as HTMLImageElement;
    imgTag.src = arr[index++];
  };
  return (
    <div className="Test-Top-Container">
      <div className="test-card-container">
        <img className="imgContainer" id="imgContainer" src={item1}></img>

        <button onClick={toNext}>{">"}</button>
      </div>
    </div>
  );
};

export default Test;
