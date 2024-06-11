import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { images } from "../images/assets";

const Cards = () => {
  return (
    <Row xs={1} md={3} className="g-4 ms-4 me-4" >
       <Col>
        <Card style={{  }}>
          <Card.Img variant="top" className='mx-auto mt-4' src={images.watch1} style={{ maxWidth: '30%', }}/>
          <Card.Body>
            <Card.Title className='text-center'>Mini Focus</Card.Title>
           
            <p className="text-center">$169</p>
            <Button style={{ backgroundColor: '#77CF16', borderColor: '#77CF16' }} className='mx-auto d-block'>Buy Now</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card style={{  }}>
          <Card.Img variant="top" className='mx-auto mt-4' src={images.watch1} style={{ maxWidth: '30%', }}/>
          <Card.Body>
            <Card.Title className='text-center'>Mini Focus</Card.Title>
           
            <p className="text-center">$169</p>
            <Button style={{ backgroundColor: '#77CF16', borderColor: '#77CF16' }} className='mx-auto d-block'>Buy Now</Button>
          </Card.Body>
        </Card>
      </Col>      <Col>
        <Card style={{  }}>
          <Card.Img variant="top" className='mx-auto mt-4' src={images.watch1} style={{ maxWidth: '30%', }}/>
          <Card.Body>
            <Card.Title className='text-center'>Mini Focus</Card.Title>
           
            <p className="text-center">$169</p>
            <Button style={{ backgroundColor: '#77CF16', borderColor: '#77CF16' }} className='mx-auto d-block'>Buy Now</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Cards;
