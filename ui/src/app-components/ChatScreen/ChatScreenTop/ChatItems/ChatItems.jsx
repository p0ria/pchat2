import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { selectSelectedAudience, selectSelectedAudienceMessages } from '../../../../state/chat/chat.selectors';
import ChatItem from '../ChatItem/ChatItem';
import './ChatItems.scss';

export default function ChatItems() {
    const messages = useSelector(selectSelectedAudienceMessages);
    const ref = useRef();
    useEffect(() => {
        ref.current.scrollToBottom();
    }, [messages])
    return (
        <Scrollbars autoHide ref={ref}>
            <div className="ChatItems">
                {
                    messages.map(message => (
                        <ChatItem
                            message={message}
                            key={message._id}
                        />
                    ))
                }
            </div>
        </Scrollbars>
    )
}