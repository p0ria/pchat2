import React from 'react';
import './ChatExtras.scss';
import ImageChatExtra from './ImageChatExtra/ImageChatExtra';
import VoiceChatExtra from './VoiceChatExtra/VoiceChatExtra';

export default function ChatExtras() {
    return (
        <div className="ChatExtras">
            <VoiceChatExtra />
            <ImageChatExtra />
            <i className="chatExtra__icon material-icons">more_vert</i>
        </div>
    )
}