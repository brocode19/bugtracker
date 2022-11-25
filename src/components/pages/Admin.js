import React, { useEffect, useState } from 'react';
import { db,getAuth } from '../firebase';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { addDoc, collection, doc, serverTimestamp, setDoc, getDocs } from "firebase/firestore"; 
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { async } from '@firebase/util';
import { Box } from '@mui/material';

function Admin(props) {

  useEffect(() => {

    const fetchData = async () =>{

      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        list.push({id: doc.id,...doc.data()})
        console.log(list);

});
      
      } catch (error) {
        console.log(error);
        
      }
      props.setAltTable(false)
    }


    fetchData()
  }, [])

  

  const [newUser, setNewUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password:"",
    role:"",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNewUser({
      ...newUser,
      [name]: value,
    });

    console.log(newUser);

  }

  const handleAdd = async (e) =>{
    e.preventDefault()

    const auth = getAuth();
    const person = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)

    await setDoc(doc(db, "users",person.user.uid), {
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
        password: newUser.password,
        label:newUser.fname,
        value:newUser.fname,
        timeStap:serverTimestamp(),
        role:newUser.role,

      });

      setNewUser({
        fname: "",
        lname: "",
        email: "",
        password:"",
        role:"",
      })


  }
  return (
    <div className='pages mt-5'>
      <Box sx={{ height: "100", width: '100%',backgroundColor:'white' }}>


<MDBCard className='mx-5 mb-5 p-2 shadow-5' style={{ background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
  <MDBCardBody className='p-5 text-center'>

    <h2 className="fw-bold mb-5">Add User</h2>

    <MDBRow>
      <MDBCol col='6'>
        <MDBInput wrapperClass='mb-4' value={newUser.fname} name='fname' onChange={handleChange} label='First name' id='form1' type='text'/>
      </MDBCol>

      <MDBCol col='6'>
        <MDBInput wrapperClass='mb-4' value={newUser.lname} name='lname' onChange={handleChange} label='Last name' id='form4r1' type='text'/>
      </MDBCol>
    </MDBRow>

    <MDBInput wrapperClass='mb-4' value={newUser.email} name='email' onChange={handleChange} label='Email' id='form51' type='email'/>
    <MDBInput wrapperClass='mb-4' value={newUser.password} name='password' onChange={handleChange} label='Password' id='form2' type='password'/>
    <MDBInput wrapperClass='mb-4' value={newUser.role} name='role' onChange={handleChange} label='Role' id='form2' type='text'/>



    <Button className='w-100 mb-4' onClick={handleAdd} size='md'>Create User</Button>

    <div className="text-center">

      {/* <p>or sign up with:</p> */}

      <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
        <MDBIcon fab icon='facebook-f' size="sm"/>
      </MDBBtn>

      <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
        <MDBIcon fab icon='twitter' size="sm"/>
      </MDBBtn>

      <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
        <MDBIcon fab icon='google' size="sm"/>
      </MDBBtn>

      <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
        <MDBIcon fab icon='github' size="sm"/>
      </MDBBtn>

    </div>

  </MDBCardBody>
</MDBCard>
      </Box>

    </div>
  )
}

export default Admin