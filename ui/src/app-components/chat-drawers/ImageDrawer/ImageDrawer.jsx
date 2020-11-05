import React from 'react';
import './ImageDrawer.scss';

export default function ImageDrawer({ imageUrls = [] }) {
    return (
        <div className="ImageDrawer">
            {imageUrls.map(imageUrl => (
                <img
                    key={imageUrl}
                    src={imageUrl}
                    width="100"
                    height="100" />
            ))}
        </div>
    )
}