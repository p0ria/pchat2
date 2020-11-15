import React, { useEffect, useRef } from 'react';
import { b64ToBlob } from '../../../Utils/string-utils';
import './VoiceChat.scss';

export default function VoiceChat({ isOwner, message }) {
    const audioElem = useRef();

    useEffect(() => {
        if (message && message.data) {
            const blob = b64ToBlob(message.data, message.type);
            audioElem.current.src = URL.createObjectURL(blob);
            audioElem.current.play();
        }
    }, [message]);

    return (
        <div className="VoiceChat">
            <audio ref={audioElem} />
        </div>
    )
}