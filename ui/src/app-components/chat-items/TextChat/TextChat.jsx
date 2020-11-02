import React from 'react';
import './TextChat.scss';

export default function TextChat({ text }) {
    return (
        <div className="TextChat">
            {text}
        </div>
    )
}