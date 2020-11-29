import React, { useEffect, useRef } from 'react';
import './LocationMap.scss';
import mapboxgl from 'mapbox-gl';
import uuid from 'react-uuid';

export default function LocationMap({ lngLat, isEditable = false, onMapClicked = () => null }) {
    let map = useRef();
    let marker = useRef();
    const id = useRef(`map-${uuid()}`);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            accessToken: process.env.REACT_APP_MAPBOX_KEY,
            container: id.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 13,
            center: lngLat
        });

        map.current.on('click', e => {
            const clickLngLat = [e.lngLat.lng, e.lngLat.lat]
            if (isEditable) {
                if (marker.current) marker.current.remove();
                marker.current = new mapboxgl.Marker({ anchor: 'center' })
                    .setLngLat(clickLngLat)
                    .addTo(map.current);
            }
            onMapClicked(clickLngLat);
        });
    }, []);

    useEffect(() => {
        if (lngLat && lngLat.length > 1 && map.current) {
            if (marker.current) marker.current.remove();
            marker.current = new mapboxgl.Marker({ anchor: 'center' })
                .setLngLat(lngLat)
                .addTo(map.current);
        }
    }, [lngLat, map.current])

    return (
        <div className="LocationMap">
            <div className="map" id={id.current}></div>
        </div>
    )
}