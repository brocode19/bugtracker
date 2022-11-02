import { Container, Typography, Grid, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import Datacard from "../cards/Datacard";

import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import BarChat from "../Barchat/BarChat";
import PieChart from "../PieChat/PieChart";
import Spline from "../SplineGraph/Spline";
import Projectstable from "../Projectstable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

//dear future tinashe we passed our set projects as a prop to the project table and we going to update it when we submit a projects
//do not be confused with the naming the idea was to use props to update the setprojects of this component in the projects table component
//this was done on delete and on edit by the way 

function Projects() {
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          setProjects(list);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [projects, setProjects] = useState([]);

  const high = projects.filter(project => project.priority === 'high').length
  const medium = projects.filter(project => project.priority === 'medium').length
  const low = projects.filter(project => project.priority === 'low').length

  const January = projects.filter((project) => project.month === 0).length;
  const February = projects.filter((project) => project.month === 1).length;
  const March = projects.filter((project) => project.month === 2).length;
  const April = projects.filter((project) => project.month === 3).length;
  const May = projects.filter((project) => project.month === 4).length;
  const June = projects.filter((project) => project.month === 5).length;
  const July = projects.filter((project) => project.month === 6).length;
  const August = projects.filter((project) => project.month === 7).length;
  const September = projects.filter((project) => project.month === 8).length;
  const October = projects.filter((project) => project.month === 9).length;
  const November = projects.filter((project) => project.month === 10).length;
  const December = projects.filter((project) => project.month === 11).length;

  return (
    <div className="pages mt-5">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back Tanashe
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Spline
              January={January}
              February={February}
              March={March}
              April={April}
              May={May}
              June={June}
              July={July}
              August={August}
              September={September}
              October={October}
              November={November}
              December={December}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <PieChart
              value1={high}
              value2={medium}
              value3={low}
              item1={"High"}
              item2={"Medium"}
              item3={"Low"}
            />
          </Grid>
        </Grid>

        <Grid sx={{ py: 3 }} container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Projectstable
            setProjects={setProjects}
             />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Projects;
