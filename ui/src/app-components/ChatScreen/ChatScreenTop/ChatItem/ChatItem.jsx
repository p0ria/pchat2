import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../state/app/app.selectors';
import ImageChat from '../../../chat-items/ImageChat/ImageChat';
import MapChat from '../../../chat-items/MapChat/MapChat';
import TextChat from '../../../chat-items/TextChat/TextChat';
import VoiceChat from '../../../chat-items/VoiceChat/VoiceChat';
import './ChatItem.scss';

export default function ChatItem({ message }) {
    const user = useSelector(selectUser);
    const isOwner = String(user._id) === message.author._id;
    const timestamp = new Date(0); // The 0 there is the key, which sets the date to the epoch
    timestamp.setUTCSeconds(message.createdAt / 1000);
    const renderChatComponent = useCallback(() => {
        switch (message.type) {
            case 'TEXT':
                return <TextChat isOwner={isOwner} message={message.value} />

            case 'IMAGE':
                return <ImageChat isOwner={isOwner} message={message.value} />

            case 'VOICE':
                return <VoiceChat isOwner={isOwner} message={message.value} />

            case 'LOCATION':
                return <MapChat isOwner={isOwner} message={message.value} />

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
                <div className="ChatItem__timestamp">{`${timestamp.toLocaleDateString()} ${timestamp.toTimeString().substr(0, 5)}`}</div>
            </div>
        </div>
    )
}