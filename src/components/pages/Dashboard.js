
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

  const priorityProjects = projects.filter(project => project.priority === 'high').length
  const totalProjects = projects.length
  const totalBugs =  projects.filter(project => project.type === 'bug').length
  const totalFeatures =  projects.filter(project => project.type === 'feature').length
  const totalIssues =  projects.filter(project => project.type === 'issue').length
  // const totalTickets = tickets.length

   
  return (
    <div className='pages mt-5'>
    <Container maxWidth='xl'>
    <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back Tanashe
      </Typography>

      <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Datacard iconCircle={'#BDD7F1'} color={'#061B64'} context={'Total Projects'} bgcolor={'#D1E9FC'} figure={'500'} icon={<AiIcons.AiOutlineFundProjectionScreen/>}></Datacard>
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