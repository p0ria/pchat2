import { Audience } from "../../interfaces/audience.interface";

interface AudienceState {
    audiences: Audience[]
}

export const initialAudienceState: AudienceState = {
    audiences: []
}

export default AudienceState;