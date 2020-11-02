import React from 'react';
import './ChatScreen.scss';
import ChatScreenBottom from './ChatScreenBottom/ChatScreenBottom';
import ChatScreenTop from './ChatScreenTop/ChatScreenTop';

export default function ChatScreen() {
    return (
        <div className="ChatScreen">
            <ChatScreenTop />
            <ChatScreenBottom />
        </div>
    )
}