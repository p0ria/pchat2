import React, { useEffect, useRef } from 'react';
import './LocationMap.scss';
import mapboxgl from 'mapbox-gl';

export default function LocationMap({ longitude = 0, latitude = 0 }) {
    let map = useRef();

    useEffect(() => {
        map = new mapboxgl.Map({
            accessToken: process.env.REACT_APP_MAPBOX_KEY,
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 13,
            center: [longitude, latitude]
        });
        var marker = new mapboxgl.Marker({ anchor: 'center' })
            .setLngLat([longitude, latitude])
            .addTo(map);
    }, []);

    return (
        <div className="LocationMap">
            <div className="map" id="map"></div>
        </div>
    )
}