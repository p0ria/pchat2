import { User } from "../../interfaces/user.interface";

interface AppState {
    user: User | null
}

export const initialAppState: AppState = {
    user: null
}

export default AppState;