
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'Name', headerName: 'Name', width: 130 },
  { field: 'Priority', headerName: 'Priority', width: 100 },
  { field: 'Type', headerName: 'Type', width: 100 },
  { field: 'Status', headerName: 'Status', width: 100 },
  { field: 'Detail', headerName: 'Detail', width: 250 },
  { field: 'Team', headerName: 'Team', width: 150 },
  { field: 'Actions', headerName: 'Actions', width: 100, },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  // }
];

const rows = [
  { id: 1, Name: 'Snow', Priority: 'Jon', Type: 35, Status: 'Jon', Detail: 'Jon', Team: 'Jon',Actions: 'Jon',},
  { id: 1, Name: 'Snow', Priority: 'Jon', Type: 35, Status: 'Jon', Detail: 'Jon', Team: 'Jon',Actions: 'Jon',},
  { id: 1, Name: 'Snow', Priority: 'Jon', Type: 35, Status: 'Jon', Detail: 'Jon', Team: 'Jon',Actions: 'Jon',},
  { id: 1, Name: 'Snow', Priority: 'Jon', Type: 35, Status: 'Jon', Detail: 'Jon', Team: 'Jon',Actions: 'Jon',},
  { id: 1, Name: 'Snow', Priority: 'Jon', Type: 35, Status: 'Jon', Detail: 'Jon', Team: 'Jon',Actions: 'Jon',},
  { id: 1, Name: 'Snow', Priority: 'Jon', Type: 35, Status: 'Jon', Detail: 'Jon', Team: 'Jon',Actions: 'Jon',},
  { id: 1, Name: 'Snow', Priority: 'Jon', Type: 35, Status: 'Jon', Detail: 'Jon', Team: 'Jon',Actions: 'Jon',},

];

function Projectstable() {


  return (
    <>

<Card
    sx={{
      py: 5,
      color: 'grey',
      bgcolor: 'white'}}>
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
      </Card>


    
    </>
  )
}

export default Projectstable