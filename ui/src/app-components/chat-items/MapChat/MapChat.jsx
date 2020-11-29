import React from 'react';
import LocationMap from '../../../components/LocationMap/LocationMap';
import './MapChat.scss';

export default function MapChat({ isOwner, message }) {
    return (
        <div className="MapChat">
            <LocationMap lngLat={[message.lng, message.lat]} />
        </div>
    )

}