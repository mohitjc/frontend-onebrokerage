import React from "react";
import ReactEcharts from "echarts-for-react";

const Chart = () => {
  const getOption = () => {
    return {
      title: {
        text: "Categories",
      },
      tooltip: {},
      xAxis: {
        type: "category",
        data: [
          "Candies",
          "Gummies",
          "Capsules",
          "Drinks",
          "Functional",
          "Therapeutic",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Category",
          type: "bar",
          data: [120, 200, 150, 80, 30, 60],
        },
      ],
    };
  };

  return (
    <div>
      <ReactEcharts option={getOption()} />
    </div>
  );
};

export default Chart;
