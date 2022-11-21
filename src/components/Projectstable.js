import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Button, Form, Modal } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// import * as MdIcons from "react-icons/md";
// import * as AiIcons from 'react-icons/ai';

function Projectstable(props) {
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      let projectUsers = [];
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          setProjects(list);
        });
      } catch (error) {
        console.log(error);
      }

      const team = await getDocs(collection(db, "users"));
      team.forEach((doc) => {
        projectUsers.push({ id: doc.id, ...doc.data() });
        setProjectUsers(projectUsers);
      });
    };

    fetchData();
  }, []);

  const [projects, setProjects] = useState([]);
  const [type, setInputType] = React.useState("");
  const [status, setInputStatus] = React.useState("");
  const [priority, setInputPriority] = React.useState("");
  const [projectUsers, setProjectUsers] = useState([]);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

    setProjectInput({
      ...projectInput,
      [name]: value,
    });
  };

  console.log(type, "sljdlfkj");

  const options = projectUsers;
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);
  const [edit, setEdit] = useState(false);

  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const date = new Date();

  const month = date.getMonth();
  const currentYear = date.getFullYear();

  const [projectInput, setProjectInput] = useState({
    name: "",
    priority: priority,
    status: status,
    type: type,
    details: "",
    team: [],
    month: month,
    year: currentYear,
  });

  const handleShow = () => {
    projectInput.status === "" &&
      setProjectInput({ ...projectInput, status: "new" });
    setShow(true);
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setProjectInput({
      ...projectInput,
      [name]: value,
      team: selected, //read here if you ever have problems with team members
    });
  }

  async function submitProject(event) {
    setEdit(false);

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "projects"), projectInput);
    const list = [];

    console.log("Document written with ID: ", docRef.id);

    const querySnapshot = await getDocs(collection(db, "projects"));
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
      setProjects(list);
      props.setProjects(list);
    });

    setProjectInput({
      name: "",
      priority: priority,
      status: status,
      type: type,
      details: "",
      month: month,
      year: currentYear,
    });
    setSelected([]);
    event.preventDefault();
  }

  const handleDelete = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, "projects", id));
    setProjects((prev) => {
      return prev.filter((user, index) => {
        return user.id !== id;
      });
    });
    props.setProjects((prev) => {
      return prev.filter((user, index) => {
        return user.id !== id;
      });
    });
  };

  const handleEdit = async (id) => {
    setShow(true);
    setProjects((prev) => {
      return prev.filter((noteItem, index) => {
        return noteItem.id !== id;
      });
    });

    const item = projects.find((noteItem, index) => {
      return noteItem.id === id;
    });

    setProjectInput({
      name: item.name,
      priority: item.priority,
      status: item.status,
      type: item.type,
      details: item.details,
      team: item.team,
    });
    await deleteDoc(doc(db, "projects", id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Project Name",
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
              onClick={() => handleDelete(params.row.id)}
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
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Save Edit" : "New project"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Project</Form.Label>
              <Form.Control
                type="text"
                placeholder="Project Name"
                onChange={handleChange}
                value={projectInput.name}
                name="name"
                autoFocus
              />
            </Form.Group>
            <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.value}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.value}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Select Team" placeholder="members" />
      )}
    />
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
              <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Team Members"
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
          <Button variant="primary" onClick={submitProject}>
            {edit ? "edit" : "submit"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Button className="m-1" variant="primary" size="sm" onClick={handleShow}>
        {" "}
        Add Project
      </Button>

      <Box sx={{ py: 2, height: 500, backgroundColor: "white" }}>
        <DataGrid
          rows={projects}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
}

export default Projectstable;
