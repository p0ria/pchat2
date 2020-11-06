import { MutableRefObject } from "react";
import { Audience } from "../../interfaces/audience.interface";
import { IChatDrawer } from "../../interfaces/chat-drawer.interface";

interface ChatState {
    selectedAudience: Audience | null,
    activeDrawer: {
        drawer: MutableRefObject<IChatDrawer> | null,
        children: any
    }
}

export const initialChatState: ChatState = {
    selectedAudience: null,
    activeDrawer: null
}

export default ChatState;