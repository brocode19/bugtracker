
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import { Button, Form, Modal } from 'react-bootstrap';
import { MultiSelect } from 'react-multi-select-component';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'Name', headerName: 'Name', width: 130 },
  { field: 'Priority', headerName: 'Priority', width: 100 },
  { field: 'Type', headerName: 'Type', width: 100 },
  { field: 'Status', headerName: 'Status', width: 100 },
  { field: 'Detail', headerName: 'Detail', width: 250 },
  { field: 'Team', headerName: 'Team', width: 150 },
  { field: 'Actions', headerName: 'Actions', width: 100, },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  // }
];



// const rows = [
//   { id: 1, Name: 'Snow', Priority: 'Jon', Type: 35, Status: 'Jon', Detail: 'Jon', Team: 'Jon',Actions: 'Jon',},
//   { id: 2, Name: 'Snow', Priority: 'Jon', Type: 35, Status: 'Jon', Detail: 'Jon', Team: 'Jon',Actions: 'Jon',},
//   { id: 3, Name: 'Snow', Priority: 'Jon', Type: 35, Status: 'Jon', Detail: 'Jon', Team: 'Jon',Actions: 'Jon',},
//   { id: 4, Name: 'Snow', Priority: 'Jon', Type: 35, Status: 'Jon', Detail: 'Jon', Team: 'Jon',Actions: 'Jon',},
//   { id: 5, Name: 'Snow', Priority: 'Jon', Type: 35, Status: 'Jon', Detail: 'Jon', Team: 'Jon',Actions: 'Jon',},
//   { id: 6, Name: 'Snow', Priority: 'Jon', Type: 35, Status: 'Jon', Detail: 'Jon', Team: 'Jon',Actions: 'Jon',},
//   { id: 7, Name: 'Snow', Priority: 'Jon', Type: 35, Status: 'Jon', Detail: 'Jon', Team: 'Jon',Actions: 'Jon',},


  
// ];



function Projectstable(props) {

  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
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

    const [things,setThings] = useState([])
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

    

    setThings(projects.map((item,index) => (
      { 
        id: index,
        Name: item.name,
         Priority: item.priority,
          Type: item.type,
           Status: item.status,
            Detail: item.details,
             Team: '',
             Actions: '',}
    ))) 

    console.log(things);
    
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

  // function deleteNote(id){
  //   props.setProjects(prevProject => {
  //     return prevProject.filter((projectItem, index) => {
  //       return index !== id;
  //     });
  //   });
  // }

  // function editProject(id){

  //   setEdit(true);


  //   props.setProjects(prevProject => {
  //     return prevProject.filter((noteItem, index) => {
  //       return index !== id;
  //     });
  //   });

  //   const item = props.projects.find((noteItem, index) => {
  //     return index === id;
  //   })

  //   setProjectInput({
  //     name: item.name,
  //     priority: item.priority,
  //     status: item.status,
  //     type:item.type,
  //     details: item.details,
  //     team:item.team,
      
  //   })
  //   setSelected(item.team);
  // }




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
      py: 5,
      color: 'grey',
      bgcolor: 'white'}}>
        <div style={{ height: 400, width: '100%' }}>
        <Button variant="primary"size="sm"onClick={handleShow}> Add Project</Button>
      <DataGrid
        rows={projects.map((item,index) => (
          { 
            id: index,
            Name: item.name,
             Priority: item.priority,
              Type: item.type,
               Status: item.status,
                Detail: item.details,
                 Team: '',
                 Actions: '',}
        ))}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />

    </div>
      </Card>


    
    </>
  )
}

export default Projectstable