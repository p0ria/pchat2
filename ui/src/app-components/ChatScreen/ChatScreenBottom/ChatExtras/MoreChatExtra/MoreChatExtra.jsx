import React, { useImperativeHandle, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionActivateChatDrawer } from '../../../../../state/chat/chat.actions';
import LocationMap from '../../../../LocationMap/LocationMap';
import './MoreChatExtra.scss';

export default function MoreChatExtra() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();
    const dispatch = useDispatch();

    const clear = () => {
        setIsOpen(false);
    }

    const submit = async audienceId => {
        if (audienceId) {

        }
    }

    useImperativeHandle(ref, () => ({
        clear,
        submit
    }))

    const handleSendLocation = () => {
        dispatch(actionActivateChatDrawer(ref, <LocationMap />))
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