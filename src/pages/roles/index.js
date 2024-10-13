// ** React Imports
import { useContext } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField'
import UserActions from '../user/UserActions'

const ACLPage = () => {
  // ** Hooks
  const router = useRouter()
  const ability = useContext(AbilityContext)

  function redirects(params) {
    router.replace(params)
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID'
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 450
    },
    {
      field: 'body',
      headerName: 'Body',
      width: 450
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 150,
      renderCell: params => <UserActions {...{ params }} />
    }
  ]

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(data => data.json())
      .then(data => setTableData(data))
  })


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Role Management' />
          <CardContent>
            <Button variant='contained' color='primary' onClick={() => redirects('roles/create')} sx={{ m: 2 }}>
              Add new record
            </Button>
            <div style={{ height: 700, width: '100%' }}>
              <DataGrid rows={tableData} columns={columns} pageSize={12} />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
ACLPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default ACLPage
