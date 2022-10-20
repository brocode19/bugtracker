import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import 'chart.js/auto'



function Dashboard() {
  return (
    <div className='pages'>

      <Container>
        <Row className='graph-content'>
          <Col sm={12} lg={8}>
            <div className='graphs container'>
              <div className='row '>
                <div className='col-4'>
                  <div className='graph'>graph 1</div>
                </div>
                <div className='col-4'>
                <div className='graph'>graph 1</div>
                </div>
                <div className='col-4'>
                <div className='graph'>graph 1</div>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} lg={4}>
            <div className='line-graph-container container'>
              <div className='ine-graph'>hey</div>
              
            </div>
          </Col>
        </Row>
        <Row>dash2</Row>
      </Container>


      

      </div>
  )
}

export default Dashboard