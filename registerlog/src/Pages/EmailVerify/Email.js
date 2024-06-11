import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./email.css";
import { useNavigate } from "react-router";
import { emailOtpVerificationAPI } from "../../Service/allApi";
import { images } from "../../images/assets";


function Verification() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(() =>
    JSON.parse(sessionStorage.getItem("email"))
  );
  console.log(userEmail);

  

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // Check if OTP is valid
    if (otp.length !== 6) {
      return alert("Invalid OTP. OTP should be 6 digits long.");
    }
    try {
      const userData = {
        email: userEmail,
        otp,
      };
      const result = await emailOtpVerificationAPI(userData);

      if (result.status === 200) {
        alert("Email Verification Successful");
        navigate("/phoneVerification");
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
          <img src={images.everify} height={300} alt="" />
          <h2 className="mb-2 emq">Verify Your Email Address</h2>
          <p className="emv">
            We have sent a verification link to your email. <br />
            Please enter OTP to complete verification
          </p>
          <input
            id="otpInput"
            type="number"
            placeholder="Enter The OTP Here"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          <br />
          <button className="btn btn-primary " id="embtn" onClick={handleOtpSubmit}>
            Submit OTP
          </button>
         
        </div>
      </Container>
    </>
  );
}

export default Verification;