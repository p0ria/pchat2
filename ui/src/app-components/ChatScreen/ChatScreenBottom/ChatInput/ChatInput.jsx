import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionSubmitChatDrawer } from '../../../../state/chat/chat.actions';
import { selectActiveDrawer } from '../../../../state/chat/chat.selectors';
import TextDrawer from '../../../chat-drawers/TextDrawer/TextDrawer';
import './ChatInput.scss';

export default function ChatInput({ audienceId }) {
    const inputRef = useRef();
    const drawerRef = useRef();
    const sendRef = useRef();
    const [textSubmit, setTextSubmit] = useState();
    const dispatch = useDispatch();
    const activeDrawer = useSelector(selectActiveDrawer);
    const children = activeDrawer && activeDrawer.children;

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
            dispatch(actionSubmitChatDrawer());
        } else {
            setTextSubmit(true);
        }
    });

    const handleSubmitted = useCallback(() => {
        setTextSubmit(false);
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