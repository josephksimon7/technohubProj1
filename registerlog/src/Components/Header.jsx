import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function Header() {
  return (
    <div>

<Navbar className="bg-body-primary">
        <Container>
          <Navbar.Brand href="#home">
           <p className='fw-bold'>
            Logo Here
           </p>
          </Navbar.Brand>
        </Container>
      </Navbar>




    </div>
  )
}

export default Header