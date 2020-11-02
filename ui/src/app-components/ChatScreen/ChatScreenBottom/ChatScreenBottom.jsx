import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedAudience } from '../../../state/chat/chat.selectors';
import ChatExtras from './ChatExtras/ChatExtras';
import ChatInput from './ChatInput/ChatInput';
import './ChatScreenBottom.scss';

export default function ChatScreenBottom() {
    const selectedAudience = useSelector(selectSelectedAudience);
    return (
        selectedAudience &&
        <div className="ChatScreenBottom">
            <ChatInput audienceId={selectedAudience._id} />
            <ChatExtras />
        </div>
    )
}
