import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../../state/login/login.selectors';
import { useHistory } from 'react-router-dom';

export default () => {
  const token = useSelector(selectToken);
  const history = useHistory();
  useEffect(() => {
    if(!token) history.push('/login');
  }, [token])
  return (
    <div className="HomePage">
      Home Page
    </div>
  )
}