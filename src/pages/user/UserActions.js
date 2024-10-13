import { Box, IconButton, Tooltip } from '@mui/material'
import { Delete, Edit, Preview } from '@mui/icons-material'
import Swal from 'sweetalert2'
import React, { useState, useEffect } from 'react'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'

const UserActions = params => {
  console.log(params.params.row.id)
  // console.log(row.id)
  const [users, setUser] = useState([])
  const MySwal = withReactContent(Swal)

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
      MySwal.fire({
        title: <strong>Good job!</strong>,
        html: <i>Berhasil Delete User!</i>,
        icon: 'success'
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box>
      <Tooltip title='View user details'>
        <IconButton onClick={() => {}}>
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title='Edit user'>
        <IconButton onClick={() => {}}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete user'>
        <IconButton onClick={() => deleteUser(params.params.row.id)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default UserActions
