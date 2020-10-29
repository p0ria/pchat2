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

        case AudienceActionTypes.AudiencesChanged:
            return {
                ...state,
                audiences: [
                    ...state.audiences.filter(audience =>
                        action.payload.every(a => a._id !== audience._id)),
                    ...action.payload
                ].sort((a, b) => a.name <= b.name ? -1 : 1)
            }

        default:
            return state;
    }
}