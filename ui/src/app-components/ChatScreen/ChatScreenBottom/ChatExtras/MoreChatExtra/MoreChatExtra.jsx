import React, { useImperativeHandle, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionActivateChatDrawer } from '../../../../../state/chat/chat.actions';
import LocationMap from '../../../../../components/LocationMap/LocationMap';
import './MoreChatExtra.scss';
import LocationDrawer from '../../../../chat-drawers/LocationDrawer/LocationDrawer';

export default function MoreChatExtra() {
    const [isOpen, setIsOpen] = useState(false);
    let location = useRef([0, 0]);
    const ref = useRef();
    const dispatch = useDispatch();

    const clear = () => {
        setIsOpen(false);
    }

    const submit = async audienceId => {
        if (audienceId) {
            console.log(location.current);
        }
    }

    useImperativeHandle(ref, () => ({
        clear,
        submit
    }))

    const handleSendLocation = () => {
        setIsOpen(false);
        navigator.geolocation.getCurrentPosition(position => {
            location.current = [position.coords.longitude, position.coords.latitude];
            dispatch(actionActivateChatDrawer(ref,
                <LocationDrawer
                    longitude={position.coords.longitude}
                    latitude={position.coords.latitude} />))
        }, error => console.log(error), { enableHighAccuracy: true });
    }

    return (
        <div className="MoreChatExtra">
            <i className="material-icons"
                onClick={() => setIsOpen(!isOpen)}
            >
                more_vert
            </i>
            <div className={`MoreChatExtra__popup ${isOpen ? 'is-open' : ''}`}>
                <i className="material-icons location-icon"
                    onClick={handleSendLocation}
                >
                    location_on
                    </i>
            </div>
        </div>
    )
}