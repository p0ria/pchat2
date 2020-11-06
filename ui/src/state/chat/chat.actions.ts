export const ChatActionTypes = {
    SendMessage: '[CHAT] Send Message',
    SelectAudience: '[CHAT] Select Audience',
    SelectAudienceSuccess: '[CHAT] Select Audience Success',
    MessageAdded: '[CHAT] Message Added',
    ActivateChatDrawer: '[CHAT] Activate Chat Drawer',
    RemoveChatDrawer: '[CHAT] Remove Chat Drawer',
    RemoveChatDrawerSuccess: '[CHAT] Remove Chat Drawer Success',
    SubmitChatDrawer: '[CHAT] Submit Chat Drawer',
    SubmitChatDrawerSuccess: '[CHAT] Submit Chat Drawer Success',
    SubmitChatDrawerFail: '[CHAT] Submit Chat Drawer Fail'
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

export const actionActivateChatDrawer = (drawerRef, children) => ({
    type: ChatActionTypes.ActivateChatDrawer,
    payload: { drawerRef, children }
})

export const actionRemoveChatDrawer = () => ({
    type: ChatActionTypes.RemoveChatDrawer
})

export const actionRemoveChatDrawerSuccess = () => ({
    type: ChatActionTypes.RemoveChatDrawerSuccess
})

export const actionSubmitChatDrawer = () => ({
    type: ChatActionTypes.SubmitChatDrawer,
})

export const actionSubmitChatDrawerSuccess = () => ({
    type: ChatActionTypes.SubmitChatDrawerSuccess
})

export const actionSubmitChatDrawerFail = error => ({
    type: ChatActionTypes.SubmitChatDrawerFail,
    payload: error
})