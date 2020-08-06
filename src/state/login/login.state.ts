export type LoginUiState = 'generate' | 'generating' | 'verify' | 'verifying' | 'verified';
interface LoginState {
  emailAddress: string | null
  uiState: LoginUiState
}

export const initialLoginState: LoginState = {
  emailAddress: null,
  uiState: "generate"
};

export default LoginState;

