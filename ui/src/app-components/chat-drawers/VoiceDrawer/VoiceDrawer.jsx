import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionRemoveChatDrawer } from '../../../state/chat/chat.actions';
import { secondsToMinSecTimeFormat } from '../../../Utils/time-utils';
import './VoiceDrawer.scss';

export default function VoiceDrawer({ stop }) {
    const [duration, setDuration] = useState(0);
    const timerIntervalRef = useRef();
    const dispatch = useDispatch();
    const handleClose = useCallback(() => {
        dispatch(actionRemoveChatDrawer());
    });
    useEffect(() => {
        if (stop) {
            clearInterval(timerIntervalRef.current);
        } else {
            setDuration(0);
            timerIntervalRef.current = setInterval(() => {
                setDuration(duration => duration + 1);
            }, 1000);
        }
        return () => clearInterval(timerIntervalRef.current);
    }, [stop])

    return (
        <div className="VoiceDrawer">
            <div className="VoiceDrawer__content">
                <i className={`VoiceDrawer__indicator ${stop ? 'stop' : ''}`}></i>
                <span className="VoiceDrawer__duration">{secondsToMinSecTimeFormat(duration)}</span>
            </div>
            {stop &&
                <i className="VoiceDrawer__close material-icons"
                    onClick={handleClose}>
                    close</i>
            }
        </div>
    )
}