import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../state/app/app.selectors';
import ImageChat from '../../../chat-items/ImageChat/ImageChat';
import TextChat from '../../../chat-items/TextChat/TextChat';
import ImageChatExtra from '../../ChatScreenBottom/ChatExtras/ImageChatExtra/ImageChatExtra';
import './ChatItem.scss';

export default function ChatItem({ message }) {
    const user = useSelector(selectUser);
    const isOwner = String(user._id) === message.author._id;
    const renderChatComponent = useCallback(() => {
        switch (message.type) {
            case 'TEXT':
                return <TextChat message={message.value} />

            case 'IMAGE':
                return <ImageChat message={message.value} />

            default:
                return 'UNKNOWN MESSAGE TYPE';
        }
    }, [message]);
    return (
        <div className={`ChatItem ${isOwner ? 'right' : 'left'}`}>
            {
                !isOwner &&
                <img className="ChartItem__avatar" src={message.author.avatarUrl} />
            }
            <div className="ChartItem__baloon">
                {renderChatComponent()}
            </div>
        </div>
    )
}