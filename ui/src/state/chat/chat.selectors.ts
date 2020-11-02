import { RootState } from "../../interfaces/store.interface";

export const selectChatState = (state: RootState) => state.chat;