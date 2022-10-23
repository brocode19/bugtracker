
import { Container, Typography, Grid, Card } from '@mui/material'
import React from 'react'
import Datacard from '../cards/Datacard'

import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as HiIcons from 'react-icons/hi';
import BarChat from '../Barchat/BarChat';
import PieChart from '../PieChat/PieChart';
import Spline from '../SplineGraph/Spline';
import Projectstable from '../Projectstable';



function Projects() {
  return (
    <div className='pages'>
      <Container maxWidth='xl'>
      <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back Tanashe
        </Typography>


        <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <Spline/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
           <PieChart/>

        </Grid>

        </Grid>

        <Grid sx={{py:3}} container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
        <Projectstable/>
        </Grid>

        </Grid>




       
      </Container>

    </div>
  )
}

export default Projects