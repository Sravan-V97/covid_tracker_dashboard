import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../../Components/api/index";
import { Line, Bar } from "react-chartjs-2";

const ChartData = () => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    // console.log(dailyData);
    fetchAPI();
  });

  const barchart = dailyData ? (
    <Bar
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#333fff",
            fill: true,
            backgroundColor: "#4897ff",
          },
          //   {
          //     data: dailyData.map(({ deaths }) => deaths),
          //     label: "Deaths",
          //     borderColor: "red",
          //     backgroundColor: "rgba(255, 0 ,0, 0.5)",
          //     fill: true,
          //   },
        ],
      }}
    />
  ) : null;

  return <div>{barchart}</div>;
};

export default ChartData;
