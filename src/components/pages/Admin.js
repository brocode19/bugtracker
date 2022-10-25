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
import { addDoc, collection, doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore"; 
import {  createUserWithEmailAndPassword } from "firebase/auth";

function Admin() {


  

  const [newUser, setNewUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password:"",
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
        timeStap:serverTimestamp()

      });

      setNewUser({
        fname: "",
        lname: "",
        email: "",
        password:"",
      })


  }
  return (
    <div className='pages mt-5'>
       <MDBContainer fluid>

<div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>

<MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
  <MDBCardBody className='p-5 text-center'>

    <h2 className="fw-bold mb-5">Sign up now</h2>

    <MDBRow>
      <MDBCol col='6'>
        <MDBInput wrapperClass='mb-4' value={newUser.fname} name='fname' onChange={handleChange} label='First name' id='form1' type='text'/>
      </MDBCol>

      <MDBCol col='6'>
        <MDBInput wrapperClass='mb-4' value={newUser.lname} name='lname' onChange={handleChange} label='Last name' id='form1' type='text'/>
      </MDBCol>
    </MDBRow>

    <MDBInput wrapperClass='mb-4' value={newUser.email} name='email' onChange={handleChange} label='Email' id='form1' type='email'/>
    <MDBInput wrapperClass='mb-4' value={newUser.password} name='password' onChange={handleChange} label='Password' id='form2' type='password'/>



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

       </MDBContainer>
    </div>
  )
}

export default Admin