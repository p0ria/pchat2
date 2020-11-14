import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Stream } from 'stream';
import { actionActivateChatDrawer } from '../../../../../state/chat/chat.actions';
import { getAudioStream, streamToByteArray } from '../../../../../Utils/media-utils';
import VoiceDrawer from '../../../../chat-drawers/VoiceDrawer/VoiceDrawer';
import './VoiceChatExtra.scss';

export default function VoiceChatExtra() {
    const [isRecording, setIsRecording] = useState();
    const ref = useRef();
    const dispatch = useDispatch();
    const recorderRef = useRef();

    const clear = () => {
        setIsRecording(false);
    }

    const submit = audienceId => {
        if (audienceId) {
            alert('voice sumbit')
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

    useEffect(() => {
        if (isRecording) startRecording();
        else saveRecording();
    }, [isRecording])

    const startRecording = async () => {
        const stream = await getAudioStream();
        var options = { mimeType: 'video/webm;codecs=vp9' };
        var mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                alert(event.data.size);
            } else {
                // ...
            }
        };
        mediaRecorder.start();
        recorderRef.current = mediaRecorder;
    }

    const saveRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.stop();
        }
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