export const LoginActionTypes = {
  GenerateCode : '[LOGIN] Generate Code',
  GenerateCodeSuccess : '[LOGIN] Generate Code Success',
  GenerateCodeFail : '[LOGIN] Generate Code Fail',
  VerifyCode: '[LOGIN] Verify Code',
  VerifyCodeSuccess: '[LOGIN] Verify Code Success',
  VerifyCodeFail: '[LOGIN] Verify Code Fail'
}

export const loginGenerateCode = (email: string) => ({
  type: LoginActionTypes.GenerateCode,
  payload: email
});

export const loginGenerateCodeSuccess = () => ({
  type: LoginActionTypes.GenerateCodeSuccess
});

export const loginGenerateCodeFail = (error: string) => ({
  type: LoginActionTypes.GenerateCodeFail,
  payload: error
});

export const loginVerifyCode = (code: string) => ({
  type: LoginActionTypes.VerifyCode,
  payload: code 
});

export const loginVerifyCodeSuccess = () => ({
  type: LoginActionTypes.VerifyCodeSuccess,
});

export const loginVerifyCodeFail = (error: string) => ({
  type: LoginActionTypes.VerifyCodeFail,
  payload: error
});