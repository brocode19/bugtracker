
import { Container, Typography, Grid } from '@mui/material'
import React from 'react'
import Datacard from '../cards/Datacard'

import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as HiIcons from 'react-icons/hi';



function Projects() {
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

       
      </Container>

    </div>
  )
}

export default Projects