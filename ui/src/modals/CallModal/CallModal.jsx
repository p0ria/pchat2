import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectLocalStream } from '../../state/webrtc/webrtc.selectors';
import './CallModal.scss';

export default function CallModal() {
    const localStream = useSelector(selectLocalStream);
    const localVideoEl = useRef();

    useEffect(() => {
        if (localStream && localVideoEl) {
            localVideoEl.current.srcObject = localStream;
        }
    }, [localStream])

    return (
        <div className="CallModal">
            <div className="CallModal__window CallModal__local">
                <video ref={localVideoEl} autoPlay></video>
            </div>
            <div className="CallModal__window CallModal__remote">
                <video autoPlay></video>
            </div>
        </div>
    )
}