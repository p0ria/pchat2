import React, { useEffect } from 'react';
import './ChatExtras.scss';
import ImageChatExtra from './ImageChatExtra/ImageChatExtra';

export default function ChatExtras({ audienceId, setChildren, submit }) {
    let activatedExtraId;
    const activateExtra = (extraId, children) => {
        activatedExtraId = extraId;
        setChildren(children);
    }
    const handleSubmitted = () => {
        activatedExtraId = null;
        setChildren(null);
    }

    useEffect(() => {
        if (submit) {

        }
    }, [submit])

    return (
        <div className="ChatExtras">
            <i className="material-icons">mic</i>
            <ImageChatExtra
                audienceId={audienceId}
                activate={(children) => activateExtra(2, children)}
                submit={submit}
                onSubmitted={handleSubmitted} />
            <i className="material-icons">more_vert</i>
        </div>
    )
}