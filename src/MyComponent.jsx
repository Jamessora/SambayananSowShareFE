import React, { useEffect } from 'react';

const MyComponent = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({ client_id: '474146084181-8ku0i6n205c3u2hcddk17vf0ucdgqvdl.apps.googleusercontent.com' });
      });
    };

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const handleSignIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn()
      .then(googleUser => {
        // Handle sign-in
        const profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
      })
      .catch(error => {
        console.log('An error occurred:', error);
      });
  };

  const handleSignOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut()
      .then(() => {
        console.log('User signed out.');
      })
      .catch(error => {
        console.log('An error occurred:', error);
      });
  };

  
  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}

export default MyComponent;
