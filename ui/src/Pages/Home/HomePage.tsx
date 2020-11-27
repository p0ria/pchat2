import React, { useEffect } from 'react';
import './HomePage.scss';
import Sidebar from '../../app-components/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetProfile, actionSubscribeToWebrtcWS, actionSubscribeToWS } from '../../state/app/app.actions';
import ChatScreen from '../../app-components/ChatScreen/ChatScreen';
import { selectUser } from '../../state/app/app.selectors';
import CallModal from '../../modals/CallModal/CallModal';
import { selectLocalStream } from '../../state/webrtc/webrtc.selectors';

export default () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const localStream = useSelector(selectLocalStream);
  useEffect(() => {
    dispatch(actionGetProfile());
    dispatch(actionSubscribeToWS(dispatch));
  }, [])
  useEffect(() => {
    if (user) {
      dispatch(actionSubscribeToWebrtcWS(dispatch));
    }
  }, [user])

  return (
    <div className="HomePage">
      <Sidebar />
      <ChatScreen />
      { localStream && <CallModal />}
    </div>
  )
}

