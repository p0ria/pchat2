import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../state/app/app.selectors';
import TextChat from '../../../chat-items/TextChat/TextChat';
import './ChatItem.scss';

export default function ChatItem({ message }) {
    const user = useSelector(selectUser);
    const isOwner = String(user._id) === message.author._id;
    const renderChatComponent = useCallback(() => {
        switch (message.type) {
            case 'TEXT':
                return <TextChat text={message.value} />
            default:
                return null;
        }
    }, [message]);
    return (
        <div className={`ChatItem ${isOwner ? 'right' : 'left'}`}>
            <div className="ChartItem__baloon">
                {renderChatComponent()}
            </div>
        </div>
    )
}