import React from "react";
import ReactEcharts from "echarts-for-react";

const PieChart = () => {
  // Data for the pie chart
  const data = [
    { value: 20, name: "A" },
    { value: 15, name: "B" },
    { value: 25, name: "C" },
    { value: 10, name: "D" },
    { value: 30, name: "E" },
  ];

  // Options for the pie chart
  const options = {
    // title: {
    //   text: "",
    //   left: "center",
    // },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    series: [
      {
        name: "Products",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return <ReactEcharts option={options} style={{ height: "400px" }} />;
};

export default PieChart;
