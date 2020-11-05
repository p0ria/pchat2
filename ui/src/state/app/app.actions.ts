import App from "../../App"

export const AppActionTypes = {
    GetProfile: '[APP] Get Profile',
    GetProfileSuccess: '[APP] Get Profile Success',
    GetProfileFail: '[APP] Get Profile Fail',
    SubscribeToWS: '[APP] Subscribe To WS',
    SubscribeToWSFail: '[APP] Subscribe To WS Fail',
    AppReconnected: '[APP] App Reconnected',
    ChangeAvatar: '[APP] Change Avatar',
    ChangeAvatarSuccess: '[APP] Change Avatar Success',
    ChangeAvatarFail: '[APP] Change Avatar Fail'
}

export const actionGetProfile = () => ({
    type: AppActionTypes.GetProfile
})

export const actionGetProfileSuccess = user => ({
    type: AppActionTypes.GetProfileSuccess,
    payload: user
})

export const actionGetProfileFail = error => ({
    type: AppActionTypes.GetProfileFail,
    payload: error
})

export const actionSubscribeToWS = dispatch => ({
    type: AppActionTypes.SubscribeToWS,
    payload: dispatch
})

export const actionSubscribeToWSFail = error => ({
    type: AppActionTypes.SubscribeToWSFail,
    payload: error
})

export const actionAppReconnected = () => ({
    type: AppActionTypes.AppReconnected
})

export const actionChangeAvatar = avatarUrl => ({
    type: AppActionTypes.ChangeAvatar,
    payload: avatarUrl
})

export const actionChangeAvatarSuccess = avatarUrl => ({
    type: AppActionTypes.ChangeAvatarSuccess,
    payload: avatarUrl
})

export const actionChangeAvatarFail = error => ({
    type: AppActionTypes.ChangeAvatarFail,
    payload: error
})