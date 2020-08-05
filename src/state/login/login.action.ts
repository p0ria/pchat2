import { Action } from '../../interfaces/store.interface';

export const LoginActionTypes = {
  GenerateCode : '[LOGIN] Generate Code',
  GenerateCodeSuccess : '[LOGIN] Generate Code Success',
  GenerateCodeFail : '[LOGIN] Generate Code Fail',
  VerifyCode: '[LOGIN] Verify Code',
  VerifyCodeSuccess: '[LOGIN] Verify Code Success',
  VerifyCodeFail: '[LOGIN] Verify Code Fail'
}

export class LoginGenerateCodeAction implements Action {
  type = LoginActionTypes.GenerateCode;
  constructor(public payload: string) {}
}

export class LoginGenerateCodeSuccessAction implements Action {
  type = LoginActionTypes.GenerateCodeSuccess;
}

export class LoginGenerateCodeFailAction implements Action {
  type = LoginActionTypes.GenerateCodeFail;
  constructor(public payload: string) {}
}

export class LoginVerifyCodeAction implements Action {
  type = LoginActionTypes.VerifyCode;
  constructor(public payload: string) {}
}

export class LoginVerifyCodeSuccessAction implements Action {
  type = LoginActionTypes.GenerateCodeSuccess;
}

export class LoginVerifyCodeFailAction implements Action {
  type = LoginActionTypes.VerifyCodeFail;
  constructor(public pauload: string) {}
}