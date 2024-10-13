// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useContext, useState } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useRouter } from 'next/router'
import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
    // float: 'right'
  }
})

const Create = () => {
  const router = useRouter()
  const ability = useContext(AbilityContext)
  const classes = useStyles()

  // state
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  // state validation
  const [validation, setValidation] = useState({})

  // method storePost
  const storePost = async e => {
    e.preventDefault()

    //define formData
    const formData = new FormData();

    // append data to "formData"
    formData.append('name', name);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('role', role);
  }

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
                fullWidth
                required
              />
              <TextField
                label='Permission'
                variant='outlined'
                color='secondary'
                multiline
                rows={4}
                fullWidth
                required />
              <Button
              className={classes.field}
                onClick={() => console.log('you clickfed me')}
                type='submit'
                color='secondary'
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
