export const ChatActionTypes = {
    SendMessage: '[CHAT] Send Message'
}

export const actionSendMessage = payload => ({
    type: ChatActionTypes.SendMessage,
    payload
})