import React, { useState } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';

export default({...props}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const onLogout = response => {
    setIsLoggedIn(false);
    setAccessToken(null);
  }
  const onLogin = response => {
    if(response.accessToken) {
      setIsLoggedIn(true);
      setAccessToken(response.accessToken);
    }
  }
  const handleLogoutFailure = response => {
    alert('Failed to log out');
  }
  const handleLoginFailure = response => {
    alert('Failed to log in');
  }
  return (
    <div className="GoogleBtn">
      {isLoggedIn ? 
        <GoogleLogout
          clientId="138661202116-frv54rhkfqjmpft9do7katdfu9anuuat.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={onLogout}
          onFailure={handleLogoutFailure}
        /> :
        <GoogleLogin
          clientId="138661202116-frv54rhkfqjmpft9do7katdfu9anuuat.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={onLogin}
          onFailure={handleLoginFailure}
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
        />
      }
      {accessToken ? <h5>You access token: <br/><br/> {accessToken}</h5> : null}
    </div>
  )
}