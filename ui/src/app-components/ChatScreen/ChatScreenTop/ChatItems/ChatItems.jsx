import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { selectSelectedAudience, selectSelectedAudienceMessages } from '../../../../state/chat/chat.selectors';
import ChatItem from '../ChatItem/ChatItem';
import './ChatItems.scss';
import { selectUser } from '../../../../state/app/app.selectors';

export default function ChatItems() {
    const messages = useSelector(selectSelectedAudienceMessages);
    const user = useSelector(selectUser);
    const ref = useRef();
    useEffect(() => {
        if (messages.length > 0 &&
            messages[messages.length - 1].author._id === user._id) {
            ref.current.scrollToBottom();
        }
    }, [messages])
    return (
        <Scrollbars autoHide ref={ref} style={{ height: 'calc(100% - 50px)' }}>
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