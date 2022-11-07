import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Datacard from "../cards/Datacard";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import { Button, Form, Modal } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function Tickets() {
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      let projects = []
      try {
        const querySnapshot = await getDocs(collection(db, "tickets"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          setTickets(list);
        });
        const querySnapsho = await getDocs(collection(db, "projects"));
        querySnapsho.forEach((doc) => {
          projects.push(doc.data().name);
          if (projects.length !== 0) {
            setProjectNames(projects)
            
          }
          
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [projectNames,setProjectNames] = useState(['Just A ticket'])
  const [value, setValue] = useState(projectNames[0]);
  const [inputValue, setInputValue] = useState("");

  const status = ['new', 'complete','progress'];
  const type = ['issue', 'feature','bug'];
  const priority = ['high', 'medium','low'];



  const [tickets, setTickets] = useState([]);
  const totalTickets = tickets.length;
  const highStatus = tickets.filter(
    (project) => project.status === "high"
  ).length;
  const mediumStatus = tickets.filter(
    (project) => project.status === "medium"
  ).length;
  const lowStatus = tickets.filter(
    (project) => project.status === "low"
  ).length;
  const [ticketInput, setTicketInput] = useState({
    name: "",
    projectsName:value,
    priority: "",
    status: "new",
    type: "",
    details: "",
    team: [],
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setTicketInput({
      ...ticketInput,
      [name]: value,
    });
  }
  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, "tickets"), ticketInput);

    const list = [];

    try {
      const querySnapshot = await getDocs(collection(db, "tickets"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
        setTickets(list);
      });
      
    } catch (error) {
      console.log(error);
      
    }

 setTicketInput(
  {
    name: "",
    projectsName:value,
    priority: "",
    status: "new",
    type: "",
    details: "",
    team: [],
  }
 )





  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, "tickets", id));
    setTickets((prev) => {
      return prev.filter((user, index) => {
        return user.id !== id;
      });
    });
  };

  const handleEdit = async (id) => {
    setShow(true);
    setTickets((prev) => {
      return prev.filter((noteItem, index) => {
        return noteItem.id !== id;
      });
    });

    const item = tickets.find((noteItem, index) => {
      return noteItem.id === id;
    });

    setTicketInput({
      name: item.name,
      projectsName:item.projectsName,
      priority: item.priority,
      status: item.status,
      type: item.type,
      details: item.details,
      team: item.team,
      
    });
    await deleteDoc(doc(db, "tickets", id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Ticket Name",
      width: 150,
      editable: true,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 100,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      width: 100,
      editable: true,
    },
    {
      field: "details",
      headerName: "Detail",
      width: 340,
      editable: true,
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="secondary"
              onClick={() => handleClick(params.row.id)}
              size="sm"
            >
              <MdIcons.MdDelete />
            </Button>

            <Button
              variant="secondary"
              style={{ marginLeft: 10 }}
              onClick={() => handleEdit(params.row.id)}
              size="sm"
            >
              <AiIcons.AiFillEdit />
            </Button>
          </>
        );
      },
    },
  ];
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
              context={"Total Tickets"}
              bgcolor={"#D1E9FC"}
              figure={totalTickets}
              icon={<AiIcons.AiOutlineFundProjectionScreen />}
            ></Datacard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Datacard
              iconCircle={"#C1E6F9"}
              color={"#04297A"}
              context={"Low Status"}
              bgcolor={"#D0F2FF"}
              figure={lowStatus}
              icon={<MdIcons.MdPriorityHigh />}
            ></Datacard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Datacard
              iconCircle={"#F9EEBD"}
              color={"#7A4F01"}
              context={"Medium Status"}
              bgcolor={"#FFF7CD"}
              figure={mediumStatus}
              icon={<HiIcons.HiOutlineTicket />}
            ></Datacard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Datacard
              iconCircle={"#F7D1C7"}
              color={"#7A0C2E"}
              context={"High Status"}
              bgcolor={"#FFE7D9"}
              figure={highStatus}
              icon={<AiIcons.AiOutlineBug />}
            ></Datacard>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Button
              className="m-1"
              variant="primary"
              size="sm"
              onClick={handleShow}
            >
              {" "}
              Add Ticket
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Autocomplete
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      id="controllable-states-demo"
                      options={projectNames}
                      renderInput={(params) => (
                        <TextField {...params} label="Project Name" />
                      )}
                    />
                    <Form.Label>Ticket Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ticket Name"
                      onChange={handleChange}
                      value={ticketInput.name}
                      name="name"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
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
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
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
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
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
                    <Form.Control
                      as="textarea"
                      rows={3}
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
            <Box sx={{ py: 2, height: 450, backgroundColor: "white" }}>
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
  );
}

export default Tickets;
