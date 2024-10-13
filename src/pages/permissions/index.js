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
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import UserActions from '../user/UserActions'

const ACLPage = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)

  const columns = [
    {
      field: 'id',
      headerName: 'ID'
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 200
    },
    {
      field: 'body',
      headerName: 'Body',
      width: 200
    },
    {
      field: 'action',
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
      <Grid item xs={5}>
        <Card>
          <CardHeader title='Add Permission' />
          <CardContent>
            <form noValidate autoComplete='off'>
              <label><strong>Permission:</strong></label>
              <TextField
                sx={{ mb: 3 }}
                label='Permission Name'
                variant='outlined'
                color='secondary'
                fullWidth
                required
              />
              <Button
                onClick={() => console.log('you clickfed me')}
                type='submit'
                color='primary'
                variant='contained'
                fullWidth
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
      {ability?.can('read', 'analytics') ? (
        <Grid item xs={7}>
          <Card>
            <CardHeader title='List Permission' />
            <CardContent>
              <div style={{ height: 700, width: '100%' }}>
                <DataGrid rows={tableData} columns={columns} pageSize={12} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
    </Grid>
  )
}
ACLPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default ACLPage
