'use client';
import { useEffect } from 'react';

const FacebookLogin = () => {
  useEffect(() => {
    // Load the Facebook SDK asynchronously when the component mounts
    const loadFacebookSDK = () => {
      // Check if the SDK is already loaded
      if (document.getElementById('facebook-jssdk')) return;

      // Create a script element to load the SDK
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v20.0&appId=403781199437137&autoLogAppEvents=1';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      // Create a div for the SDK to attach itself
      const fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
    };

    loadFacebookSDK();

    // Initialize the Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '403781199437137', // Your App ID
        cookie: true,
        xfbml: true,
        version: 'v20.0',
      });
    };
  }, []);

  return (
    <div>
      {/* Facebook Login Button */}
      <div className="fb-login-button"
        data-width=""
        data-size="large"
        data-button-type="login_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="false"
      ></div>
    </div>
  );
};

export default FacebookLogin;
