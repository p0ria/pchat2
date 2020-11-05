import React from 'react';
import './ImageChat.scss';

export default function ImageChat({ imageUrl }) {
    return (
        <div className="ImageChat">
            <img
                src={imageUrl}
                width="100"
                height="100" />
        </div>
    )
}