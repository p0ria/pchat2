import React from 'react';
import './ChatExtras.scss';
import ImageChatExtra from './ImageChatExtra/ImageChatExtra';
import MoreChatExtra from './MoreChatExtra/MoreChatExtra';
import VoiceChatExtra from './VoiceChatExtra/VoiceChatExtra';

export default function ChatExtras() {
    return (
        <div className="ChatExtras">
            <VoiceChatExtra />
            <ImageChatExtra />
            <MoreChatExtra />
        </div>
    )
}