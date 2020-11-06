import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedAudience } from '../../../state/chat/chat.selectors';
import ChatExtras from './ChatExtras/ChatExtras';
import ChatInput from './ChatInput/ChatInput';
import './ChatScreenBottom.scss';

export default function ChatScreenBottom() {
    const selectedAudience = useSelector(selectSelectedAudience);
    const [children, setChildren] = useState();
    const extrasRef = useRef();

    const drawerSubmit = () => {
        if (extrasRef.current && extrasRef.current.submit)
            extrasRef.current.submit();
    }

    return (
        selectedAudience &&
        <div className="ChatScreenBottom">
            <ChatInput
                audienceId={selectedAudience._id}
                children={children}
                drawerSubmit={drawerSubmit} />
            <ChatExtras
                audienceId={selectedAudience._id}
                setChildren={setChildren}
                passedInRef={extrasRef} />
        </div>
    )
}
