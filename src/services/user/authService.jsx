// authService.jsx

import jwt_decode from "jwt-decode";

//token
export const token = localStorage.getItem('jwt');


const getApiBaseUrl = () => {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_BASE_URL_LOCAL;
  }
  return import.meta.env.VITE_API_BASE_URL;
};

export const apiBaseURL = getApiBaseUrl();

export const apiURL = import.meta.env.VITE_API_BASE_URL;

// export function checkKYCStatus() {
//   return localStorage.getItem('kyc_status');
// }


console.log("API Base URL is: ", import.meta.env.VITE_API_BASE_URL)

//userid
export const getUserIdFromToken = () => {
  const token = localStorage.getItem('jwt');
  if (!token) return null;
  console.log("Getting token...:",token);

  try {
    const decoded = jwt_decode(token);
    console.log("decoded token inside getuserid:",decoded)
    return decoded.id; // userId is stored in token payload

  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
};
