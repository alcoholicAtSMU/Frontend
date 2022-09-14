import React, { useState, useEffect } from "react";
import axios from "axios";
import "./api/test.css";
import tastes from "./tastes";
import questions from "./questions";

interface radioProps {
  taste: string;
  setTaste: React.Dispatch<React.SetStateAction<string>>;
  seletedTypeIdx: number;
  tasteIdx: number;
}

const Radio = ({ taste, setTaste, seletedTypeIdx, tasteIdx }: radioProps) => {
  return (
    <>
      <p className="question">
        {tastes[seletedTypeIdx].taste[tasteIdx]}
        {questions[1].question}
      </p>

      <p className="answer">
        <label>
          {questions[1].answers[0]}
          <input
            type="radio"
            value={questions[1].answers[0]}
            checked={taste === "없음"}
            onChange={() => setTaste(questions[1].answers[0])}
          ></input>
        </label>
        <label className="answer">
          {questions[1].answers[1]}
          <input
            type="radio"
            value={questions[1].answers[1]}
            checked={taste === "약함"}
            onChange={() => setTaste(questions[1].answers[1])}
          ></input>
        </label>
      </p>
      <p className="answer">
        <label className="answer">
          {questions[1].answers[2]}
          <input
            type="radio"
            value={questions[1].answers[2]}
            checked={taste === "보통"}
            onChange={() => setTaste(questions[1].answers[2])}
          ></input>
        </label>
        <label className="answer">
          {questions[1].answers[3]}
          <input
            type="radio"
            value={questions[1].answers[3]}
            checked={taste === "강함"}
            onChange={() => setTaste(questions[1].answers[3])}
          ></input>
        </label>
      </p>
    </>
  );
};

export default Radio;
