import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import * as MdIcons from "react-icons/md";
import * as AiIcons from 'react-icons/ai';


function Project(props) {

  function handleClick() {
    props.onDelete(props.id);
  }
  function handleShow() {

    // how you put these items might determine your items
    props.onEdit(); 
    props.editProject(props.id);
  }

  


const teamNames = props.team.map(item => item.value);

  
  return (
    <>

    <tr>
<td>{props.name}</td>
<td>{props.priority}</td>
<td>{props.status}</td>
<td>{props.type}</td>
<td>{props.details}</td>
<td>{teamNames.map(item => <span className='text-muted'>{item}{' '}</span>)}</td>
<td>

<Button
 variant="secondary"
 onClick={handleClick}
 size="sm"
 
 >
  <MdIcons.MdDelete/>
  </Button>
  
  <Button
 variant="secondary"
 style={{ marginLeft: 16 }}
 onClick={handleShow}
 size="sm">
  <AiIcons.AiFillEdit/> 
  </Button>
  </td>
</tr>


   </>
  )
}

export default Project

