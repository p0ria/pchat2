import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedAudience } from '../../../state/chat/chat.selectors';
import ChatExtras from './ChatExtras/ChatExtras';
import ChatInput from './ChatInput/ChatInput';
import './ChatScreenBottom.scss';

export default function ChatScreenBottom() {
    const selectedAudience = useSelector(selectSelectedAudience);
    const [children, setChildren] = useState();
    const [drawerSubmit, setDrawerSubmit] = useState();
    useEffect(() => {
        if (!children) setDrawerSubmit(false);
    }, [children])
    return (
        selectedAudience &&
        <div className="ChatScreenBottom">
            <ChatInput
                audienceId={selectedAudience._id}
                children={children}
                setDrawerSubmit={setDrawerSubmit} />
            <ChatExtras
                audienceId={selectedAudience._id}
                setChildren={setChildren}
                submit={drawerSubmit} />
        </div>
    )
}
