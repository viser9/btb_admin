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

const Particle = React.lazy(()=>import('./Particle'));

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ViewVotes({state}) {
//   async function saveData(){
//     try{
//       if(!name || !party || !imageUri){
//         toast.error('Please fill all the fields');
//         return;
//       }
//       const transaction = await state.contract.addCandidate(name,party,imageUri);
//       await transaction.wait();
//       toast.success('Transaction is done');
//       console.log(name,party,imageUri);
//     }catch(err){
//       console.log(err);
//       toast.error('Transaction failed');
//     }
    
//   }
    const [candidates, setCandidates] = React.useState([])
    const [votes, setVotes] = React.useState([])
    React.useEffect(()=>{
        const fetchData = async()=>{try {
			const count = await state.contract.candidateCount()
			console.log("Candidate Count ", count.toString())
			let candidatesArr = [];
            let votesArr = [];
			for(let i = 1; i <= count; i++) {
				const candidate = await state.contract.candidates(i)
                const votes  = await state.contract.votes(i)
                console.log("Votes ",votes.toString())
				console.log(candidate)
				let candidate_obj = {
					name: candidate[0],
					party: candidate[1],
					imageUri: candidate[2],
				}
				candidatesArr.push(candidate_obj)
                votesArr.push(votes.toString()) 
			}
			setCandidates(candidatesArr)
            setVotes(votesArr)

		} catch(err) {
			console.log(err)
		}
        }
        fetchData();
    },[])

  return (
    <ThemeProvider theme={defaultTheme}>
    <Particle/>
      <Container component="main">
        <CssBaseline />
        <Box sx={{ my: 20, display:'flex',justifyContent:"center",flexWrap:'wrap'}}>
          {candidates.map((item, index) => (
            <div key={index} style={{ marginBottom: '0.5rem',marginTop:'0.5rem' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  border: 1,
                  borderRadius: 3,
                  background: "#ffffff",
                  width: "90%",
                  opacity: "70%",
                }}
              >
                <img
                  src={item.imageUri}
                  alt={item.name}
                  style={{
                    width: '15rem',
                    height: '10rem',
                    marginLeft: '2rem',
                    marginRight: '1rem',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    borderRadius:'30px'
                  }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 0, marginRight: 5, width: '130px' }}>
                  <div><b>NAME  : </b>{item.name}</div>
                  <div><b>PARTY : </b>{item.party}</div>
                  <div><b>Total Votes : </b>{votes[index]}</div>
                </Box>
              </Box>
            </div>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}