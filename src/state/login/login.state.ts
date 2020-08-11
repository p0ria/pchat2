export type LoginUiState = 'generate' | 'generating' | 'verify' | 'verifying' | 'verified';
interface LoginState {
  emailAddress: string | null
  uiState: LoginUiState
  error: string | null
}

export const initialLoginState: LoginState = {
  emailAddress: null,
  uiState: "generate",
  error: null
};

export default LoginState;

