import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, Toaster } from "react-hot-toast";

const Particle = React.lazy(()=>import('./Particle'));

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AddCandidate({state}) {
    const [name, setName] = useState('')
    const [party, setParty] = useState('')
    const [imageUri, setImageUri] = useState('')

  async function saveData(){
    try{
      if(!name || !party || !imageUri){
        toast.error('Please fill all the fields');
        return;
      }
      const transaction = await state.contract.addCandidate(name,party,imageUri);
      await transaction.wait();
      toast.success('Transaction is done');
      console.log(name,party,imageUri);
    }catch(err){
      console.log(err);
      toast.error('Transaction failed');
    }
    
  }

  return (
    <ThemeProvider theme={defaultTheme}>
    <Particle/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#e16327' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={'white'}>
            Add Candidate
          </Typography>
          <Box component="form" onSubmit={saveData} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Enter name"
              name="name"
              onChange={e=>setName(e.target.value)}
              style={{ backgroundColor:"#B8BBBD" }}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="party"
              label="Enter Party"
              type="party"
              id="party"
              onChange={e=>setParty(e.target.value)}
              style={{ backgroundColor:"#B8BBBD" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="img"
              label="Enter Img"
              type="img"
              id="img"
              onChange={e=>setImageUri(e.target.value)}
              style={{ backgroundColor:"#B8BBBD" }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,bgcolor: '#e16327',color:'white','&:hover': {
                bgcolor: '#363333'}}}
              onClick={saveData}
            >
              Add Candidate
            </Button>
          </Box>
        </Box>
        <Toaster toastOptions={{ duration: 4000 }} />
      </Container>
    </ThemeProvider>
  );
}