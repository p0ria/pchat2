import React, { useImperativeHandle, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionActivateChatDrawer, actionSendMessage } from '../../../../../state/chat/chat.actions';
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
        if (audienceId && location.current && location.current.length > 0) {
            const payload = {
                type: 'LOCATION',
                value: {
                    lng: location.current[0],
                    lat: location.current[1]
                }
            }
            dispatch(actionSendMessage(audienceId, payload.type, payload.value));
        }
    }

    useImperativeHandle(ref, () => ({
        clear,
        submit
    }))

    const handleShowLocation = () => {
        setIsOpen(false);
        navigator.geolocation.getCurrentPosition(position => {
            location.current = [position.coords.longitude, position.coords.latitude];
            dispatch(actionActivateChatDrawer(ref,
                <LocationDrawer
                    lngLat={location.current}
                    isEditable={true}
                    onMapClicked={lngLat => location.current = lngLat}
                />))
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
                    onClick={handleShowLocation}
                >
                    location_on
                    </i>
            </div>
        </div>
    )
}