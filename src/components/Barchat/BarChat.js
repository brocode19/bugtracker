import { Card } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

function BarChat(props) {

  const date = new Date()
  const currentYear = date.getFullYear()
  
  const bar = {
    series: [
      {
        name: "Projects",
        type: "column",
        data: [
          props.January,
          props.February,
          props.March,
          props.April,
          props.May,
          props.June,
          props.July,
          props.August,
          props.September,
          props.October,
          props.November,
          props.December,
        ],
      },
      {
        name: "Bugs",
        type: "column",
        data: [
          props.JanuaryBugs,
          props.FebruaryBugs,
          props.MarchBugs,
          props.AprilBugs,
          props.MayBugs,
          props.JuneBugs,
          props.JulyBugs,
          props.AugustBugs,
          props.SeptemberBugs,
          props.OctoberBugs,
          props.NovemberBugs,
          props.DecemberBugs,
        ],
      },
      {
        name: "Issues",
        type: "column",
        data: [
          props.JanuaryIssue,
          props.FebruaryIssue,
          props.MarchIssue,
          props.AprilIssue,
          props.MayIssue,
          props.JuneIssue,
          props.JulyIssue,
          props.AugustIssue,
          props.SeptemberIssue,
          props.OctoberIssue,
          props.NovemberIssue,
          props.DecemberIssue,
        ],
      },
      {
        name: "Feature Request",
        type: "column",
        data: [
          props.JanuaryFeature,
          props.FebruaryFeature,
          props.MarchFeature,
          props.AprilFeature,
          props.MayFeature,
          props.JuneFeature,
          props.JulyFeature,
          props.AugustFeature,
          props.SeptemberFeature,
          props.OctoberFeature,
          props.NovemberFeature,
          props.DecemberFeature,
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "100%",
        },
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [
        `01/04/${currentYear}`,
        `02/04/${currentYear}`,
        `03/04/${currentYear}`,
        `04/04/${currentYear}`,
        `05/04/${currentYear}`,
        `06/04/${currentYear}`,
        `07/04/${currentYear}`,
        `08/04/${currentYear}`,
        `09/04/${currentYear}`,
        `10/04/${currentYear}`,
        `11/04/${currentYear}`,
        `12/04/${currentYear}`,
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Sum",
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0)// + " points";
            }
            return y;
          },
        },
      },
    },
  };
  return (
    <>
      <Card
        sx={{
          py: 5,
          textAlign: "center",
          color: "#04297A",
          bgcolor: "white",
        }}
      >
        <ReactApexChart
          options={bar.options}
          series={bar.series}
          type="line"
          height={350}
        />
      </Card>
    </>
  );
}

export default BarChat;
