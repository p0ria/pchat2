import React, { useState } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { loginByGoogle } from '../../state/login/login.actions';

export default({...props}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const dispatch = useDispatch();
  const onLogout = response => {
    setIsLoggedIn(false);
    setAccessToken(null);
  }
  const onLogin = ({tokenId}) => {
    if(tokenId) {
      setIsLoggedIn(true);
      dispatch(loginByGoogle(tokenId));
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
          isSignedIn={false} 
        />
      }
    </div>
  )
}