import React, { useState, useEffect } from "react";
import axios from "axios";
import tastes from "./tastes";
import questions from "./questions";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { isBuffer } from "util";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface resultGraphProps {
  id: number;
  taste_1: string;
  taste_2: string;
  taste_3: string;
  taste_4: string;
  taste_5: string;
  seletedTypeIdx: number;
}
const Test = ({
  id,
  taste_1,
  taste_2,
  taste_3,
  taste_4,
  taste_5,
  seletedTypeIdx,
}: resultGraphProps) => {
  let tasteArr = [taste_1, taste_2, taste_3, taste_4, taste_5];
  let tasteNumArr: Array<number> = [];

  for (let i = 0; i < 5; i++) {
    if (tasteArr[i] === "없음") tasteNumArr.push(0);
    else if (tasteArr[i] === "약함") tasteNumArr.push(5);
    else if (tasteArr[i] === "보통") tasteNumArr.push(10);
    else if (tasteArr[i] === "강함") tasteNumArr.push(15);
  }

  const resultChartlabels = [
    tastes[seletedTypeIdx].taste[0],
    tastes[seletedTypeIdx].taste[1],
    tastes[seletedTypeIdx].taste[2],
    tastes[seletedTypeIdx].taste[3],
    tastes[seletedTypeIdx].taste[4],
  ];

  const resultChartdatas = {
    labels: resultChartlabels,
    datasets: [
      {
        axis: "x",
        data: tasteNumArr,
        fill: false,
        font: {
          size: 8,
        },
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(255, 205, 86, 0.4)",
          "rgba(75, 192, 192,0.4)",
          "rgba(54, 162, 235, 0.4)",
        ],
      },
    ],
  };
  return (
    <div className="Bar-container">
      <Bar
        data={resultChartdatas}
        width={20}
        height={15}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 8,
                },
              },
            },
            y: {
              ticks: {
                font: {
                  size: 10,
                },
              },
            },
          },
          indexAxis: "x",
        }}
      />
    </div>
  );
};

export default Test;
