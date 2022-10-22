
import { Container, Typography, Grid } from '@mui/material'
import React from 'react'
import Datacard from '../cards/Datacard'

import * as AiIcons from 'react-icons/ai';


function Projects() {
  return (
    <div className='pages'>
      <Container maxWidth='xl'>
      <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back Tanashe
        </Typography>

        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Datacard color={'#061B64'} context={'New Projects'} bgcolor={'#D1E9FC'} figure={'500'} icon={<AiIcons.AiOutlineBug/>}></Datacard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <Datacard color={'#061B64'} context={'Priority Projects'} bgcolor={'#D1E9FC'} figure={'500'} icon={<AiIcons.AiOutlineBug/>}></Datacard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <Datacard color={'#061B64'} context={'Tickets'} bgcolor={'#D1E9FC'} figure={'500'} icon={<AiIcons.AiOutlineBug/>}></Datacard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          <Datacard color={'#061B64'} context={'Bug Issues'} bgcolor={'#D1E9FC'} figure={'500'} icon={<AiIcons.AiOutlineBug/>}></Datacard>
          </Grid>
        </Grid>

       
      </Container>

    </div>
  )
}

export default Projects