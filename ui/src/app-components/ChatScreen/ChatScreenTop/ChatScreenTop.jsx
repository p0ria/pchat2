import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetSelectedAudienceImpl } from '../../../state/chat/chat.actions';
import { selectSelectedAudience } from '../../../state/chat/chat.selectors';
import ChatItems from './ChatItems/ChatItems';
import ChatScreenHeader from './ChatScreenHeader/ChatScreenHeader';
import './ChatScreenTop.scss';

export default function ChatScreenTop() {
    const audience = useSelector(selectSelectedAudience);
    const style = audience && { backgroundImage: `url(${audience.avatarUrl})` };
    const dispatch = useDispatch();

    useEffect(() => {
        if (audience) {
            dispatch(actionGetSelectedAudienceImpl());
        }
    }, [audience])

    return (
        <div className="ChatScreenTop" style={style}>
            {audience && <ChatScreenHeader />}
            <ChatItems />
        </div>
    )
}