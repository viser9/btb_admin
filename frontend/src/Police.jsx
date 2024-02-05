import { useState,useEffect } from "react";
import { ethers } from 'ethers';
import { Container,Col,Row } from "react-bootstrap";
import {Box} from "@mui/material";
import Particle from "./components/Particle";
import abi from "./artifacts/contracts/Complain.sol/Complain.json"
import axios from "axios";

function Police(){

    const [state,setState] =  useState({
      address : null,
      provider : null,
      signer : null,
      contract : null
    });

    const [file, setFile] = useState(null);
    const [url, setUrl] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    const [reload,setReload] = useState(false);

    const[complaints,setComplaints] = useState([]);
    useEffect(() => {
        const connectWallet = async () => {
          const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
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
            const values = await contract.getPhoneComplaints();
            setComplaints(values);
            // console.log(contract)
            // console.log(state);
          } catch (error) {
            console.log(error);
          }
        };
        connectWallet();
      }, [reload]);

    console.log(complaints);

    const handleSubmit = async (e,id) => {
        e.preventDefault();
        if (file) {
          try {
            const formData = new FormData();
            formData.append("file", file);
            const resFile = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                pinata_api_key: `e0b1f2da608f96419498`,
                pinata_secret_api_key: `62dc06dd5509e6b31cb8097b581d4f496798337ac3c14d9849afee6f944c729b`,
                "Content-Type": "multipart/form-data",
              },
            });
            const url1 = await resFile.data.IpfsHash;
            // const url = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
            // contract.add(account,ImgHash);
            setUrl(url1);
            console.log(state);
            await state.contract.addReport(url1,id,"FIR Filed");
            alert("Successfully File Uploaded");
            setFileName("No File selected");
            console.log(url);
            setFile(null);
            setReload(true);
          } catch (e) {
            console.log('error'+e);
            alert("Unable to upload File to Pinata");
          }
        }
        // alert("Successfully Image Uploaded");
        setFileName("No File selected");
        setFile(null);
      };

      const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
          setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
      };

      const handleFileAccess = async(id)=>{
        const foundItem = complaints.find(item=>item.id === id)
        const hash = foundItem.report;
        const url = `https://gateway.pinata.cloud/ipfs/${hash}`;
        console.log(url);
        window.open(url, '_blank');
      };

    return(
        <Container fluid className="project-section">
        <Container>
          <h1 className="project-heading">
            <strong className="purple">COMPLAINTS </strong>
          </h1>
            <Box sx={{ my: 8, mx: 'auto', width: '60%' }}>
                {complaints.map((item, index) => (
                    <div key={item.address}>
                    <Box
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginBottom: 2,
                        }}
                    >
                        <Box
                        sx={{
                            display: 'flex',
                            padding:2,
                            flexDirection: 'row',
                            textAlign: 'left',
                            alignItems: 'center',
                            justifyContent: 'start',
                            border: 1,
                            borderRadius: 3,
                            background: "#d8d8d8",
                            width: '100%', // Adjusted width to 100%
                            opacity: "100%",
                            paddingLeft: "1rem",
                            cursor: 'pointer', // Add cursor pointer for indicating clickability
                        }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 2,width:'100%'}}>
                                {<div key={item.id}><b>NAME  : </b>{item.name}</div>}
                                {<div key={item.id}><b>ADDRESS : </b>{item.complainAddress}</div>}
                                {<div key={item.id}><b>PHONE NUMBER : </b>{item.phone}</div>}
                                {<div key={item.id}><b>COMPLAIN : </b>{item.complain}</div>}
                                {<div key={item.id}><b>STATUS : </b>{item.status ? item.status : "To be reviewed"}</div>}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between',marginRight:4,width:'100%'}}>
                                    {/* <Button variant="text">Update Status</Button>
                                    <Button variant="text">Upload FIR</Button> */}
                                    <div sx={{ position: 'relative', zIndex: 20 }}>
                                    <form className="form" onSubmit={(e) => handleSubmit(e, item.id)}>
                                        {/* <label htmlFor="file-upload" className="choose">
                                        Choose Image
                                        </label> */}
                                        <input
                                        // disabled={!account}
                                        type="file"
                                        id="file-upload"
                                        name="data"
                                        onChange={retrieveFile}
                                        />
                                        {/* <span className="textArea">File: {fileName}</span> */}
                                        <button type="submit" className="upload" disabled={!file}>
                                        Upload File
                                        </button>
                                    </form>
                                    </div>
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center",paddingRight:10}}>
                                      <button onClick={() => handleFileAccess(item.id)}>View Pdf</button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    </div>
                ))}
    </Box>
        </Container>
        <Particle />
      </Container>
    )
}

export default Police;