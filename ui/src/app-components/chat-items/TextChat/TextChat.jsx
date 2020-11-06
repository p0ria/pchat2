import React from 'react';
import './TextChat.scss';

export default function TextChat({ message }) {
    return (
        <div className="TextChat">
            {message.text}
        </div>
    )
}