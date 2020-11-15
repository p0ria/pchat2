import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Stream } from 'stream';
import { Url } from '../../../../../services/api';
import { actionActivateChatDrawer, actionSendMessage } from '../../../../../state/chat/chat.actions';
import { getAudioStream, streamToByteArray } from '../../../../../Utils/media-utils';
import { blobToBase64 } from '../../../../../Utils/string-utils';
import VoiceDrawer from '../../../../chat-drawers/VoiceDrawer/VoiceDrawer';
import './VoiceChatExtra.scss';

export default function VoiceChatExtra() {
    const [isRecording, setIsRecording] = useState();
    const ref = useRef();
    const dispatch = useDispatch();
    const recorderRef = useRef();
    const [blob, setBlob] = useState();
    const audioElem = useRef();

    const clear = () => {
        setIsRecording(false);
    }

    const submit = async audienceId => {
        if (audienceId && blob) {
            const { base64, type } = await blobToBase64(blob);
            const payload = {
                type: 'VOICE',
                value: {
                    data: base64,
                    type
                }
            }
            dispatch(actionSendMessage(audienceId, payload.type, payload.value));
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
        mediaRecorder.ondataavailable = ({ data }) => {
            if (data.size > 0) {
                setBlob(data);
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
            <audio ref={audioElem}></audio>
        </div>
    )
}