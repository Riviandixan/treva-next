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
import { DataGrid } from '@mui/x-data-grid'
// ** MUI Imports
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import UserActions from './UserActions'

// useRouter
const ACLPage = () => {
  const router = useRouter()
  const ability = useContext(AbilityContext)
  const [users, setUser] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await axios.get('http://localhost:5000/users')
    setUser(response.data)
  }

  const deleteUser = async id => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`)
      getUsers()
    } catch (error) {
      console.log(error)
    }
  }

  function redirects(params) {
    router.replace(params)
  }

  const columns = [
    {
      field: 'id',
      headerName: 'No'
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 300
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 300
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 150,
      renderCell: params => <UserActions {...{ params }} />
    }
  ]

  // const [tableData, setTableData] = useState([])

  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then(data => data.json())
  //     .then(data => setTableData(data))
  // })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='User Managament'></CardHeader>
          <CardContent>
            <Button variant='contained' color='primary' onClick={() => redirects('user/create')} sx={{ mb: 4 }}>
              Add new record
            </Button>
            <div style={{ height: 500, width: '100%' }}>
              <DataGrid rows={users} columns={columns} pageSize={12} />
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
