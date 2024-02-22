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

export default function GivePermission({state}) {
    const [address, setAddress] = useState('');

  async function saveData(){
    try{
      const transaction = await state.contract.giveRightToVote(address);
      await transaction.wait();
      toast.success('Permission enabled');
      console.log(address);
    }catch(err){
      console.log(err);
      toast.error('Only one votes per address');
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
            Add Address
          </Typography>
          <Box component="form" onSubmit={saveData} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Enter address"
              name="name"
              onChange={e=>setAddress(e.target.value)}
              style={{ backgroundColor:"#B8BBBD" }}
              autoFocus
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,bgcolor: '#e16327',color:'white','&:hover': {
                bgcolor: '#363333'}}}
              onClick={saveData}
            >
              Give Permission
            </Button>
          </Box>
        </Box>
        <Toaster toastOptions={{ duration: 4000 }} />
      </Container>
    </ThemeProvider>
  );
}