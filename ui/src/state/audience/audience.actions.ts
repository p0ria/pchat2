import { Audience } from "../../interfaces/audience.interface"

export const AudienceActionTypes = {
    GetAllAudiences: "[AUDIENCE] Get All Audiences",
    GetAllAudiencesSuccess: "[AUDIENCE] Get All Audiences Success",
    GetAllAudiencesFail: "[AUDIENCE] Get All Audiences Fail",
    AudiencesChanged: "[AUDIENCE] Audiences Changed"
}

export const actionGetAllAudiences = () => ({
    type: AudienceActionTypes.GetAllAudiences
})

export const actionGetAllAudiencesSuccess = (audiences: Audience[]) => ({
    type: AudienceActionTypes.GetAllAudiencesSuccess,
    payload: audiences
})

export const actionGetAllAudiencesFail = (error: string) => ({
    type: AudienceActionTypes.GetAllAudiencesFail,
    payload: error
})

export const actionAudiencesChanged = (audiences: Audience[]) => ({
    type: AudienceActionTypes.AudiencesChanged,
    payload: audiences
})