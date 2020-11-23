import React from 'react';
import './ChatScreenHeader.scss';
import ChatScreenHeaderItem from './ChatScreenHeaderItem/ChatScreenHeaderItem';

export default function ChatScreenHeader() {
    return (
        <div className="ChatScreenHeader">
            <div className="ChatScreenHeader__items">
                <ChatScreenHeaderItem
                    renderIcon={() => <i className='material-icons'>videocam</i>}
                    label="Video Call" />
            </div>
        </div>
    );
}