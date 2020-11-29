import { MutableRefObject } from "react";
import { Audience } from "../../interfaces/audience.interface";
import { IChatDrawer } from "../../interfaces/chat-drawer.interface";
import { Private } from "../../interfaces/private.interface";

interface ChatState {
    selectedAudience: Audience | null,
    selectedAudienceImpl: Private | null
    activeDrawer: {
        drawer: MutableRefObject<IChatDrawer> | null,
        children: any
    }
}

export const initialChatState: ChatState = {
    selectedAudience: null,
    selectedAudienceImpl: null,
    activeDrawer: null
}

export default ChatState;