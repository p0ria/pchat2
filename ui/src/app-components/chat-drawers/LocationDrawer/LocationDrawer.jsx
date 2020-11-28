import React from 'react';
import LocationMap from '../../../components/LocationMap/LocationMap';
import './LocationDrawer.scss';

export default function LocationDrawer({ longitude = 0, latitude = 0 }) {
    return (
        <LocationMap
            longitude={longitude}
            latitude={latitude} />
    )
}