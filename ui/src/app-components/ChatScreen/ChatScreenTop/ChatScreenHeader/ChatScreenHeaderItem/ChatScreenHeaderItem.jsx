import React from 'react';
import './ChatScreenHeaderItem.scss';

export default function ChatScreenHeaderItem({ label, renderIcon = () => null, ...props }) {
    return (
        <div className="ChatScreenHeaderItem" {...props}>
            {renderIcon()}
            <span>{label}</span>
        </div>
    )
}