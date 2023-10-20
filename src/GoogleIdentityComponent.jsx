import React, { useEffect } from 'react';


// const GoogleIdentityComponent = () => {
//   const apiUrl = import.meta.env.VITE_API_BASE_URL_LOCAL;

//   useEffect(() => {
//     // Load Google Identity library
//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);

   

//     script.onload = () => {
//       // Initialize Google Identity
//       window.google.accounts.id.initialize({
//         client_id: '474146084181-8ku0i6n205c3u2hcddk17vf0ucdgqvdl.apps.googleusercontent.com',
//         callback: handleCredentialResponse
//       });
//       window.google.accounts.id.renderButton(
//         document.getElementById("buttonDiv"),
//         { theme: 'outline', size: 'large' }  // customize the button here
//       );
//     };

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handleCredentialResponse = (response) => {
//     console.log('Credential Response:', response);
    
//         // Send the credential to rails server
//         sendCredentialToServer(response.credential);
//   };

//   const sendCredentialToServer = async (credential) => {
//     // Example using fetch API to send credential to server
//     console.log(`Sending credential to ${apiUrl}/sessions/create`);
//     console.log("Credential:", credential);
//     const res = await fetch(`${apiUrl}/sessions/create`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id_token: credential }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       // Handle successful verification
//       // Maybe set a token or update UI
//       console.log("Verification successful");
//     } else {
//       // Handle failure
//       console.log("Verification failed:", data.error);
//     }
//   };

//   return (
//     <div>
//       <div id="g_id_onload"
//            data-client_id="474146084181-8ku0i6n205c3u2hcddk17vf0ucdgqvdl.apps.googleusercontent.com"
//            data-callback="handleCredentialResponse">
//       </div>
//       <div className="g_id_signin" data-type="standard"></div>
//     </div>
//   );
// };

const GoogleIdentityComponent = () => {
  
  const handleCredentialResponse = (response) => {
    console.log('Inside handleCredentialResponse');
    console.log('Credential Response:', response);
    sendCredentialToServer(response.credential);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log(typeof handleCredentialResponse);
      if (window.google && window.google.accounts && window.google.accounts.id) {
        
        window.google.accounts.id.initialize({
          client_id: '474146084181-8ku0i6n205c3u2hcddk17vf0ucdgqvdl.apps.googleusercontent.com',
          auto_select: false, 
          ux_mode: 'redirect',  // This is the line you add for redirect mode
          redirect_uri: 'http://localhost:5173/callback',  // Your redirect URI
          callback: handleCredentialResponse
        });
       
      } else {
        console.log('Google Identity library not loaded');
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  

  const sendCredentialToServer = async (credential) => {
    try {
      console.log(`Sending credential to /api/sessions/create`);
      const res = await fetch(`/api/sessions/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',  
        body: JSON.stringify({ id_token: credential }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          console.log("Verification successful");
        } else {
          console.log("Verification failed:", data.error);
        }
      } else {
        console.log('Server responded with an error', res);
      }
    } catch (error) {
      console.error('An error occurred while sending credentials:', error);
    }
  };

  return (
    <div>
      <div id="g_id_onload"
           data-client_id="474146084181-8ku0i6n205c3u2hcddk17vf0ucdgqvdl.apps.googleusercontent.com">
      </div>
      <div className="g_id_signin" data-type="standard"></div>
    </div>
  );
};

export default GoogleIdentityComponent;
