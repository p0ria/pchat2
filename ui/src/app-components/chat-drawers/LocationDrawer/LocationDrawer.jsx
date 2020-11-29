import React from 'react';
import LocationMap from '../../../components/LocationMap/LocationMap';
import './LocationDrawer.scss';

export default function LocationDrawer(props) {
    return (
        <LocationMap {...props} />
    )
}