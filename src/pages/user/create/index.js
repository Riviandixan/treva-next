// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { useRouter } from 'next/router'
import makeStyles from '@mui/styles/makeStyles'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, Select } from '@mui/material'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
    // float: 'right'
  }
})

const Create = () => {
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const router = useRouter();
  const classes = useStyles();
  const MySwal = withReactContent(Swal);

  // state validation
  const [validation, setValidation] = useState({})

  // method storePost
  const storePost = async e => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        gender
      });
      MySwal.fire({
        title: <strong>Good job!</strong>,
        html: <i>Berhasil Menambahkan User!</i>,
        icon: 'success'
      })
      redirects("/user");
    }catch (error) {
      setValidation(error.response);
    }
  };

  function redirects(params) {
    router.replace(params)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Create User'></CardHeader>
          <CardContent>
            <Button
              className={classes.field}
              variant='contained'
              color='warning'
              onClick={() => redirects('/user')}
            >
              Back
            </Button>
            <form noValidate autoComplete='off' onSubmit={storePost}>
              <TextField
                className={classes.field}
                label='Name'
                variant='outlined'
                color='secondary'
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
              <TextField
                className={classes.field}
                label='Email'
                variant='outlined'
                color='secondary'
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={gender}
                id="demo-simple-select"
                label="Age"
                fullWidth
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              <Button
              className={classes.field}
                onClick={() => console.log('you clickfed me')}
                type='submit'
                color='primary'
                variant='contained'
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Create
