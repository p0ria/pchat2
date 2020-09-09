export type LoginUiState = 'generate' | 'verify' | 'verified' | 'loading';
interface LoginState {
  emailAddress: string | null
  token: string | null
  uiState: LoginUiState,
  resent: boolean
  error: string | null
}

export const initialLoginState: LoginState = {
  emailAddress: null,
  token: null,
  uiState: 'generate',
  resent: false,
  error: null
};

export default LoginState;

