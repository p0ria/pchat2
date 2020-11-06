import React from 'react';
import './ChatExtras.scss';
import ImageChatExtra from './ImageChatExtra/ImageChatExtra';

export default function ChatExtras() {
    return (
        <div className="ChatExtras">
            <i className="material-icons">mic</i>
            <ImageChatExtra />
            <i className="material-icons">more_vert</i>
        </div>
    )
}