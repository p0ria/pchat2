import React, { useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionActivateChatDrawer } from '../../../../../state/chat/chat.actions';
import VoiceDrawer from '../../../../chat-drawers/VoiceDrawer/VoiceDrawer';
import './VoiceChatExtra.scss';

export default function VoiceChatExtra() {
    const [isRecording, setIsRecording] = useState();
    const ref = useRef();
    const dispatch = useDispatch();

    const clear = () => {
        setIsRecording(false);
    }

    const submit = audienceId => {
        if (audienceId) {

        }
    }

    useImperativeHandle(ref, () => ({
        clear,
        submit
    }))

    const handleRecordVoice = () => {
        dispatch(actionActivateChatDrawer(ref, <VoiceDrawer stop={isRecording} />))
        setIsRecording(!isRecording);
    }

    return (
        <div
            className="VoiceChatExtra"
            onClick={handleRecordVoice}
        >
            {
                isRecording ?
                    <i className="chatExtra__icon material-icons">stop</i>
                    :
                    <i className="chatExtra__icon material-icons">mic</i>
            }
        </div>
    )
}