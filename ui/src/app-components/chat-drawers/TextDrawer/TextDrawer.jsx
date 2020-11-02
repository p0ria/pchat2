import React, { forwardRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionSendMessage } from '../../../state/chat/chat.actions';
import './TextDrawer.scss';

export default forwardRef(({ submit, onSubmitted = () => { }, ...props }, ref) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (submit) {
            const text = ref.current.value;
            const payload = {
                audienceId: '5f885309114fb43b7c70ce2f',
                type: 'TEXT',
                value: Buffer.from(text).toString('base64')
            }
            dispatch(actionSendMessage(payload.audienceId, payload.type, payload.value));
            ref.current.value = '';
            onSubmitted();
        }
    }, [submit]);

    return (
        <div className="TextDrawer">
            <input
                className="TextDrawer__input"
                ref={ref}
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false" />
        </div>
    )
})