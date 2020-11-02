import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedAudience } from '../../../../state/chat/chat.selectors';
import TextDrawer from '../../../chat-drawers/TextDrawer/TextDrawer';
import './ChatInput.scss';

export default function ChatInput({ audienceId, children = null }) {
    const inputRef = useRef();
    const drawerRef = useRef();
    const sendRef = useRef();
    const [textSubmit, setTextSubmit] = useState();
    const [drawerSubmit, setDrawerSubmit] = useState();

    useEffect(() => {
        new ResizeObserver(() => {
            inputRef.current.style.height =
                sendRef.current.style.height =
                drawerRef.current.clientHeight + "px";
        }).observe(drawerRef.current)
    }, []);

    const handleSend = useCallback(() => {
        if (children) {
            // send drawer data
            setDrawerSubmit(true);
        } else {
            setTextSubmit(true);
        }
    });

    const handleSubmitted = useCallback(() => {
        setTextSubmit(false);
        setDrawerSubmit(false);
        inputRef.current.focus();
    });

    return (
        <div className="ChatInput">
            <TextDrawer
                audienceId={audienceId}
                ref={inputRef}
                submit={textSubmit}
                onSubmitted={handleSubmitted} />
            <i
                className="ChatInput__send-icon material-icons"
                ref={sendRef}
                onClick={handleSend}>
                send
            </i>
            <div
                className="ChatInput__drawer"
                style={{ display: children ? 'flex' : 'none' }}
                ref={drawerRef}>
                {children}
            </div>
        </div>
    )
}