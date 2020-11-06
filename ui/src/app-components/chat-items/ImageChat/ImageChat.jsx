import React from 'react';
import './ImageChat.scss';

export default function ImageChat({ message }) {
    return (
        <div className="ImageChat">
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