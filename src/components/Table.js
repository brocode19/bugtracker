import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { MultiSelect } from 'react-multi-select-component';
import Project from './Project';
import { teamNames } from './TeamData';


function Table(props) {

    const [show, setShow] = useState(false);
    // const [projects, setProjects] = useState([]);
    const [selected, setSelected] = useState([]);
    const [edit, setEdit] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
  
    // const teamMembers = select.map(item => item.value)
  
  
    // console.log(teamMembers);
  
    // this is state project input
   
    const [projectInput, setProjectInput] = useState({
        name: "",
        priority: "",
        status: "",
        type:'',
        details: "",
        team:[],
      });
  
      function handleChange(event) {
        const { name, value } = event.target;
  
        setProjectInput({
          ...projectInput,
          [name]: value,
          team: selected,
  
        });
  
      }
  
      function submitProject(event) {
  
        setEdit(false);
  
        props.setProjects((currentProjects) => [...currentProjects,projectInput]);
        
        setProjectInput({
        name: "",
        priority: "",
        status: "",
        type:'',
        details: "",
         
        })
  
        setSelected([]);
  
        props.setPriorityData({
          labels: ['high', 'medium', 'low'],
          datasets: [
            {
              label: '# of Votes',
              data: [props.projects.filter(project => project.priority === 'high').length, 2, 5],
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
        })
  
     
        event.preventDefault()
        
      }
  
      function deleteNote(id){
        props.setProjects(prevProject => {
          return prevProject.filter((projectItem, index) => {
            return index !== id;
          });
        });
      }
  
      function editProject(id){
  
        setEdit(true);
  
  
        props.setProjects(prevProject => {
          return prevProject.filter((noteItem, index) => {
            return index !== id;
          });
        });
  
        const item = props.projects.find((noteItem, index) => {
          return index === id;
        })
  
        setProjectInput({
          name: item.name,
          priority: item.priority,
          status: item.status,
          type:item.type,
          details: item.details,
          team:item.team,
          
        })
        setSelected(item.team);
      }
  
    return (
  
      <>
  
  {/* add project pop up */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{edit?'Save Edit':'New project'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <h2>Select Team</h2>
        {/* <pre>{JSON.stringify(selected)}</pre> */}
        <MultiSelect
          options={teamNames}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
        />
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Project</Form.Label>
              <Form.Control
                type="text"
                placeholder='Project Name'
                onChange={handleChange}
                value={projectInput.name}
                name="name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                type="text"
                placeholder="high/medium/low"
                onChange={handleChange}
                value={projectInput.priority}
                name="priority"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Complete/In progress/new"
                onChange={handleChange}
                value={projectInput.status}
                name="status"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Complete/In progress/new"
                onChange={handleChange}
                value={projectInput.type}
                name="type"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Detail</Form.Label>
              <Form.Control as="textarea" rows={3}
              onChange={handleChange}
              value={projectInput.details}
              name="details"
               />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={submitProject}>
           {edit?'edit':'submit'}
          </Button>
        </Modal.Footer>
      </Modal>
  
      
  <div className='container'>
  <Table class="projects-table">         
    <thead>
      <tr>
        <th>Project</th>
        <th>priority</th>
        <th>Status</th>
        <th>type</th>
        <th>detail</th>
        <th>team</th>
        <th>actions</th>   
      </tr>
    </thead>
    <tbody>
  
    {props.projects.map((projectItem, index) => {
          return (
            <Project
              key={index}
              id={index}
              name={projectItem.name}
              priority={projectItem.priority}
              status={projectItem.status}
              type={projectItem.type}
              team={projectItem.team}
              details={projectItem.details}
              onDelete={deleteNote}
              onEdit={handleShow}
              editProject={editProject}
            />
          );
        })}
  
  
  
    </tbody>
  </Table>
  </div>
  
  <Button
   variant="primary"
   size="lg"
   onClick={handleShow}>
   Add Project
  </Button>
  
      </>
    )
  }

export default Table