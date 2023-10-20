// authService.jsx

import jwt_decode from "jwt-decode";

//token
export const token = localStorage.getItem('jwt');





//userid
export const getUserIdFromToken = () => {
  const token = localStorage.getItem('jwt');
  if (!token) return null;
  console.log("Getting token...:",token);

  try {
    const decoded = jwt_decode(token);
    console.log("decoded token:",decoded)
    return decoded.id; // replace 'user_id' with the actual key where userId is stored in your token payload

  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
};
