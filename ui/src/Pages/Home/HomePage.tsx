import React, { useEffect } from 'react';
import './HomePage.scss';
import Sidebar from '../../app-components/Sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { actionGetProfile, actionSubscribeToWS } from '../../state/app/app.actions';
import ChatScreen from '../../app-components/ChatScreen/ChatScreen';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionGetProfile());
    dispatch(actionSubscribeToWS(dispatch));
  }, [])

  return (
    <div className="HomePage">
      <Sidebar />
      <ChatScreen />
    </div>
  )
}

