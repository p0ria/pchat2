import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedAudience } from '../../../../state/chat/chat.selectors';
import ChatItem from '../ChatItem/ChatItem';
import './ChatItems.scss';

export default function ChatItems() {
    const audience = useSelector(selectSelectedAudience);
    return (
        <div className="ChatItems">
            {audience &&
                audience.messages.map(m => (
                    <ChatItem
                        text={m.value}
                        isOwner={Math.random() > .5}
                        key={m._id}
                    />
                ))
            }
        </div>
    )
}