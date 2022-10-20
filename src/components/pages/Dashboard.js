import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import 'chart.js/auto'
import { Pie } from 'react-chartjs-2';
import Linegraph from '../Linegraph';



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

      <Container fluid>
        <Row className='graph-content'>
          <Col sm={12} lg={8}>
            <div className='graphs container-fluid'>
              <div className='row align-items-center '>
                <div className='col-4'>
                  <div className='graph'>
                    <Pie data={priorityData} options={projectPriorityOptions}></Pie>
                  </div>
                </div>
                <div className='col-4'>
                <div className='graph'>                    <Pie data={priorityData} options={projectPriorityOptions}></Pie></div>
                </div>
                <div className='col-4'>
                <div className='graph'>
                <Pie data={priorityData} options={projectPriorityOptions}></Pie>
                </div>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} lg={4}>
            <div className='row'>
            <div className='line-graph-container align-items-center'>
              <div className='line-graph'>
                <Linegraph/>
              </div>
            </div>

              
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={8}>
            <div className='project-container'>
              <div className='table'>
                
              </div>
            </div>
          </Col>
          <Col sm={12} md={4}></Col>
        </Row>
      </Container>


      

      </div>
  )
}

export default Dashboard