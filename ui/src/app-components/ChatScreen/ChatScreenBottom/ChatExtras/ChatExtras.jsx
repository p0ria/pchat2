import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import './ChatExtras.scss';
import ImageChatExtra from './ImageChatExtra/ImageChatExtra';

let activatedExtraId;
export default function ChatExtras({ audienceId, setChildren, passedInRef }) {
    const refs = [useRef()];

    useImperativeHandle(passedInRef, () => ({
        submit: () => { submit(); }
    }))

    const activateExtra = (extraId, children) => {
        activatedExtraId = extraId;
        setChildren(children);
    }

    const handleSubmitted = () => {
        activatedExtraId = null;
        setChildren(null);
    }

    const submit = () => {
        const activatedRef = refs[activatedExtraId];
        if (activatedRef.current && activatedRef.current.submit) {
            activatedRef.current.submit();
            handleSubmitted();
        }
    }

    useEffect(() => {
        const activatedRef = refs[activatedExtraId];
        if (activatedRef.current && activatedRef.current.clear) {
            activatedRef.current.clear();
        }
    }, [audienceId])

    return (
        <div className="ChatExtras">
            <i className="material-icons">mic</i>
            <ImageChatExtra
                audienceId={audienceId}
                activate={(children) => activateExtra(0, children)}
                passedInRef={refs[0]} />
            <i className="material-icons">more_vert</i>
        </div>
    )
}