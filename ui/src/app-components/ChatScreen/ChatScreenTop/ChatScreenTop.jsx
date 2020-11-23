import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedAudience } from '../../../state/chat/chat.selectors';
import ChatItems from './ChatItems/ChatItems';
import ChatScreenHeader from './ChatScreenHeader/ChatScreenHeader';
import './ChatScreenTop.scss';

export default function ChatScreenTop() {
    const audience = useSelector(selectSelectedAudience);
    const style = audience && { backgroundImage: `url(${audience.avatarUrl})` };
    return (
        <div className="ChatScreenTop" style={style}>
            {audience && <ChatScreenHeader />}
            <ChatItems />
        </div>
    )
}