import React, { useCallback } from 'react';
import TextChat from '../../../chat-items/TextChat/TextChat';
import './ChatItem.scss';

export default function ChatItem({ message }) {
    const renderChatComponent = useCallback(() => {
        switch (message.type) {
            case 'TEXT':
                return <TextChat text={message.value} />
            default:
                return null;
        }
    }, [message]);
    return (
        <div className={`ChatItem ${Math.random() > .5 ? 'right' : 'left'}`}>
            <div className="ChartItem__baloon">
                {renderChatComponent()}
            </div>
        </div>
    )
}