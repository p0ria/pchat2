import React from 'react';
import './ChatScreenHeaderItem.scss';

export default function ChatScreenHeaderItem({ label, renderIcon = () => null }) {
    return (
        <div className="ChatScreenHeaderItem">
            {renderIcon()}
            <span>{label}</span>
        </div>
    )
}