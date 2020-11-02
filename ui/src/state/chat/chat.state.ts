import { Audience } from "../../interfaces/audience.interface";

interface ChatState {
    selectedAudience: Audience | null
}

export const initialChatState: ChatState = {
    selectedAudience: null
}

export default ChatState;