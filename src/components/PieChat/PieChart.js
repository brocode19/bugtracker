import { Card } from '@mui/material';
import React from 'react'
import ReactApexChart from 'react-apexcharts';

function PieChart() {
  const polar = {
          
    series: [42, 47, 52, 58, 65],
    options: {
      chart: {
        width: 380,
        type: 'polarArea'
      },
      labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
      fill: {
        opacity: 1
      },
      stroke: {
        width: 1,
        colors: undefined
      },
      yaxis: {
        show: false
      },
      legend: {
        position: 'bottom'
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0
          },
          spokes: {
            strokeWidth: 0
          },
        }
      },
      theme: {
        monochrome: {
          enabled: true,
          shadeTo: 'light',
          shadeIntensity: 0.6
        }
      }
    },
  
  
  };
  return (
    <> 
       <Card
    sx={{
      py: 5,
      color: 'grey',
      bgcolor: 'white'}}>
             <ReactApexChart options={polar.options} series={polar.series} type="polarArea" width={380} height={400} />
      </Card>

    
    </>
  )
}

export default PieChart