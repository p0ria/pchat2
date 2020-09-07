export const LoginActionTypes = {
  GetVerificationCode : '[LOGIN] Get Verification Code',
  GetVerificationCodeSuccess : '[LOGIN] Get Verification Code Success',
  GetVerificationCodeFail : '[LOGIN] Get Verification Code Fail',
  VerifyCode: '[LOGIN] Verify Code',
  VerifyCodeSuccess: '[LOGIN] Verify Code Success',
  VerifyCodeFail: '[LOGIN] Verify Code Fail',
  LoginByGoogle: '[LOGIN] Login By Google',
  LoginByEmail: '[LOGIN] Login By Email',
  LoginSuccess: '[LOGIN] Login Success',
  LoginFail: '[LOGIN] Login Fail'
}

export const loginGetVerificationCode = () => ({
  type: LoginActionTypes.GetVerificationCode
})

export const loginGetVerificationCodeSuccess = () => ({
  type: LoginActionTypes.GetVerificationCodeSuccess
})

export const loginGetVerificationCodeFail = (error: string = "") => ({
  type: LoginActionTypes.GetVerificationCodeFail,
  payload: error
})

export const loginVerifyCode = (email: string, code: string) => ({
  type: LoginActionTypes.VerifyCode,
  payload: {email, code} 
})

export const loginVerifyCodeSuccess = () => ({
  type: LoginActionTypes.VerifyCodeSuccess,
})

export const loginVerifyCodeFail = (error: string) => ({
  type: LoginActionTypes.VerifyCodeFail,
  payload: error
})

export const loginByGoogle = (tokenId: string) => ({
  type: LoginActionTypes.LoginByGoogle,
  payload: tokenId
})

export const loginByEmail = (email: string) => ({
  type: LoginActionTypes.LoginByEmail,
  payload: email
})

export const loginSuccess = (credentials: {email: string, token: string}) => ({
  type: LoginActionTypes.LoginSuccess,
  payload: credentials
})

export const loginFail = (error: string) => ({
  type: LoginActionTypes.LoginFail,
  payload: error
})