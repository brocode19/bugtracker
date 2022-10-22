
import { Container, Typography, Grid, Card } from '@mui/material'
import React, { useState } from 'react'
import Datacard from '../cards/Datacard'

import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as HiIcons from 'react-icons/hi';
import BarChat from '../Barchat/BarChat';
import PieChart from '../PieChat/PieChart';



function Dashboard() {
  const [projects, setProjects] = useState([]);

  const priorityProjectsAmount = projects.filter(project => project.priority === 'high').length
   


  const [priorityData, setPriorityData] = useState({
    labels: ['high', 'medium', 'low'],
    datasets: [
      {
        label: '# of Votes',
        data: [priorityProjectsAmount, 2, 5],
        backgroundColor: [
  
          // 'red',
          // 'blue',
          // '#41f1b6'
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const projectPriorityOptions = {

    // maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Projects by Priority',
          align: 'start'
        },
      },
    };
  return (
    <div className='pages'>
    <Container maxWidth='xl'>
    <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back Tanashe
      </Typography>

      <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Datacard iconCircle={'#BDD7F1'} color={'#061B64'} context={'New Projects'} bgcolor={'#D1E9FC'} figure={'500'} icon={<AiIcons.AiOutlineFundProjectionScreen/>}></Datacard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
        <Datacard iconCircle={'#C1E6F9'} color={'#04297A'} context={'Priority Projects'} bgcolor={'#D0F2FF'} figure={'7'} icon={<MdIcons.MdPriorityHigh/>}></Datacard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
        <Datacard iconCircle={'#F9EEBD'} color={'#7A4F01'} context={'Tickets'} bgcolor={'#FFF7CD'} figure={'20'} icon={<HiIcons.HiOutlineTicket/>}></Datacard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
        <Datacard iconCircle={'#F7D1C7'} color={'#7A0C2E'} context={'Bug Issues'} bgcolor={'#FFE7D9'} figure={'69'} icon={<AiIcons.AiOutlineBug/>}></Datacard>
        </Grid>
      </Grid>

      <Grid sx={{py:3}} container spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
        <BarChat/>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
         <PieChart/>

      </Grid>
      </Grid>



     
    </Container>

  </div>
  )
}

export default Dashboard