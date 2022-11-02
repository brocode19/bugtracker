import { Card } from '@mui/material';
import React from 'react'
import ReactApexChart from 'react-apexcharts';



function Spline(props) {
    const spline = {
      series: [{
        name: "Projects",
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
        ]
    }],
    options: {
      chart: {
        height: 350,
        type: 'area',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Projects',
        align: 'left'
      },
      grid: {
        // row: {
        //   colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        //   opacity: 0.5
        // },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'],
      }
    }
  }
  return (
    <>
           <Card
    sx={{
      py: 5,
      color: 'grey',
      bgcolor: 'white'}}>
                  <ReactApexChart options={spline.options} series={spline.series} type="area" height={350} /> 
      </Card>


    </>
  )
}

export default Spline