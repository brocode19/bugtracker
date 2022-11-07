import React, { useEffect, useState } from "react";
import { Box,} from "@mui/material";
import { Button, Form, Modal,} from "react-bootstrap";
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

// import * as MdIcons from "react-icons/md";
// import * as AiIcons from 'react-icons/ai';

function Projectstable(props) {
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          setProjects(list);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [projects, setProjects] = useState([]);



  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry" },
  ];
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setProjectInput({ ...projectInput, status: "new" });
    setShow(true);
  };

  const date = new Date();

  const month = date.getMonth();
  const currentYear = date.getFullYear();

  const [projectInput, setProjectInput] = useState({
    name: "",
    priority: "",
    status: "",
    type: "",
    details: "",
    team: [],
    month: month,
    year: currentYear,
  });



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
      props.setProjects(list)
    });

    setProjectInput({
      name: "",
      priority: "",
      status: "",
      type: "",
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
                placeholder="Project Name"
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
