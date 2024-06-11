import React, { useState } from 'react';
import "./register.css";
import { Col, Container, Row, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { images } from "../../images/assets";
import { generateOtpAPI, registerApi } from "../../Service/allApi"; // Added generateOtpAPI import
import Header from "../../Components/Header";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "", email: "", password: "", confirmPassword: ""
  });

  const setInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  console.log(user);

  const generateOtp = async (email) => {
    try {
      const result = await generateOtpAPI({ email });
      if (result.status === 200) {
        alert('OTP Generated Successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, phone} = user;
    if (!username || !email || !password || !confirmPassword ||!phone ){
      alert("please fill all fields");
    } else {
      const result = await registerApi(user);
      if (result.status === 200) {
        alert(`${result.data.username} your account created successfully`);
        await generateOtp(email); // Call OTP generation
        setUser({ username: "", email: "", password: "", confirmPassword: "" , phone:""});
        navigate("/email"); // Navigate to email verification
        sessionStorage.setItem("email", JSON.stringify(email));
        sessionStorage.setItem("phone", JSON.stringify(phone));
      } else {
        alert(result.response.data);
      }
    }
  };

  const onSuccess = async (tokenResponse) => {
    try {
      const googleUser = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            Accept: 'application/json'
          }
        }
      );

      const userData = {
        username: googleUser.data.name,
        email: googleUser.data.email,
        image: googleUser.data.picture,
        role: "User"
      };

      sessionStorage.setItem("Existinguser", JSON.stringify(userData));
      navigate('/home');
    } catch (error) {
      console.error("Google login error:", error);
      alert("An error occurred during Google login. Please try again.");
    }
  };

  const register = useGoogleLogin({
    onSuccess,
    onFailure: (error) => console.error("Google login failure:", error)
  });

  return (
    <div>
      <Container>
        <Header />
        <Row className='justify-content-md-center'>
          <Col lg={6} className='p-5 mt-5'>
            <h2 className="text-center fw-bold">Signup</h2>
            <div>
              <div className='ms-5 me-5 pt-3'>
                <FloatingLabel
                  controlId="floatingInputEmail"
                  label="Email address"
                  className="mb-3 customform"
                >
                  <Form.Control style={{ backgroundColor: '#F0EFFF' }} type="email" placeholder="name@example.com"
                    onChange={setInputs}
                    name='email'
                    value={user.email} />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingUsername"
                  label="Create Username"
                  className="mb-3 customform"
                >
                  <Form.Control style={{ backgroundColor: '#F0EFFF' }} type="text" placeholder="Username"
                    onChange={setInputs}
                    name='username'
                    value={user.username}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingPhone"
                  label="Phone Number"
                  className="mb-3 customform "
                >
                  <Form.Control style={{ backgroundColor: '#F0EFFF' }} type="text" placeholder="Phonenumber"
                    onChange={setInputs}
                    name='phone'
                    value={user.phone}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Password"
                  className="mb-3 customform"
                >
                  <Form.Control style={{ backgroundColor: '#F0EFFF' }} type="password" placeholder="Password"
                    onChange={setInputs}
                    name='password'
                    value={user.password}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingConfirmPassword"
                  label="Confirm Password"
                  className="mb-3 customform"
                >
                  <Form.Control style={{ backgroundColor: '#F0EFFF' }} type="password" placeholder="Confirm Password"
                    onChange={setInputs}
                    name='confirmPassword'
                    value={user.confirmPassword}
                  />
                </FloatingLabel>
                <Button onClick={handleRegister}
                  type="submit" className="custom-button w-100 p-3" style={{ backgroundColor: '#4D47C3' }}>
                  Register
                </Button>
              </div>
              <p className='text-center mt-5 mx-auto'>or continue with</p>
              <div className='text-center'>
                <img src={images.facebook} className='ikon' alt="Facebook" />
                <img className="ikon" onClick={register} src={images.google} alt="Google" />
                <img src={images.apple} className='ikon' alt="Apple" />
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <h1 className='fw-bold ms-5 mt-5 headingreg'>Sign Up to</h1>
            <h4 className='ms-5'>Lorem ipsum is simply</h4>
            <p className='mt-5 ms-5'>If you already have an account,<br /> you can
              <a href="/login" style={{ textDecoration: 'none' }}> login here!</a>.</p>
            <img src={images.saly} style={{ position: "absolute", marginLeft: "175px", marginTop: "-76px" }} className="image-saly" alt="Saly" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;





// import React, { useState } from 'react'
// import "./register.css";
// import { Col, Container, Row, Button } from 'react-bootstrap'
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import { images } from "../../images/assets";
// import { generateOtpAPI,registerApi } from "../../Service/allApi";
// import Header from "../../Components/Header";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useGoogleLogin } from '@react-oauth/google';



// const Register = () => {



//   const navigate = useNavigate();

//   //state to store inputs
//   const [user, setUser] = useState({
//     username: "", email: "", password: "", confirmPassword: ""
//   })


//   const setInputs = (e) => {
//     const { name, value } = e.target
//     setUser({ ...user, [name]: value })
//   }
//   console.log(user);

//   const handleRegister = async (e) => {
//     e.preventDefault()
//     const { username, email, password, confirmPassword } = user
//     if (!username || !email || !password || !confirmPassword) {
//       alert("please fill all datas")
//     } else {
//       const result = await registerApi(user)
//       if (result.status === 200) {
//         alert(`${result.data.username} your account created successfully`)
//         setUser({ username: "", email: "", password: "", confirmPassword: "" })
//         navigate("/login")
//       }
//       else {
//         alert(result.response.data)
//         // setUser({username: "", email: "", password: "", confirmPassword: ""})

//       }
//     }
//   }




//   const onSuccess = async (tokenResponse) => {
//     try {
//       const googleUser = await axios.get(
//         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
//         {
//           headers: {
//             Authorization: `Bearer ${tokenResponse.access_token}`,
//             Accept: 'application/json'
//           }
//         }
//       );

//       const userData = {
//         username: googleUser.data.name,
//         email: googleUser.data.email,
//         image: googleUser.data.picture,
//         role:"User"
//       };

//       sessionStorage.setItem("Existinguser", JSON.stringify(userData));
//       navigate('/home');
//     } catch (error) {
//       console.error("Google login error:", error);
//       alert("An error occurred during Google login. Please try again.");
//     }
//   };

//   const register = useGoogleLogin({
//     onSuccess,
//     onFailure: (error) => console.error("Google login failure:", error)
//   });












//   return (
//     <div>
//       <Container>

//         <Header></Header>
//         <Row className='justify-content-md-center'>

//           <Col lg={6} className='p-5 mt-5' >

//             <h2 className="text-center fw-bold">Signup</h2>


//             <div  >

//               <div className='ms-5 me-5 pt-3'>

//                 <FloatingLabel
//                   controlId="floatingInputEmail"
//                   label="Email address"
//                   className="mb-3 customform"
//                 >
//                   <Form.Control style={{ backgroundColor: '#F0EFFF' }} type="email" placeholder="name@example.com"
//                     onChange={(e) => setInputs(e)}
//                     name='email'
//                     value={user.email} />
//                 </FloatingLabel>

//                 <FloatingLabel
//                   controlId="floatingUsername"
//                   label="Create Username"
//                   className="mb-3 customform"

//                 >
//                   <Form.Control style={{ backgroundColor: '#F0EFFF' }} type="text" placeholder="Username"
//                     onChange={(e) => setInputs(e)}
//                     name='username'
//                     value={user.username}
//                   />
//                 </FloatingLabel>

//                 <FloatingLabel
//                   controlId="floatingPassword"
//                   label="Password"
//                   className="mb-3 customform"
//                 >
//                   <Form.Control style={{ backgroundColor: '#F0EFFF' }} type="password" placeholder="Password"
//                     onChange={(e) => setInputs(e)}
//                     name='password'
//                     value={user.password}
//                   />
//                 </FloatingLabel>

//                 <FloatingLabel
//                   controlId="floatingConfirmPassword"
//                   label="Confirm Password"
//                   className="mb-3 customform "
//                 >
//                   <Form.Control style={{ backgroundColor: '#F0EFFF' }} type="password" placeholder="Confirm Password"
//                     onChange={(e) => setInputs(e)}
//                     name='confirmPassword'
//                     value={user.confirmPassword}
//                   />
//                 </FloatingLabel>

//                 <Button onClick={(e) => handleRegister(e)}
//                   type="submit" className="custom-button w-100 p-3 " style={{ backgroundColor: '#4D47C3' }} >
//                   Register
//                 </Button>

//               </div>

//               <p className='text-center mt-5 mx-auto' >or continue with</p>


//               <div className='text-center'>
//                 <img src={images.facebook} className='ikon ' alt="" />
//                 <img className=" ikon" onClick={() => register()} src={images.google} alt="Google" />
//                 <img src={images.apple} className='ikon' alt="" />
//               </div>
//             </div>
//           </Col>


//           <Col lg={6}>


//             <h1 className='fw-bold ms-5 mt-5 headingreg'>Sign Up to</h1>
//             <h4 className='ms-5'>Lorem ipsum is simply</h4>
//             <p className='mt-5 ms-5'>If you already have an account,<br /> you can
//               <a href="/login" style={{ textDecoration: 'none' }}> login here!</a>.</p>

//             <img src={images.saly} style={{ position: "absolute", marginLeft: "175px", marginTop: "-76px" }} className="image-saly" alt="" />


//           </Col>

//         </Row>
//       </Container>






//     </div>
//   )
// }

// export default Register









