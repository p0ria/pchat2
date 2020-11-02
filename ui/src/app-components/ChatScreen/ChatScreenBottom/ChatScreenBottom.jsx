import React from 'react';
import ChatExtras from './ChatExtras/ChatExtras';
import ChatInput from './ChatInput/ChatInput';
import './ChatScreenBottom.scss';

export default function ChatScreenBottom() {
    return (
        <div className="ChatScreenBottom">
            <ChatInput />
            <ChatExtras />
        </div>
    )
}
