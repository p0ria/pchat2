import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionRemoveChatDrawer } from '../../../state/chat/chat.actions';
import { selectSelectedAudience } from '../../../state/chat/chat.selectors';
import ChatExtras from './ChatExtras/ChatExtras';
import ChatInput from './ChatInput/ChatInput';
import './ChatScreenBottom.scss';

export default function ChatScreenBottom() {
    const selectedAudience = useSelector(selectSelectedAudience);
    const selectedAudienceId = selectedAudience && selectedAudience._id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionRemoveChatDrawer());
    }, [selectedAudienceId])

    return (
        selectedAudience &&
        <div className="ChatScreenBottom">
            <ChatInput audienceId={selectedAudienceId} />
            <ChatExtras />
        </div>
    )
}
