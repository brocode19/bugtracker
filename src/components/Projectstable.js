
import React, { useEffect, useState } from 'react'
// import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import { Button, Form, Modal, Table,} from 'react-bootstrap';
import { MultiSelect } from 'react-multi-select-component';
import Project from './Project';
import { collection, addDoc,getDocs,doc, deleteDoc } from "firebase/firestore"; 
import { db } from './firebase';


// import * as MdIcons from "react-icons/md";
// import * as AiIcons from 'react-icons/ai';



function Projectstable(props) {

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

  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry",},
  ];
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleClose = () => {
    
    setShow(false);
  }
  const handleShow = () => {
    setProjectInput({...projectInput,status:'new'})
    setShow(true); 
  }

    const [projectInput, setProjectInput] = useState({
      name: "",
      priority: "",
      status: "",
      type:'',
      details: "",
      team:[],
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
  

  async function submitProject(event) {

    setEdit(false);



    // Add a new document with a generated id.
const docRef = await addDoc(collection(db, "projects"), projectInput);
const list = []

console.log("Document written with ID: ", docRef.id);

const querySnapshot = await getDocs(collection(db, "projects"));
querySnapshot.forEach((doc) => {
  list.push({id: doc.id,...doc.data()})
  setProjects(list)

});



    
    

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

  async function editProject(id){
  
    setEdit(true);


    setProjects(prevProject => {
      return prevProject.filter((noteItem, index) => {
        return noteItem.id !== id;
      });
    });

    const item = projects.find((noteItem, index) => {
      return noteItem.id === id;
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
    await deleteDoc(doc(db, "projects", id));

  }

 async function deleteNote(id){

  console.log(id);

  await deleteDoc(doc(db, "projects", id));

    setProjects(prevProject => {
      return prevProject.filter((projectItem, index) => {
        return projectItem.id !== id;
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
          labelledBy="Team Members"
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
                placeholder="urgent/high/medium/low"
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
                placeholder="Issue/Bug/Feature request"
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
            id={projectItem.id}
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