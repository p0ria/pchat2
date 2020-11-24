import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedAudienceImpl } from '../../../../state/chat/chat.selectors';
import { actionCallAudience } from '../../../../state/webrtc/webrtc.actions';
import './ChatScreenHeader.scss';
import ChatScreenHeaderItem from './ChatScreenHeaderItem/ChatScreenHeaderItem';

export default function ChatScreenHeader() {
    const dispatch = useDispatch();
    const audienceImpl = useSelector(selectSelectedAudienceImpl);
    return (
        <div className="ChatScreenHeader">
            <div className="ChatScreenHeader__items">
                {
                    audienceImpl &&
                    audienceImpl.type == 'PRIVATE' &&
                    audienceImpl.user1._id != audienceImpl.user2._id &&
                    <ChatScreenHeaderItem
                        renderIcon={() => <i className='material-icons'>videocam</i>}
                        label="Video Call"
                        onClick={() => dispatch(actionCallAudience(dispatch))} />
                }
            </div>
        </div>
    );
}