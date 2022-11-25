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
import { TextFormatRounded } from "@mui/icons-material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function Tickets() {
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      let projectUsers = [];
      let projects = [];
      try {
        const querySnapshot = await getDocs(collection(db, "tickets"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          setTickets(list);
        });
        
      } catch (error) {
        console.log(error);
      }
      const team = await getDocs(collection(db, "users"));
      team.forEach((doc) => {
        projectUsers.push({ id: doc.id,fname:doc.data().fname,role:doc.data().role,label:doc.data().label,value:doc.data().value  });
        setProjectUsers(projectUsers);
      });

      const querySnapshot = await getDocs(collection(db, "projects"));
        querySnapshot.forEach((doc) => {
          projects.push({ id: doc.id, ...doc.data() });
          setProjects(projects);
        });
    };

    fetchData();
  }, []);

  const [type, setInputType] = React.useState("");
  const [status, setInputStatus] = React.useState("");
  const [priority, setInputPriority] = React.useState("");
  const [projectName, setProjectName ] = React.useState("");
  const [selected, setSelected] = useState([]);
  const [team, setTeam] = useState([]);
  const [projectUsers, setProjectUsers] = useState([]);
  const options = projectUsers;
  const [projects, setProjects] = useState([]);
  const projectItems = projects.map(item => item.name);
  console.log(projectItems);





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
    projectName:projectName,
    priority: priority,
    status: status,
    type: type,
    details: "",
    team: team,
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

    setSelected([]);
    setProjectName('');
    setInputType('');
    setInputPriority('');
    setInputStatus('');




 setTicketInput(
  {
    name: "",
    projectName:projectName,
    priority: priority,
    status: status,
    type: type,
    details: "",
    team: team,
  }
 )

  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "type") {
      setInputType(value);
    }
    if (name === "status") {
      setInputStatus(value);
    }
    if (name === "priority") {
      setInputPriority(value);
    }
    if (name === "projectName") {
      setProjectName(value);
    }

    setTicketInput({
      ...ticketInput,
      [name]: value,
    });
  };

  const handleSelectTeam = (item)=>{
    setSelected(item)
    setTicketInput({
      ...ticketInput,team:item
    })
  }

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

    setInputType(item.type);
    setInputPriority(item.priority);
    setInputStatus(item.status);
    setProjectName(item.projectName);
    setSelected(item.team);

    setTicketInput({
      name: item.name,
      projectName:item.projectsName,
      priority:item.priority,
      type:item.type,
      status:item.status,
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
                <Modal.Title>Tickets</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
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

                  <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo">Type</InputLabel>
                <Select
                  labelId="demo"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  name="type"
                  onChange={handleInputChange}
                >
                  <MenuItem value={"issue"}>Issue</MenuItem>
                  <MenuItem value={"bug"}>Bug</MenuItem>
                  <MenuItem value={"feature"}>Feature Request</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple">Status</InputLabel>
                <Select
                  labelId="demo"
                  id="status"
                  value={status}
                  label="Status"
                  name="status"
                  onChange={handleInputChange}
                >
                  <MenuItem value={"new"}>New</MenuItem>
                  <MenuItem value={"complete"}>Complete</MenuItem>
                  <MenuItem value={"progress"}>In Progress</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple">Priority</InputLabel>
                <Select
                  labelId="demo"
                  id="priority"
                  value={priority}
                  label="Priority"
                  name="priority"
                  onChange={handleInputChange}
                >
                  <MenuItem value={"high"}>High</MenuItem>
                  <MenuItem value={"medium"}>Medium</MenuItem>
                  <MenuItem value={"low"}>Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple">Project Name</InputLabel>
                <Select
                  labelId="demo"
                  id="projectName"
                  value={projectName}
                  label="projectName"
                  name="projectName"
                  onChange={handleInputChange}
                >
                  {projectItems.map(item => <MenuItem value={item}>{item}</MenuItem> )}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 120, mt: 2 }}>
      <MultiSelect
        options={options}
        value={selected}
        onChange={handleSelectTeam}
        labelledBy="Select"
      />
            </Box>

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
