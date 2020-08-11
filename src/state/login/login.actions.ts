export const LoginActionTypes = {
  GetVerificationCode : '[LOGIN] Get Verification Code',
  GetVerificationCodeSuccess : '[LOGIN] Get Verification Code Success',
  GetVerificationCodeFail : '[LOGIN] Get Verification Code Fail',
  VerifyCode: '[LOGIN] Verify Code',
  VerifyCodeSuccess: '[LOGIN] Verify Code Success',
  VerifyCodeFail: '[LOGIN] Verify Code Fail'
}

export const loginGetVerificationCode = (email: string) => ({
  type: LoginActionTypes.GetVerificationCode,
  payload: email
});

export const loginGetVerificationCodeSuccess = () => ({
  type: LoginActionTypes.GetVerificationCodeSuccess
});

export const loginGetVerificationCodeFail = (error: string) => ({
  type: LoginActionTypes.GetVerificationCodeFail,
  payload: error
});

export const loginVerifyCode = (email: string, code: string) => ({
  type: LoginActionTypes.VerifyCode,
  payload: {email, code} 
});

export const loginVerifyCodeSuccess = () => ({
  type: LoginActionTypes.VerifyCodeSuccess,
});

export const loginVerifyCodeFail = (error: string) => ({
  type: LoginActionTypes.VerifyCodeFail,
  payload: error
});