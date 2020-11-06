import React from 'react';
import './ImageChat.scss';

export default function ImageChat({ isOwner, message }) {
    return (
        <div className={`ImageChat ${isOwner ? 'right' : 'left'}`}>
            {
                message.urls.map(url => (
                    <img
                        key={url}
                        src={url}
                        width="100"
                        height="100" />
                ))
            }
        </div>
    )
}