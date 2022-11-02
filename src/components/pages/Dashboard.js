
import { Container, Typography, Grid, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Datacard from '../cards/Datacard'

import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as HiIcons from 'react-icons/hi';
import BarChat from '../Barchat/BarChat';
import PieChart from '../PieChat/PieChart';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';



function Dashboard() {

  useEffect(() => {

    const fetchData = async () =>{

      let list = [];
      try {        
        const querySnapshot = await getDocs(collection(db, "projects"));
        querySnapshot.forEach((doc) => {
          list.push({id: doc.id,...doc.data()})
          setProjects(list)
        
        });
      
      } catch (error) {
        console.log(error);
        
      }
    }


    fetchData()
  }, [])
  const [projects, setProjects] = useState([]);

  const highPriority = projects.filter(project => project.priority === 'high').length
  const totalProjects = projects.length
  const totalBugs =  projects.filter(project => project.type === 'bug').length
  const totalFeatures =  projects.filter(project => project.type === 'feature').length
  const totalIssues =  projects.filter(project => project.type === 'issue').length

  const January = projects.filter(project => project.month === 0).length
  const JanuaryBugs = projects.filter(project => project.month === 0 &&  project.type === 'bug' ).length
  const JanuaryFeature = projects.filter(project => project.month === 0 &&  project.type === 'feature' ).length
  const JanuaryIssue = projects.filter(project => project.month === 0 &&  project.type === 'issue' ).length

  const February = projects.filter(project => project.month === 1).length
  const FebruaryBugs = projects.filter(project => project.month === 1 &&  project.type === 'bug' ).length
  const FebruaryFeature = projects.filter(project => project.month === 1 &&  project.type === 'feature' ).length
  const FebruaryIssue = projects.filter(project => project.month === 1 &&  project.type === 'issue' ).length

  const March = projects.filter(project => project.month === 2).length
  const MarchBugs = projects.filter(project => project.month === 2 &&  project.type === 'bug' ).length
  const MarchFeature = projects.filter(project => project.month === 2 &&  project.type === 'feature' ).length
  const MarchIssue = projects.filter(project => project.month === 2 &&  project.type === 'issue' ).length

  const April = projects.filter(project => project.month === 3).length
  const AprilBugs = projects.filter(project => project.month === 3 &&  project.type === 'bug' ).length
  const AprilFeature = projects.filter(project => project.month === 3 &&  project.type === 'feature' ).length
  const AprilIssue = projects.filter(project => project.month === 3 &&  project.type === 'issue' ).length

  const May = projects.filter(project => project.month === 4).length
  const MayBugs = projects.filter(project => project.month === 4 &&  project.type === 'bug' ).length
  const MayFeature = projects.filter(project => project.month === 4 &&  project.type === 'feature' ).length
  const MayIssue = projects.filter(project => project.month === 4 &&  project.type === 'issue' ).length

  const June = projects.filter(project => project.month === 5).length
  const JuneBugs = projects.filter(project => project.month === 5 &&  project.type === 'bug' ).length
  const JuneFeature = projects.filter(project => project.month === 5 &&  project.type === 'feature' ).length
  const JuneIssue = projects.filter(project => project.month === 5 &&  project.type === 'issue' ).length

  const July = projects.filter(project => project.month === 6).length
  const JulyBugs = projects.filter(project => project.month === 6 &&  project.type === 'bug' ).length
  const JulyFeature = projects.filter(project => project.month === 6 &&  project.type === 'feature' ).length
  const JulyIssue = projects.filter(project => project.month === 6 &&  project.type === 'issue' ).length

  const August = projects.filter(project => project.month === 7).length
  const AugustBugs = projects.filter(project => project.month === 7 &&  project.type === 'bug' ).length
  const AugustFeature = projects.filter(project => project.month === 7 &&  project.type === 'feature' ).length
  const AugustIssue = projects.filter(project => project.month === 7 &&  project.type === 'issue' ).length

  const September = projects.filter(project => project.month === 8).length
  const SeptemberBugs = projects.filter(project => project.month === 8 &&  project.type === 'bug' ).length
  const SeptemberFeature = projects.filter(project => project.month === 8 &&  project.type === 'feature' ).length
  const SeptemberIssue = projects.filter(project => project.month === 8 &&  project.type === 'issue' ).length

  const October = projects.filter(project => project.month === 9).length
  const OctoberBugs = projects.filter(project => project.month === 9 &&  project.type === 'bug' ).length
  const OctoberFeature = projects.filter(project => project.month === 9 &&  project.type === 'feature' ).length
  const OctoberIssue = projects.filter(project => project.month === 9 &&  project.type === 'issue' ).length

  const November = projects.filter(project => project.month === 10).length
  const NovemberBugs = projects.filter(project => project.month === 10 &&  project.type === 'bug' ).length
  const NovemberFeature = projects.filter(project => project.month === 10 &&  project.type === 'feature' ).length
  const NovemberIssue = projects.filter(project => project.month === 10 &&  project.type === 'issue' ).length

  console.log(NovemberBugs);

  const December = projects.filter(project => project.month === 11).length
  const DecemberBugs = projects.filter(project => project.month === 11 &&  project.type === 'bug' ).length
  const DecemberFeature = projects.filter(project => project.month === 11 &&  project.type === 'feature' ).length
  const DecemberIssue = projects.filter(project => project.month === 11 &&  project.type === 'issue' ).length


  // const totalTickets = tickets.length

   
  return (
    <div className='pages mt-5'>
    <Container maxWidth='xl'>
    <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back Tanashe
      </Typography>

      <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Datacard iconCircle={'#BDD7F1'} color={'#061B64'} context={'Total Projects'} bgcolor={'#D1E9FC'} figure={totalProjects} icon={<AiIcons.AiOutlineFundProjectionScreen/>}></Datacard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
        <Datacard iconCircle={'#C1E6F9'} color={'#04297A'} context={'Feature request'} bgcolor={'#D0F2FF'} figure={totalFeatures} icon={<MdIcons.MdPriorityHigh/>}></Datacard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
        <Datacard iconCircle={'#F9EEBD'} color={'#7A4F01'} context={'Issue'} bgcolor={'#FFF7CD'} figure={totalIssues} icon={<HiIcons.HiOutlineTicket/>}></Datacard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
        <Datacard iconCircle={'#F7D1C7'} color={'#7A0C2E'} context={'Bug Issues'} bgcolor={'#FFE7D9'} figure={totalBugs} icon={<AiIcons.AiOutlineBug/>}></Datacard>
        </Grid>
      </Grid>

      <Grid sx={{py:3}} container spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
        <BarChat 
        January={January}
        JanuaryBugs={JanuaryBugs}
        JanuaryFeature={JanuaryFeature}
        JanuaryIssue={JanuaryIssue}

        February={February}
        FebruaryBugs={FebruaryBugs}
        FebruaryFeature={FebruaryFeature}
        FebruaryIssue={FebruaryIssue}

        March={March}
        MarchBugs={MarchBugs}
        MarchFeature={MarchFeature}
        MarchIssue={MarchIssue}

        April={April}
        AprilBugs={SeptemberBugs}
        AprilFeature={SeptemberFeature}
        AprilIssue={SeptemberIssue}

        May={May}
        MayBugs={MayBugs}
        MayFeature={MayFeature}
        MayIssue={MayIssue}

        June={June}
        JuneBugs={JuneBugs}
        JuneFeature={JuneFeature}
        JuneIssue={JuneIssue}

        July={July}
        JulyBugs={JulyBugs}
        JulyFeature={JulyFeature}
        JulyIssue={JulyIssue}

        August={August}
        AugustBugs={AugustBugs}
        AugustFeature={AugustFeature}
        AugustIssue={AugustIssue}

        September={September}
        SeptemberBugs={SeptemberBugs}
        SeptemberFeature={SeptemberFeature}
        SeptemberIssue={SeptemberIssue}

        October={October}
        OctoberBugs={OctoberBugs}
        OctoberFeature={OctoberFeature}
        OctoberIssue={OctoberIssue}

        November={November}
        NovemberBugs={NovemberBugs}
        NovemberFeature={NovemberFeature}
        NovemberIssue={NovemberIssue}

        December={December}
        DecemberBugs={DecemberBugs}
        DecemberFeature={DecemberFeature}
        DecemberIssue={DecemberIssue}

        />
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