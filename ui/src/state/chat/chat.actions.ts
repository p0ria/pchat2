export const ChatActionTypes = {
    SendMessage: '[CHAT] Send Message',
    SelectAudience: '[CHAT] Select Audience',
    SelectAudienceSuccess: '[CHAT] Select Audience Success'
}

export const actionSendMessage = (audienceId, type, value) => ({
    type: ChatActionTypes.SendMessage,
    payload: { audienceId, type, value }
})

export const actionSelectAudience = audienceId => ({
    type: ChatActionTypes.SelectAudience,
    payload: audienceId
})

export const actionSelectAudienceSuccess = audience => ({
    type: ChatActionTypes.SelectAudienceSuccess,
    payload: audience
})