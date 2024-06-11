import React, { useState } from "react";
import { images} from "../../images/assets"
import { Container } from "react-bootstrap";
import {
  generatePhoneOtpAPI,
  phoneOtpVerificationAPI,
} from "../../Service/allApi";
import { useNavigate } from "react-router";
import "./phone.css"

function PhoneVerification() {
  const [userPhone] = useState(() =>
    JSON.parse(sessionStorage.getItem("phone"))
  );
const[otpGenerate,setOtpGenerate]=useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const GenerateOtp = async () => {
    if (!userPhone) {
     alert("User phone number is not available.You need to register first");
     navigate('/')
      return;
    }
    
    if (otpGenerate) {
      alert("OTP has already been generated.");
      return;
    }

    try {
      const result = await generatePhoneOtpAPI({ phone: userPhone });
      if (result.status === 200) {
        alert("OTP Successfully Generated");
        setOtpGenerate(true);
      }
    } catch (err) {
      console.error("OTP generation failed", err);
      alert("An error occurred during OTP generation. Please try again later.");
}
};
 
 
 
 
 
 
 
  // submit
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    // check otp length
    if (otp.length !== 6) {
      return alert("Invalid OTP. OTP should be 6 digits long.");
    }

    try {
      const userData = {
        phone: userPhone,
        otp,
      };
      const result = await phoneOtpVerificationAPI(userData);
      if (result.status === 200) {
        alert("Phone Number Verification Successful");
        navigate("/login");
      } else {
        console.log(result);
        alert("Verification Failed! Try Again");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      alert("An error occurred during verification. Please try again later.");
    }
  };

  return (
    <>
      <Container>
        <div className="p-5 m-5 text-center">
          {" "}
          <img src={images.pverify} height={300} alt="" />
          <h3 className="mb-2 pnq">Verify Your Phone Number</h3>
          <p className="pnv">Enter the verification code we have sent to your number</p>
          <input
            id="otpInput"
            type="number"
            
            placeholder="Enter OTP Here"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          <br />
          {!otpGenerate && (<button className="btn btn-outline-dark mt-3 me-3" onClick={GenerateOtp} id="gbtn">Generate OTP</button>)
          
}
          <button className="btn btn-success" id="pnbtn" onClick={handleOtpSubmit}>
            Submit   OTP
          </button>
          
        </div>
      </Container>
    </>
  );
}

export default PhoneVerification;




