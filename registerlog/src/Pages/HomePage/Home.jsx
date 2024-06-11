import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Col, Row, Button } from "react-bootstrap";
import "./home.css";
import Cards from "../../Components/Cards";
import HomeCarousal from "../../Components/Carousal";
// import { useNavigate } from "react-router-dom";
import axios from "axios";




const Home = () => {

  // const navigate = useNavigate();
  const [userdata, setUserdata] = useState({});
  console.log("response", userdata);

  // const getUser = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/login/success", {
  //       withCredentials: true,
  //     });
  //     // console.log("response",rersponse);
  //     setUserdata(response.data.user);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const checkSessionStorage = () => {
    const storedUser = sessionStorage.getItem("Existinguser");
    if (storedUser) {
      setUserdata(JSON.parse(storedUser));
    }
  };
  

  useEffect(() => {
    // getUser();
    checkSessionStorage();
  }, []);

  const logout = () => {
    window.open("http://localhost:8000/logout", "_self");
        sessionStorage.removeItem("Existinguser");
    sessionStorage.removeItem("token");
    // navigate('/login'); // Redirect to login page after logout

  };

  // const logout = () => {
  //   sessionStorage.removeItem("Existinguser");
  //   sessionStorage.removeItem("token");
  //   navigate('/login'); // Redirect to login page after logout
// };




  return (
    <div>
      <div style={{ backgroundColor: "#3E5D5E", minHeight: "100vh" }}>
        <Navbar expand="lg">
          <Container fluid>
            <Navbar.Brand
              href="#home"
              className=" ms-3"
              style={{ color: "#77CF16" }}
            >
            <h3 className="fw-bold">D'watch</h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto ">
                <div className="me-5 underline">
                  <Nav.Link href="#home" className="text-white">
                    Products
                  </Nav.Link>
                </div>
                <div className="me-5 underline">
                  <Nav.Link href="#features" className="text-white">
                    About
                  </Nav.Link>
                </div>
                <div className="me-5 underline">
                  <Nav.Link href="#pricing" className="text-white">
                    Contact
                  </Nav.Link>
                </div>

                <div className="me-5 underline">
                  <Nav.Link href="#pricing" className="">
                    <i
                      className="fa-solid fa-cart-shopping"
                      style={{ color: "#77CF16" }}
                    ></i>
                  </Nav.Link>
                </div>
                {Object?.keys(userdata)?.length > 0 ? (
                  <div className="d-flex align-items-center  me-5 ">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        className="me-1"
                        src={userdata.image}
                        alt=""
                        height="35px"
                        style={{ borderRadius: "35px" }}
                      />
                      <li className="text-white ms-2" >{userdata.username}</li>
                    </div>
                    <div className="">
                      <Nav.Link className="text-white" >
                        <Button
                          onClick={logout}
                          className="btn pb-2 ms-4 text-black mb-2 "
                          style={{ background: '#77CF21',borderRadius:'5%',border:'none'}}
                        >
                          Logout
                        </Button>
                      </Nav.Link>
                    </div>
                  </div>
                ) : (
                  <p></p>
              )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container fluid className="mt-3">
          <Row>
            <Col lg={7}>
              <h1 className="home-heading ms-4 text-white">
                This is the time to <br /> transform yourself into a <br /> real
                man
              </h1>
              <p className=" ms-4 text-white">
                Hanpicked collection of{" "}
                <span style={{ color: "#77CF16" }}>premium</span> time keepers{" "}
                <br /> for all purpose and ages
              </p>
              <p className=" ms-4 text-white">Featured Collectibles</p>
              <Cards />
            </Col>

            <Col lg={5}>
              <HomeCarousal></HomeCarousal>
            </Col>
          </Row>{" "}
          {/* Add more homepage content here */}
        </Container>
      </div>{" "}
    </div>
  );
};

export default Home;
