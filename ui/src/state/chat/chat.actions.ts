export const ChatActionTypes = {
    SendMessage: '[CHAT] Send Message',
    SelectAudience: '[CHAT] Select Audience',
    SelectAudienceSuccess: '[CHAT] Select Audience Success',
    GetSelectedAudienceImpl: '[CHAT] Get Selected Audience Impl',
    GetSelectedAudienceImplSuccess: '[CHAT] Get Selected Audience Impl Success',
    GetSelectedAudienceImplFail: '[CHAT] Get Selected Audience Impl Fail',
    MessageAdded: '[CHAT] Message Added',
    ActivateChatDrawer: '[CHAT] Activate Chat Drawer',
    ActivateChatDrawerSuccess: '[CHAT] Activate Chat Drawer Success',
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

export const actionGetSelectedAudienceImpl = () => ({
    type: ChatActionTypes.GetSelectedAudienceImpl
})

export const actionGetSelectedAudienceImplSuccess = audienceImpl => ({
    type: ChatActionTypes.GetSelectedAudienceImplSuccess,
    payload: audienceImpl
})

export const actionGetSelectedAudienceImplFail = error => ({
    type: ChatActionTypes.GetSelectedAudienceImplFail,
    payload: error
})

export const actionMessageAdded = message => ({
    type: ChatActionTypes.MessageAdded,
    payload: message
})

export const actionActivateChatDrawer = (drawerRef, children) => ({
    type: ChatActionTypes.ActivateChatDrawer,
    payload: { drawerRef, children }
})

export const actionActivateChatDrawerSuccess = (drawerRef, children) => ({
    type: ChatActionTypes.ActivateChatDrawerSuccess,
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