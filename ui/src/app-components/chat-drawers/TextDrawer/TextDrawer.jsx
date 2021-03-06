import React, { forwardRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionSendMessage } from '../../../state/chat/chat.actions';
import './TextDrawer.scss';

export default forwardRef(({ audienceId, submit, onSubmitted = () => { }, ...props }, ref) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (submit && audienceId) {
            const text = ref.current.value;
            if (text) {
                const payload = {
                    type: 'TEXT',
                    value: {
                        text
                    }
                }
                dispatch(actionSendMessage(audienceId, payload.type, payload.value));
                ref.current.value = '';
                onSubmitted();
            }
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