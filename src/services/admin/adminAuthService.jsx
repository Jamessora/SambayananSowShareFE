// authService.jsx

import jwt_decode from "jwt-decode";

//token
export const token = localStorage.getItem('jwt');





//adminId
export const getAdminIdFromToken = () => {
  const token = localStorage.getItem('jwt');
  if (!token) return null;
  console.log("Getting token...:",token);

  try {
    const decoded = jwt_decode(token);
    console.log("decoded token:",decoded)
    return decoded.id; 
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
};
