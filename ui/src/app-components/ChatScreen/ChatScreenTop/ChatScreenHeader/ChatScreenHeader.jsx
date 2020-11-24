import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCallAudience } from '../../../../state/webrtc/webrtc.actions';
import './ChatScreenHeader.scss';
import ChatScreenHeaderItem from './ChatScreenHeaderItem/ChatScreenHeaderItem';

export default function ChatScreenHeader() {
    const dispatch = useDispatch();
    return (
        <div className="ChatScreenHeader">
            <div className="ChatScreenHeader__items">
                <ChatScreenHeaderItem
                    renderIcon={() => <i className='material-icons'>videocam</i>}
                    label="Video Call"
                    onClick={() => dispatch(actionCallAudience(dispatch))} />
            </div>
        </div>
    );
}