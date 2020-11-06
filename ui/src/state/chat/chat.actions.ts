export const ChatActionTypes = {
    SendMessage: '[CHAT] Send Message',
    SelectAudience: '[CHAT] Select Audience',
    SelectAudienceSuccess: '[CHAT] Select Audience Success',
    MessageAdded: '[CHAT] Message Added'
}

export const actionSendMessage = (audienceId, type, value) => ({
    type: ChatActionTypes.SendMessage,
    payload: { audienceId, type, value: JSON.stringify(value) }
})

export const actionSelectAudience = audienceId => ({
    type: ChatActionTypes.SelectAudience,
    payload: audienceId
})

export const actionSelectAudienceSuccess = audience => ({
    type: ChatActionTypes.SelectAudienceSuccess,
    payload: audience
})

export const actionMessageAdded = message => ({
    type: ChatActionTypes.MessageAdded,
    payload: message
})