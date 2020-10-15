import { UserService } from './../../../../login-server/src/services/user.service';
import { Action } from "../../interfaces/store.interface";
import { AudienceActionTypes } from "./audience.actions";
import AudienceState, { initialAudienceState } from "./audience.state";
import { act } from 'react-dom/test-utils';

export const audienceReducer = (
    state: AudienceState = initialAudienceState,
    action: Action
): AudienceState => {
    switch (action.type) {
        case AudienceActionTypes.GetAllAudiencesSuccess:
            return {
                ...state,
                audiences: action.payload
            };

        default:
            return state;
    }
}