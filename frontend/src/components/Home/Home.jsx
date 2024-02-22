import React, { lazy, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/BTB.png";
import Type from "./Type";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Particle = lazy(()=>import('../Particle'));

function Home() {
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const navigateTo = useNavigate();

  const handleLearnMoreClick = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };

  return (
    <section>
      
      <Container className="home-content">
        <Row>
          <Col md={7} className="home-header">
            <h1 style={{ paddingBottom: 15 }} className="heading">
              Welcome to Decentralized <strong className="main-name"> FIR</strong> system
            </h1>

            <h1 className="heading-name">
              Project <strong className="main-name"> SecureJury</strong>
            </h1>

            <div style={{ padding: 50, textAlign: "left" }}>
              <Type />
            </div>
          </Col>

          <Col md={5} style={{ paddingBottom: 20 }}>
            <img
              src={homeLogo}
              alt="home pic"
              className="img-fluid"
              style={{ maxHeight: "450px" }}
            />
          </Col>
        </Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" sx={{ mt: 3, mb: 2, mr:3,bgcolor: '#e16327',color:'white','&:hover': {
                bgcolor: '#363333'}}}
                onClick={() => navigateTo('/AddCandidate')}
            >
              Add Candidate</Button>
            <Button variant="contained"  sx={{ mt: 3, mb: 2,bgcolor: '#e16327',color:'white','&:hover': {
                bgcolor: '#363333'}}}
                onClick={()=> navigateTo('/GivePermission')}
            >Enable Permission</Button>
        </div>
      </Container>
      <Particle />
    </section>
  );
}

export default Home;