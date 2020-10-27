import App from "../../App"

export const AppActionTypes = {
    ChangeAvatar: '[APP] Change Avatar',
    ChangeAvatarSuccess: '[APP] Change Avatar Success',
    ChangeAvatarFail: '[APP] Change Avatar Fail'
}

export const actionChangeAvatar = avatarUrl => ({
    type: AppActionTypes.ChangeAvatar,
    payload: avatarUrl
})

export const actionChangeAvatarSuccess = avatarUrl => ({
    type: AppActionTypes.ChangeAvatarSuccess,
    payload: avatarUrl
})

export const actionChangeAvatarFail = () => ({
    type: AppActionTypes.ChangeAvatarFail
})