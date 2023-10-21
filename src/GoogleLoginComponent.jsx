import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginComponent = () => {
  const responseGoogle = (response) => {
    if (response.error) {
      console.log('An error occurred:', response.error);
    } else {
      console.log('Success:', response);
      // Here, you would send the response token to your Rails API for verification and user creation
    }
  };

  return (
    <GoogleLogin
      clientId="474146084181-8ku0i6n205c3u2hcddk17vf0ucdgqvdl.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      redirectUri="http://localhost:5173/login/callback"
    />
  );
};

export default GoogleLoginComponent;
