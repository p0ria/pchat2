export const ChatActionTypes = {
    SendMessage: '[CHAT] Send Message',
    SelectAudience: '[CHAT] Select Audience'
}

export const actionSendMessage = (audienceId, type, value) => ({
    type: ChatActionTypes.SendMessage,
    payload: { audienceId, type, value }
})

export const actionSelectAudience = audienceId => ({
    type: ChatActionTypes.SelectAudience,
    payload: audienceId
})