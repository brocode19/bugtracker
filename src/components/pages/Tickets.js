import { Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import Datacard from '../cards/Datacard'
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as HiIcons from 'react-icons/hi';
import { Button, Form, Modal } from 'react-bootstrap';
import { MultiSelect } from 'react-multi-select-component';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';

function Tickets() {

    const [tickets,setTickets] = useState([]);
    const [ticketInput, setTicketInput] = useState({
        name: "",
        priority: "",
        status: "",
        type:'',
        details: "",
        team:[],
      });

      function handleChange(event) {
        const { name, value } = event.target;
  
        setTicketInput({
          ...ticketInput,
          [name]: value,  
        });
  
      }
    const handleSubmit = async () =>{

        const docRef = await addDoc(collection(db, "tickets"), ticketInput);

         const list = []

const querySnapshot = await getDocs(collection(db, "tickets"));
querySnapshot.forEach((doc) => {
  list.push({id: doc.id,...doc.data()})
  setTickets(list)

});

    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

      const handleClick = async (id) =>{

    console.log(id);
    await deleteDoc(doc(db, "tickets", id));
    setTickets(prev => {
      return prev.filter((user, index) => {
        return user.id !== id;
      });
    });


  }

  const handleEdit = async (id) =>{

    setShow(true);
    setTickets(prev => {
        return prev.filter((noteItem, index) => {
          return noteItem.id !== id;
        });
      });
  
      const item = tickets.find((noteItem, index) => {
        return noteItem.id === id;
      })
  
  
      setTicketInput({
        name: item.name,
        priority: item.priority,
        status: item.status,
        type:item.type,
        details: item.details,
        team:item.team,
        
      })
      await deleteDoc(doc(db, "tickets", id));
  }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
          field: 'name',
          headerName: 'Ticket Name',
          width: 150,
          editable: true,
        },
        {
          field: 'priority',
          headerName: 'Priority',
          width: 100,
          editable: true,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 100,
          editable: true,
        },
        {
          field: 'type',
          headerName: 'Type',
          width: 100,
          editable: true,
        },
        {
          field: 'details',
          headerName: 'Detail',
          width: 340,
          editable: true,
        },
     
      ];

      const actionColumn = [{
        field: 'action',
          headerName: 'Action',
          width: 90,
          renderCell:(params)=>{
            return (<>
            <Button
     variant="secondary"
     onClick={()=>handleClick(params.row.id)}
     size="sm"
     
     
     >
      <MdIcons.MdDelete/>
      </Button>
      
      <Button
     variant="secondary"
     style={{ marginLeft: 10 }}
     onClick={()=>handleEdit(params.row.id)}
     size="sm">
      <AiIcons.AiFillEdit/> 
      </Button>
            </>)
          }
    
      }]
  return (
    <div className='pages mt-5'>
            <Container maxWidth='xl'>
            <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back Tanashe
      </Typography>

      <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Datacard iconCircle={'#BDD7F1'} color={'#061B64'} context={'Total Tickets'} bgcolor={'#D1E9FC'} figure={'500'} icon={<AiIcons.AiOutlineFundProjectionScreen/>}></Datacard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
        <Datacard iconCircle={'#C1E6F9'} color={'#04297A'} context={'Tickets'} bgcolor={'#D0F2FF'} figure={'7'} icon={<MdIcons.MdPriorityHigh/>}></Datacard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
        <Datacard iconCircle={'#F9EEBD'} color={'#7A4F01'} context={'Feature Request Tickets'} bgcolor={'#FFF7CD'} figure={'20'} icon={<HiIcons.HiOutlineTicket/>}></Datacard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
        <Datacard iconCircle={'#F7D1C7'} color={'#7A0C2E'} context={'Urgent Tickets'} bgcolor={'#FFE7D9'} figure={'69'} icon={<AiIcons.AiOutlineBug/>}></Datacard>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
        <Button className='m-1' variant="primary"size="sm"onClick={handleShow}> Add Ticket</Button>   
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ticket Name</Form.Label>
              <Form.Control
                type="text"
                placeholder='Ticket Name'
                onChange={handleChange}
                value={ticketInput.name}
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
                value={ticketInput.priority}
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
                value={ticketInput.status}
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
                value={ticketInput.type}
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
              value={ticketInput.details}
              name="details"
               />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            submint Ticket
          </Button>
        </Modal.Footer>
      </Modal>    
      <Box sx={{ py:2,height: 450,backgroundColor:'white' }}>
      <DataGrid
        rows={tickets}
        columns={columns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
        </Grid>
      </Grid>
            </Container>
    </div>
  )
}

export default Tickets