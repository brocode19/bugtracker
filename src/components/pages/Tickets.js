import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from 'react-bootstrap';
import * as MdIcons from "react-icons/md";
import * as AiIcons from 'react-icons/ai';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


function Tickets() {

  useEffect(() => {

    const fetchData = async () =>{

      let list = [];
      try {        
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({id: doc.id,...doc.data()})
          setTeamMember(list)
        
        });
      
      } catch (error) {
        console.log(error);
        
      }
    }


    fetchData()
  }, [])


  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'fname',
      headerName: 'First name',
      width: 200,
      editable: true,
    },
    {
      field: 'lname',
      headerName: 'Last name',
      width: 200,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      valueGetter: (params) =>
        `${params.row.fname || ''} ${params.row.lname || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 240,
      editable: true,
    },
 
  ];
  
  const [teamMember, setTeamMember] = useState([]);


  
  const handleClick = (id) =>{

    console.log(id);

  }

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
 onClick={handleClick}
 size="sm">
  <AiIcons.AiFillEdit/> 
  </Button>
        </>)
      }

  }]
  return (
    <div className='pages mt-5'>
          <Box sx={{ py:2,height: 450,backgroundColor:'white' }}>
      <DataGrid
        rows={teamMember}
        columns={columns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </div>
  )
}

export default Tickets