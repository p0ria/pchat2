import React from 'react';
import './ChatItem.scss';

export default function ChatItem({ text, isOwner }) {
    return (
        <div className={`ChatItem ${isOwner ? 'right' : 'left'}`}>
            <div className="ChartItem__baloon">
                {text}
            </div>
        </div>
    )
}