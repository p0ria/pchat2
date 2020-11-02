import React, { forwardRef } from 'react';
import './TextDrawer.scss';

export default forwardRef(({ submit, onSubmitted = () => { }, ...props }, ref) => {
    if (submit) {
        ref.current.value = '';
        onSubmitted();
    }
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