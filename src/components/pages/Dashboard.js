import { Container, Typography, Grid, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import Datacard from "../cards/Datacard";

import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import BarChat from "../Barchat/BarChat";
import PieChart from "../PieChat/PieChart";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Dashboard() {
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      let user = [];
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          setProjects(list);
        });
      } catch (error) {
        console.log(error);
      }

      const Snapshot = await getDocs(collection(db, "users"));
      Snapshot.forEach((doc) => {
        user.push({ id: doc.id, ...doc.data() });
        setTeamMember(user);
      });
    };

    fetchData();
  }, []);
  const [projects, setProjects] = useState([]);
  const [teamMember, setTeamMember] = useState([]);

  const date = new Date();
  const currentYear = date.getFullYear();

  console.log(currentYear);

  const admin = teamMember.filter((item) => item.role === "admin").length;
  const developer = teamMember.filter(
    (item) => item.role === "developer"
  ).length;
  const projectManager = teamMember.filter(
    (item) => item.role === "manager"
  ).length;

  const totalProjects = projects.length;
  const totalBugs = projects.filter((project) => project.type === "bug").length;
  const totalFeatures = projects.filter(
    (project) => project.type === "feature"
  ).length;
  const totalIssues = projects.filter(
    (project) => project.type === "issue"
  ).length;

  const January = projects.filter(
    (project) => project.month === 0 && project.year === currentYear
  ).length;
  const JanuaryBugs = projects.filter(
    (project) =>
      project.month === 0 &&
      project.year === currentYear &&
      project.type === "bug"
  ).length;
  const JanuaryFeature = projects.filter(
    (project) =>
      project.month === 0 &&
      project.year === currentYear &&
      project.type === "feature"
  ).length;
  const JanuaryIssue = projects.filter(
    (project) =>
      project.month === 0 &&
      project.year === currentYear &&
      project.type === "issue"
  ).length;

  const February = projects.filter(
    (project) => project.month === 1 && project.year === currentYear
  ).length;
  const FebruaryBugs = projects.filter(
    (project) =>
      project.month === 1 &&
      project.year === currentYear &&
      project.type === "bug"
  ).length;
  const FebruaryFeature = projects.filter(
    (project) =>
      project.month === 1 &&
      project.year === currentYear &&
      project.type === "feature"
  ).length;
  const FebruaryIssue = projects.filter(
    (project) =>
      project.month === 1 &&
      project.year === currentYear &&
      project.type === "issue"
  ).length;

  const March = projects.filter(
    (project) => project.month === 2 && project.year === currentYear
  ).length;
  const MarchBugs = projects.filter(
    (project) =>
      project.month === 2 &&
      project.year === currentYear &&
      project.type === "bug"
  ).length;
  const MarchFeature = projects.filter(
    (project) =>
      project.month === 2 &&
      project.year === currentYear &&
      project.type === "feature"
  ).length;
  const MarchIssue = projects.filter(
    (project) =>
      project.month === 2 &&
      project.year === currentYear &&
      project.type === "issue"
  ).length;

  const April = projects.filter(
    (project) => project.month === 3 && project.year === currentYear
  ).length;
  const AprilBugs = projects.filter(
    (project) =>
      project.month === 3 &&
      project.year === currentYear &&
      project.type === "bug"
  ).length;
  const AprilFeature = projects.filter(
    (project) =>
      project.month === 3 &&
      project.year === currentYear &&
      project.type === "feature"
  ).length;
  const AprilIssue = projects.filter(
    (project) =>
      project.month === 3 &&
      project.year === currentYear &&
      project.type === "issue"
  ).length;

  const May = projects.filter(
    (project) => project.month === 4 && project.year === currentYear
  ).length;
  const MayBugs = projects.filter(
    (project) =>
      project.month === 4 &&
      project.year === currentYear &&
      project.type === "bug"
  ).length;
  const MayFeature = projects.filter(
    (project) =>
      project.month === 4 &&
      project.year === currentYear &&
      project.type === "feature"
  ).length;
  const MayIssue = projects.filter(
    (project) =>
      project.month === 4 &&
      project.year === currentYear &&
      project.type === "issue"
  ).length;

  const June = projects.filter(
    (project) => project.month === 5 && project.year === currentYear
  ).length;
  const JuneBugs = projects.filter(
    (project) =>
      project.month === 5 &&
      project.year === currentYear &&
      project.type === "bug"
  ).length;
  const JuneFeature = projects.filter(
    (project) =>
      project.month === 5 &&
      project.year === currentYear &&
      project.type === "feature"
  ).length;
  const JuneIssue = projects.filter(
    (project) =>
      project.month === 5 &&
      project.year === currentYear &&
      project.type === "issue"
  ).length;

  const July = projects.filter(
    (project) => project.month === 6 && project.year === currentYear
  ).length;
  const JulyBugs = projects.filter(
    (project) =>
      project.month === 6 &&
      project.year === currentYear &&
      project.type === "bug"
  ).length;
  const JulyFeature = projects.filter(
    (project) =>
      project.month === 6 &&
      project.year === currentYear &&
      project.type === "feature"
  ).length;
  const JulyIssue = projects.filter(
    (project) =>
      project.month === 6 &&
      project.year === currentYear &&
      project.type === "issue"
  ).length;

  const August = projects.filter(
    (project) => project.month === 7 && project.year === currentYear
  ).length;
  const AugustBugs = projects.filter(
    (project) =>
      project.month === 7 &&
      project.year === currentYear &&
      project.type === "bug"
  ).length;
  const AugustFeature = projects.filter(
    (project) =>
      project.month === 7 &&
      project.year === currentYear &&
      project.type === "feature"
  ).length;
  const AugustIssue = projects.filter(
    (project) =>
      project.month === 7 &&
      project.year === currentYear &&
      project.type === "issue"
  ).length;

  const September = projects.filter(
    (project) => project.month === 8 && project.year === currentYear
  ).length;
  const SeptemberBugs = projects.filter(
    (project) =>
      project.month === 8 &&
      project.year === currentYear &&
      project.type === "bug"
  ).length;
  const SeptemberFeature = projects.filter(
    (project) =>
      project.month === 8 &&
      project.year === currentYear &&
      project.type === "feature"
  ).length;
  const SeptemberIssue = projects.filter(
    (project) =>
      project.month === 8 &&
      project.year === currentYear &&
      project.type === "issue"
  ).length;

  const October = projects.filter(
    (project) => project.month === 9 && project.year === currentYear
  ).length;
  const OctoberBugs = projects.filter(
    (project) =>
      project.month === 9 &&
      project.year === currentYear &&
      project.type === "bug"
  ).length;
  const OctoberFeature = projects.filter(
    (project) =>
      project.month === 9 &&
      project.year === currentYear &&
      project.type === "feature"
  ).length;
  const OctoberIssue = projects.filter(
    (project) =>
      project.month === 9 &&
      project.year === currentYear &&
      project.type === "issue"
  ).length;

  const November = projects.filter(
    (project) => project.month === 10 && project.year === currentYear
  ).length;
  const NovemberBugs = projects.filter(
    (project) =>
      project.month === 10 &&
      project.year === currentYear &&
      project.type === "bug"
  ).length;
  const NovemberFeature = projects.filter(
    (project) =>
      project.month === 10 &&
      project.year === currentYear &&
      project.type === "feature"
  ).length;
  const NovemberIssue = projects.filter(
    (project) =>
      project.month === 10 &&
      project.year === currentYear &&
      project.type === "issue"
  ).length;

  const December = projects.filter(
    (project) => project.month === 11 && project.year === currentYear
  ).length;
  const DecemberBugs = projects.filter(
    (project) =>
      project.month === 11 &&
      project.year === currentYear &&
      project.type === "bug"
  ).length;
  const DecemberFeature = projects.filter(
    (project) =>
      project.month === 11 &&
      project.year === currentYear &&
      project.type === "feature"
  ).length;
  const DecemberIssue = projects.filter(
    (project) =>
      project.month === 11 &&
      project.year === currentYear &&
      project.type === "issue"
  ).length;

  // const totalTickets = tickets.length

  return (
    <div className="pages mt-5">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back Tanashe
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Datacard
              iconCircle={"#BDD7F1"}
              color={"#061B64"}
              context={"Total Projects"}
              bgcolor={"#D1E9FC"}
              figure={totalProjects}
              icon={<AiIcons.AiOutlineFundProjectionScreen />}
            ></Datacard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Datacard
              iconCircle={"#C1E6F9"}
              color={"#04297A"}
              context={"Total Feature request"}
              bgcolor={"#D0F2FF"}
              figure={totalFeatures}
              icon={<MdIcons.MdPriorityHigh />}
            ></Datacard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Datacard
              iconCircle={"#F9EEBD"}
              color={"#7A4F01"}
              context={"Total Issues"}
              bgcolor={"#FFF7CD"}
              figure={totalIssues}
              icon={<HiIcons.HiOutlineTicket />}
            ></Datacard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Datacard
              iconCircle={"#F7D1C7"}
              color={"#7A0C2E"}
              context={"Total Bug Issues"}
              bgcolor={"#FFE7D9"}
              figure={totalBugs}
              icon={<AiIcons.AiOutlineBug />}
            ></Datacard>
          </Grid>
        </Grid>

        <Grid sx={{ py: 3 }} container spacing={3}>
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
              AprilBugs={AprilBugs}
              AprilFeature={AprilFeature}
              AprilIssue={AprilIssue}
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
            <PieChart
              value1={admin}
              value2={developer}
              value3={projectManager}
              item1={"Admins"}
              item2={"Developer"}
              item3={"Project Manager"}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Dashboard;
