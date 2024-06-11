import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";


//register
export const registerApi=async(body)=>{
   return await commonApi('POST',`${BASE_URL}/user/register`,body,"")
}

//login
export const loginApi=async(body)=>{
    return await commonApi('POST',`${BASE_URL}/user/login`,body,"")
}
//email
export const generateOtpAPI = async (body) => {
    return await commonApi("POST", `${BASE_URL}/emailGeneration`, body, "");
  };
  

  export const emailOtpVerificationAPI = async (body) => {
    return await commonApi("POST", `${BASE_URL}/emailverification`, body, "");
  };

  //phone

  export const generatePhoneOtpAPI = async (body) => {
    return await commonApi("POST", `${BASE_URL}/potp`, body, "");
  };
  
  export const phoneOtpVerificationAPI = async (body) => {
    return await commonApi("POST", `${BASE_URL}/votp`,body,"");
  };