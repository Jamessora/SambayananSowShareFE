// CallbackComponent.jsx
import { useEffect } from 'react';

const CallbackComponent = () => {

  useEffect(() => {
    // Parse id_token from URL hash fragment here
    // Send id_token to your server for verification

    const hash = window.location.hash.substr(1);
    const result = hash.split('&').reduce((result, item) => {
      const parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});

    if (result['id_token']) {
      // send this to your server for verification
      console.log('ID Token:', result['id_token']);
    }
  }, []);

  return (
    <div>
      Processing callback...
    </div>
  );
};

export default CallbackComponent;
