import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { lazy,Suspense } from 'react';
import { useState,useEffect } from 'react';
import { ethers } from 'ethers';
import abi from "./artifacts/contracts/Complain.sol/Complain.json"
import './App.css'
import './style.css'
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from './components/Navbar';
const Loader = () => <div>Loading...</div>;
const Home = lazy(()=>import('./components/Home/Home'))


const AddCandidate = lazy(()=>import('./components/AddCandidate'))
const GivePermission = lazy(()=>import('./components/GivePermission'))
const ViewVotes = lazy(()=>import('./components/ViewVotes'))

function App(){

  const [state,setState] =  useState({
    address : null,
    provider : null,
    signer : null,
    contract : null
  });
  
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractabi = abi.abi;
      try {
        const { ethereum } = window;
    
        if (ethereum) {
          const account = await ethereum.request({ method: "eth_requestAccounts" });
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(contractAddress, contractabi, signer);
        setState({ address, provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return(
    <Suspense fallback={<Loader/>}>
      <RecoilRoot>
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/AddCandidate' element={<AddCandidate state={state}/>}/>
            <Route path='/GivePermission' element={<GivePermission state={state}/>}/>
            <Route path='/ViewVotes' element={<ViewVotes state={state}/>}/>
          </Routes>
        </Router>
      </RecoilRoot>
    </Suspense>
  )
}

export default App;