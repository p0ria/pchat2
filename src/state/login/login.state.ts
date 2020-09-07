export type LoginUiState = 'generate' | 'verify' | 'verified' | 'loading';
interface LoginState {
  emailAddress: string | null
  token: string | null
  uiState: LoginUiState
  error: string | null
}

export const initialLoginState: LoginState = {
  emailAddress: null,
  token: null,
  uiState: "generate",
  error: null
};

export default LoginState;

