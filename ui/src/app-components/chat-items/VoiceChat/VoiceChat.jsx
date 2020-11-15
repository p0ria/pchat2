import React, { useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';
import { b64ToBlob } from '../../../Utils/string-utils';
import './VoiceChat.scss';

export default function VoiceChat({ isOwner, message }) {
    const audioElem = useRef();
    const [isPlaying, setIsPlaying] = useState();
    const [percent, setPercent] = useState(90);
    let blobSize = useRef(0);
    let gradientId = useRef();

    const onProgress = () => {
        const duration = audioElem.current.duration === Infinity ? blobSize.current / 6000 : audioElem.current.duration;
        setPercent(audioElem.current.currentTime * 100 / duration);
    }

    const onEnded = () => {
        setIsPlaying(false);
        setPercent(0);
    }

    useEffect(() => {
        gradientId.current = `Gradient${uuid()}`;
        audioElem.current.addEventListener('timeupdate', onProgress);
        audioElem.current.addEventListener('ended', onEnded);
        return () => {
            audioElem.current.removeEventListener('timeupdate', onProgress);
            audioElem.current.removeEventListener('ended', onEnded);
        }
    }, [])

    useEffect(() => {
        if (message && message.data) {
            const blob = b64ToBlob(message.data, message.type);
            blobSize.current = blob.size;
            audioElem.current.src = URL.createObjectURL(blob);
        }
        setPercent(0);
    }, [message]);

    useEffect(() => {
        if (isPlaying) {
            audioElem.current.play();
        } else {
            audioElem.current.pause();
        }
    }, [isPlaying]);

    return (
        <div className="VoiceChat">
            <svg viewBox="-1 247.8888888888889 104 24" width="100" height="20">
                <defs>
                    <linearGradient id={gradientId.current}>
                        <stop offset="0" stopColor="#444" />
                        <stop offset={`${percent}%`} stopColor="#444" />
                        <stop offset={`${percent}%`} stopColor="#ccc" />
                        <stop offset="100%" stopColor="#ccc" />
                    </linearGradient>
                </defs>
                <path style={{ fill: `url(#${gradientId.current})` }}
                    d="M0 262.89L2.56 252.89L5.13 248.89L7.69 260.89L10.26 258.89L12.82 260.89L15.38 258.89L17.95 258.89L20.51 262.89L23.08 252.89L25.64 250.89L28.21 266.89L30.77 264.89L33.33 268.89L35.9 248.89L38.46 262.89L41.03 256.89L43.59 258.89L46.15 248.89L48.72 262.89L51.28 258.89L53.85 258.89L56.41 248.89L58.97 266.89L61.54 254.89L64.1 260.89L66.67 254.89L69.23 266.89L71.79 252.89L74.36 260.89L76.92 266.89L79.49 252.89L82.05 258.89L84.62 250.89L87.18 262.89L89.74 262.89L92.31 254.89L94.87 252.89L97.44 248.89L100 262.89L100 268.89L97.44 268.89L94.87 268.89L92.31 268.89L89.74 268.89L87.18 268.89L84.62 268.89L82.05 268.89L79.49 268.89L76.92 268.89L74.36 268.89L71.79 268.89L69.23 268.89L66.67 268.89L64.1 268.89L61.54 268.89L58.97 268.89L56.41 268.89L53.85 268.89L51.28 268.89L48.72 268.89L46.15 268.89L43.59 268.89L41.03 268.89L38.46 268.89L35.9 268.89L33.33 268.89L30.77 268.89L28.21 268.89L25.64 268.89L23.08 268.89L20.51 268.89L17.95 268.89L15.38 268.89L12.82 268.89L10.26 268.89L7.69 268.89L5.13 268.89L2.56 268.89L0 268.89L0 262.89Z"
                />
            </svg >
            <audio ref={audioElem} />
            {
                isPlaying ?
                    <i
                        className="material-icons"
                        onClick={() => setIsPlaying(false)}>stop</i>
                    :
                    <i
                        className="material-icons"
                        onClick={() => setIsPlaying(true)}>play_arrow</i>
            }
        </div >
    )
}