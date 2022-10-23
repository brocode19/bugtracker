
import React, { useState } from 'react'
// import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import { Button, Form, Modal, Table,} from 'react-bootstrap';
import { MultiSelect } from 'react-multi-select-component';
import Project from './Project';
// import * as MdIcons from "react-icons/md";
// import * as AiIcons from 'react-icons/ai';



function Projectstable(props) {

  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry",},
  ];
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 

    const [projectInput, setProjectInput] = useState({
      name: "",
      priority: "",
      status: "",
      type:'',
      details: "",
      team:'',
    });

    const [projects, setProjects] = useState([]);

    function handleChange(event) {
      const { name, value } = event.target;

      setProjectInput({
        ...projectInput,
        [name]: value,
        team: selected,//read here if you ever have problems with team members


      });

    }
  

  function submitProject(event) {

    setEdit(false);
    setProjects((prevProjects) => [...prevProjects,projectInput]);  
    setProjectInput({
    name: "",
    priority: "",
    status: "",
    type:'',
    details: "",
 
    })
    setSelected([]); 
    event.preventDefault()
    
  }

  function editProject(id){
  
    setEdit(true);


    setProjects(prevProject => {
      return prevProject.filter((noteItem, index) => {
        return index !== id;
      });
    });

    const item = projects.find((noteItem, index) => {
      return index === id;
    })

    console.log(item.team, 'hey');


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

  function deleteNote(id){
    setProjects(prevProject => {
      return prevProject.filter((projectItem, index) => {
        return index !== id;
      });
    });
  }

  // const allProjects = projects.map((item,index) => (
  //   { 
  //     id: index,
  //     Name: item.name,
  //      Priority: item.priority,
  //       Type: item.type,
  //        Status: item.status,
  //         Detail: item.details,
  //          Team: '',
  //          Actions: '',
  //         }
  // ))

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 50 },
  //   { field: 'Name', headerName: 'Name', width: 130 },
  //   { field: 'Priority', headerName: 'Priority', width: 100 },
  //   { field: 'Type', headerName: 'Type', width: 100 },
  //   { field: 'Status', headerName: 'Status', width: 100 },
  //   { field: 'Detail', headerName: 'Detail', width: 250 },
  //   { field: 'Team', headerName: 'Team', width: 150 },
  //   {
  //     field: 'Actions',
  //     headerName: 'Actions',
  //     width: 150,

  //   },
  // ];
  
  return (
    <>



<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{edit?'Save Edit':'New project'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <h2>Select Team</h2>
        {/* <pre>{JSON.stringify(selected)}</pre> */}
        <MultiSelect
          options={options}
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

<Card
    sx={{
      py: 1,
      color: 'grey',
      }}>
        <div style={{ height: 400, width: '100%' }}>
        <Button variant="primary"size="sm"onClick={handleShow}> Add Project</Button>

        <Table striped class="projects-table">         
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

  {projects.map((projectItem, index) => {
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

      {/* <DataGrid
        rows={allProjects}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      /> */}

    </div>
      </Card>


    
    </>
  )
}

export default Projectstable