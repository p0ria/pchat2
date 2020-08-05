export interface LoginState {
  emailAddress: string | null
  state: 'generate' | 'generating' | 'verify' | 'verifying' | 'verified'
}